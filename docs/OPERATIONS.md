# Operações: Redis, backups e monitorização

Guia para **produção** — inventário de dados, backups e alertas.

## 1. O que está no Redis

| Prefixo / chave | Conteúdo | Crítico? |
|-----------------|----------|----------|
| `api_keys` (hash) | Metadados por **hash** da chave (tier, status, `customerId`, domínios autorizados). A chave em claro **não** fica guardada (só hash HMAC). | **Sim** — sem isto, chaves criadas no portal deixam de funcionar. |
| `api_keys:blacklist` (set) | Hashes revogados. | Sim |
| `config:tiers` (hash) | Limites por plano (ex.: pedidos/dia). | Sim |
| `config:system:beta_mode` | Flag beta. | Médio |
| `auth:users:*` | Utilizadores portal (email, `passwordHash`, role, preferências). | **Sim** — dados de conta. |
| `auth:sessions:*` | Sessões (TTL ~24h). | Médio (re-login recupera) |
| `rate:*` | Contadores de rate limit diários. | Baixo — regenera-se; perder implica contadores a zero. |
| `pdf:*`, cache genérico | PDFs em cache / entradas de cache da app. | Baixo — só performance. |
| `tag:*` (sets) | Índices de invalidação de cache. | Baixo |

**Não há Postgres neste serviço** para estes dados: o Redis **é** a base de estado operacional (chaves API, utilizadores, configuração).

---

## 2. Backups Redis

### Princípios

1. **RPO/RTO:** definir quanta perda de dados aceitas e quanto tempo podes ficar sem Redis.
2. **Encriptação em trânsito e em repouso:** usar fornecedores que suportem TLS (`rediss://`) e encriptação no disco quando existir.
3. **Testar restauro** pelo menos uma vez (restaurar snapshot numa instância de teste e validar login + chamada API).

### Por fornecedor

- **Upstash**  
  - Backups automáticos dependem do plano; consulta a consola (snapshots / point-in-time se disponível).  
  - Export manual: documentação Upstash para **backup** / **fork** da base.

- **Render Key Value (Redis)**  
  - Ver documentação atual sobre **snapshots** e retenção.  
  - Para dados críticos, considera também **export periódico** (script com `redis-cli --rdb` ou SCAN + dump, se a rede permitir).

- **AWS ElastiCache / MemoryDB / Redis Cloud**  
  - Ativar snapshots automáticos e, se possível, réplica multi-AZ.

### Export manual (genérico)

Com `redis-cli` e URL interna (ou túnel SSH):

```bash
# Snapshot binário (RDB) — requer redis-cli e acesso à instância
redis-cli -u "$REDIS_URL" --rdb ./redis-backup-$(date -u +%Y%m%d).rdb
```

Guarda os ficheiros em local **encriptado** (bucket com versão + IAM restrito). **Não** commits backups no Git.

### Dados “de cliente” no sentido RGPD

- Emails e hashes de password estão em `auth:users:*`.  
- Chaves API: só **hashes** no Redis; o segredo em claro só existe quando alguém copia a chave na criação.  
- Para pedidos de eliminação: apagar entradas relevantes no Redis (e documentar o procedimento interno).

---

## 3. Monitorização já disponível na app

| Endpoint | Uso |
|----------|-----|
| `GET /health` | Liveness: `status`, uptime, memória, estado Redis (ping). Para **Accept: application/json** (ex.: health checks de plataforma). |
| `GET /metrics` | Métricas **Prometheus** (`prom-client`). |

### Proteger `/metrics` em produção

No **Render** com o [render.yaml](../render.yaml), `METRICS_BEARER_TOKEN` é criado com **`generateValue: true`** — copia o valor no dashboard do serviço para o Prometheus/Grafana.

Se definires `METRICS_BEARER_TOKEN` no ambiente (qualquer fornecedor), o endpoint exige:

- `Authorization: Bearer <METRICS_BEARER_TOKEN>`, **ou**
- cabeçalho `X-Metrics-Token: <METRICS_BEARER_TOKEN>`.

Sem a variável, o comportamento mantém-se **público** (útil em dev). Em produção pública, **define o token** ou bloqueia `/metrics` no reverse proxy / API gateway.

### Logs

- **Fastify + pino:** em `NODE_ENV=production` não usas `pino-pretty` por defeito — logs JSON para stdout.  
- Na **Render / Railway / Fly:** recolhe logs no dashboard ou encaminha para o teu agregador.

---

## 4. Alertas e erros (recomendações)

### Disponibilidade

- **Uptime:** [Better Stack](https://betterstack.com/), [UptimeRobot](https://uptimerobot.com/), Grafana Cloud, etc.  
- URL a sondar: `https://teu-dominio/health` com intervalo 1–5 min e alerta se não for HTTP 200.

### Métricas e dashboards

- **Grafana Cloud** (free tier) ou **Datadog / New Relic:** scrape de `/metrics` com o token configurado, ou agente na máquina.

### Erros de aplicação

- **Sentry** (SDK Node) para exceções não tratadas — requer integração extra no `Fastify` (fora do âmbito mínimo deste doc).  
- Até lá: alertas em **taxa de 5xx** a partir dos logs da plataforma ou do proxy.

### Redis

- Alertas do **próprio fornecedor** (CPU, memória, conexões, evictions).  
- Se o Redis cair, a app arranca mas com funcionalidade **degradada** (sem Redis: avisos no bootstrap; chaves API / portal podem não persistir conforme o código).

---

## 5. Checklist rápido

- [ ] Backups Redis ativos ou export agendado.  
- [ ] Teste de restauro documentado e feito pelo menos uma vez.  
- [ ] Health check externo em `/health`.  
- [ ] `METRICS_BEARER_TOKEN` definido **ou** `/metrics` bloqueado na rede.  
- [ ] Logs retidos e pesquisáveis; alerta para picos de 5xx / downtime.  
- [ ] Rotação de `INTERNAL_SECRET`, `API_KEY_HASH_SECRET`, tokens de métricas e cron.

---

Ver também: [README.md](../README.md) (deploy), [.env.example](../.env.example).

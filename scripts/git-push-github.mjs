#!/usr/bin/env node
/**
 * Colapsa o branch atual num único commit (mensagem por defeito ".")
 * e faz push forçado. Uso: npm run push-github
 * Opcional: GIT_REMOTE (default origin), GIT_COMMIT_MSG (default .)
 */
import { spawnSync } from "node:child_process";

function git(args) {
  const r = spawnSync("git", args, {
    stdio: "inherit",
    cwd: process.cwd(),
    shell: false,
  });
  if (r.status !== 0 && r.status != null) process.exit(r.status);
  if (r.error) {
    console.error(r.error);
    process.exit(1);
  }
}

const remote = process.env.GIT_REMOTE || "origin";
const message = process.env.GIT_COMMIT_MSG || ".";

const br = spawnSync("git", ["branch", "--show-current"], {
  encoding: "utf8",
  cwd: process.cwd(),
});
if (br.status !== 0) {
  console.error("git: repositório inválido ou comando falhou.");
  process.exit(1);
}
const branch = br.stdout.trim();
if (!branch) {
  console.error("Detached HEAD — faz checkout de um branch antes.");
  process.exit(1);
}

const temp = `_orphan_${process.pid}_${Date.now()}`;
git(["checkout", "--orphan", temp]);
git(["add", "-A"]);
const commit = spawnSync("git", ["commit", "-m", message], {
  stdio: "inherit",
  cwd: process.cwd(),
});
if (commit.status !== 0) {
  process.exit(commit.status ?? 1);
}
git(["branch", "-D", branch]);
git(["branch", "-m", branch]);
git(["push", "-f", remote, branch]);
console.log(`OK: ${remote}/${branch} (um commit, push forçado)`);

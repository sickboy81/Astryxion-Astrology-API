/**
 * Astro Commercial API - Official TypeScript Client Reference
 * Copy this file to your project for full type-safe integration.
 */

export interface AstroClientConfig {
  apiKey: string;
  apiBase?: string; // Default: https://api.vibecode.com/v1 (placeholder)
}

export class AstroClient {
  private apiKey: string;
  private apiBase: string;

  constructor(config: AstroClientConfig) {
    this.apiKey = config.apiKey;
    this.apiBase = config.apiBase || 'http://localhost:3000/api/v1';
  }

  private async fetchAPI(endpoint: string, body: any) {
    const response = await fetch(`${this.apiBase}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Calculates a complete Western Natal Chart.
   */
  async getNatalChart(params: {
    date: string; // YYYY-MM-DD
    timeUtc: string; // HH:mm:ss
    latitude: number;
    longitude: number;
  }) {
    return this.fetchAPI('/natal-chart', params);
  }

  /**
   * Calculates complete Vedic Astrology (Jyotish) chart and items.
   */
  async getVedicComplete(params: {
    date: string;
    timeUtc: string;
    latitude: number;
    longitude: number;
  }) {
    return this.fetchAPI('/vedic-complete', params);
  }

  /**
   * Draw Tarot cards (daily or P/P/F spread).
   */
  async drawTarot(params: { spread: 'daily' | 'past_present_future' }) {
    return this.fetchAPI('/tarot/draw', params);
  }

  /**
   * Generates a Natal Chart PDF report.
   */
  async downloadNatalPDF(params: {
    fullName: string;
    date: string;
    timeUtc: string;
    latitude: number;
    longitude: number;
  }) {
    const response = await fetch(`${this.apiBase}/reports/natal-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) throw new Error(`PDF Error: ${response.status}`);
    return response.blob();
  }

  /**
   * Calculate Cabalistic Numerology Triangle and Numbers.
   */
  async getNumerologyCabalistic(params: {
    fullName: string;
    dateOfBirth: string;
  }) {
    return this.fetchAPI('/numerology/cabalistic', params);
  }
}

// Example Usage:
// const astro = new AstroClient({ apiKey: 'YOUR_API_KEY' });
// const chart = await astro.getNatalChart({ date: '1990-05-15', timeUtc: '13:00:00', latitude: -23.5, longitude: -46.6 });

import { getPanchangPeriods, getSunriseAndSet } from "./src/services/astronomy.service.js";

async function main() {
    const jd = (Date.now() / 86400000) + 2440587.5;
    const res = await getSunriseAndSet(jd, -23.55, -46.63);
    console.log("Sun", res);
    if(res) {
        const periods = getPanchangPeriods(res.sunrise, res.sunset, new Date().getDay());
        console.log("Periods", periods);
        
        const fmt = (jd) => {
              const f = (jd + 0.5) % 1;
              console.log("  f", f);
              const h = Math.floor(f * 24);
              const m = Math.floor((f * 24 - h) * 60);
              return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
        };
        console.log(fmt(periods.rahuKalam.start));
        console.log(fmt(periods.rahuKalam.end));
    }
}
main();

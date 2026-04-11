import { calculatePlanets, calculateAscendant } from "./src/services/calculation.service.js";
import { houseOfLongitude } from "./src/lib/astro/math.js";
import { getSignForLongitude, getSignDegree } from "./src/lib/astro/logic.js";
import { 
    calculateVimshottariDasha, 
    calculateVargaAnalysis, 
    calculateYogas, 
    calculateJaiminiKarakas, 
    calculateVedicRemedies, 
    calculateLalKitabAnalysis, 
    calculateTajikaChart, 
    calculateNadiAnalysis,
    calculateCharaDasha,
    getNakshatraForLongitude
} from "./src/vedic-astrology.js";

async function main() {
    try {
        const date = "1990-05-15";
        const timeUtc = "14:30:00";
        const latitude = -23.55;
        const longitude = -46.63;
        const houseSystem = "placidus";

        console.log("1. calculatePlanets");
        const planets = await calculatePlanets(date, timeUtc);
        
        console.log("2. calculateAscendant");
        const ascendant = await calculateAscendant(date, timeUtc, latitude, longitude, houseSystem);
        const cusps = ascendant.cusps;

        for (const planet of planets) {
            planet.house = houseOfLongitude(planet.longitude, cusps);
        }

        const houses = cusps.slice(0, 12).map((c, i) => ({
            house: i + 1,
            longitude: c,
            sign: getSignForLongitude(c),
            degree: Math.floor(getSignDegree(c)),
        }));

        const moon = planets.find((p) => p.name === "Lua");
        
        console.log("3. getNakshatraForLongitude");
        const nakshatra = moon ? getNakshatraForLongitude(moon.longitude) : null;

        const birthDateTime = new Date(date + "T" + timeUtc);
        
        console.log("4. calculateVimshottariDasha");
        const dasha = moon ? calculateVimshottariDasha(moon.longitude, birthDateTime) : null;
        
        console.log("5. calculateVargaAnalysis");
        const vargaAnalysis = calculateVargaAnalysis(planets, ascendant.longitude);
        
        console.log("6. calculateYogas");
        const yogas = calculateYogas(planets, houses);
        
        console.log("7. calculateJaiminiKarakas");
        const karakas = calculateJaiminiKarakas(planets);
        
        console.log("8. calculateVedicRemedies");
        const remedies = calculateVedicRemedies(planets, yogas, dasha || {
            currentMahadasha: { planet: "", startDate: "", endDate: "", years: 0, subPeriods: [], interpretation: "", favorable: [], challenges: [] },
            currentAntardasha: { planet: "", startDate: "", endDate: "", months: 0, interpretation: "" },
            currentPratyantardasha: { planet: "", startDate: "", endDate: "", months: 0, interpretation: "" },
            allMahadashas: [],
            remainingYears: 0,
            balanceAtBirth: 0
        });
        
        console.log("9. calculateLalKitabAnalysis");
        const lalKitab = calculateLalKitabAnalysis(planets, houses);
        
        console.log("10. calculateTajikaChart");
        const tajika = calculateTajikaChart(planets, new Date(date + "T" + timeUtc), new Date().getFullYear());
        
        console.log("11. calculateNadiAnalysis");
        const nadi = nakshatra ? calculateNadiAnalysis(planets, nakshatra) : null;

        console.log("12. EVERYTHING OK!");

    } catch (e) {
        console.error("ERROR CAUGHT", e);
    }
}
main();

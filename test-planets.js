import { parseArgs } from "util";
import { calculatePlanets } from "./src/services/calculation.service.js";

async function main() {
    try {
        const planets = await calculatePlanets("1990-05-15", "14:30:00");
        console.log(planets);
    } catch (e) {
        console.error("ERROR", e);
    }
}
main();

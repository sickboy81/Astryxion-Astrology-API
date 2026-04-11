import { parseArgs } from "util";
import * as sweph from "sweph";

async function main() {
    sweph.set_ephe_path(process.env.SWEPH_EPHE_PATH || './node_modules/sweph/ephe');
    const jdDate = sweph.utc_to_jd(1990, 5, 15, 14, 30, 0, 1);
    console.log("JD", jdDate);
    
    // Test planet calc
    const result = sweph.calc_ut(jdDate.data[0], 0, 4); // 4 = SEFLG_MOSEPH
    console.log("Sun", result);
}
main();

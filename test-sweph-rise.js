import * as sweph from "sweph";

async function main() {
    sweph.set_ephe_path(process.env.SWEPH_EPHE_PATH || './node_modules/sweph/ephe');
    const jd = (Date.now() / 86400000) + 2440587.5;
    
    const flags = sweph.constants.SE_CALC_RISE | sweph.constants.SE_BIT_DISC_CENTER;
    const rise = sweph.rise_trans(jd, sweph.constants.SE_SUN, "", sweph.constants.SEFLG_SWIEPH, flags, [-46.63, -23.55, 0], 0, 0);
    
    console.log("RISE", rise);
}
main();

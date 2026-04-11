declare module "all-the-cities" {
  export interface City {
    cityId: number;
    name: string;
    altName: string;
    country: string;
    featureCode: string;
    adminCode: string;
    population: number;
    loc: {
      type: "Point";
      coordinates: [number, number]; // [lng, lat]
    };
  }
  const cities: City[];
  export default cities;
}

declare module "tz-lookup" {
  function tzlookup(lat: number, lng: number): string;
  export default tzlookup;
}

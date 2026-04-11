export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

export interface NakshatraAttributes {
  name: string;
  rashi: string;
  lord: string;
  varna: string;
  vashya: string;
  yoni: string;
  gana: string;
  nadi: string;
}

export const NAKSHATRA_DATA: NakshatraAttributes[] = [
  { name: "Ashwini", rashi: "Aries", lord: "Ketu", varna: "Kshatriya", vashya: "Chatushpad", yoni: "Horse", gana: "Deva", nadi: "Aadi" },
  { name: "Bharani", rashi: "Aries", lord: "Venus", varna: "Kshatriya", vashya: "Chatushpad", yoni: "Elephant", gana: "Manushya", nadi: "Madhya" },
  { name: "Krittika", rashi: "Aries/Taurus", lord: "Sun", varna: "Brahmin", vashya: "Chatushpad/Chatushpad", yoni: "Sheep", gana: "Rakshasa", nadi: "Antya" },
  { name: "Rohini", rashi: "Taurus", lord: "Moon", varna: "Brahmin", vashya: "Chatushpad", yoni: "Serpent", gana: "Manushya", nadi: "Antya" },
  { name: "Mrigashira", rashi: "Taurus/Gemini", lord: "Mars", varna: "Vaisya", vashya: "Chatushpad/Nara", yoni: "Serpent", gana: "Deva", nadi: "Madhya" },
  { name: "Ardra", rashi: "Gemini", lord: "Rahu", varna: "Sudra", vashya: "Nara", yoni: "Dog", gana: "Manushya", nadi: "Aadi" },
  { name: "Punarvasu", rashi: "Gemini/Cancer", lord: "Jupiter", varna: "Brahmin", vashya: "Nara/Jalchar", yoni: "Cat", gana: "Deva", nadi: "Aadi" },
  { name: "Pushya", rashi: "Cancer", lord: "Saturn", varna: "Brahmin", vashya: "Jalchar", yoni: "Sheep", gana: "Deva", nadi: "Madhya" },
  { name: "Ashlesha", rashi: "Cancer", lord: "Mercury", varna: "Brahmin", vashya: "Jalchar", yoni: "Cat", gana: "Rakshasa", nadi: "Antya" },
  { name: "Magha", rashi: "Leo", lord: "Ketu", varna: "Kshatriya", vashya: "Vanachara", yoni: "Rat", gana: "Rakshasa", nadi: "Antya" },
  { name: "Purva Phalguni", rashi: "Leo", lord: "Venus", varna: "Kshatriya", vashya: "Vanachara", yoni: "Rat", gana: "Manushya", nadi: "Madhya" },
  { name: "Uttara Phalguni", rashi: "Leo/Virgo", lord: "Sun", varna: "Kshatriya", vashya: "Vanachara/Nara", yoni: "Cow", gana: "Manushya", nadi: "Aadi" },
  { name: "Hasta", rashi: "Virgo", lord: "Moon", varna: "Vaisya", vashya: "Nara", yoni: "Buffalo", gana: "Deva", nadi: "Aadi" },
  { name: "Chitra", rashi: "Virgo/Libra", lord: "Mars", varna: "Vaisya", vashya: "Nara", yoni: "Tiger", gana: "Rakshasa", nadi: "Madhya" },
  { name: "Swati", rashi: "Libra", lord: "Rahu", varna: "Sudra", vashya: "Nara", yoni: "Buffalo", gana: "Deva", nadi: "Antya" },
  { name: "Vishakha", rashi: "Libra/Scorpio", lord: "Jupiter", varna: "Brahmin", vashya: "Nara/Keeta", yoni: "Tiger", gana: "Rakshasa", nadi: "Antya" },
  { name: "Anuradha", rashi: "Scorpio", lord: "Saturn", varna: "Brahmin", vashya: "Keeta", yoni: "Deer", gana: "Deva", nadi: "Madhya" },
  { name: "Jyeshtha", rashi: "Scorpio", lord: "Mercury", varna: "Brahmin", vashya: "Keeta", yoni: "Deer", gana: "Rakshasa", nadi: "Aadi" },
  { name: "Mula", rashi: "Sagittarius", lord: "Ketu", varna: "Kshatriya", vashya: "Nara", yoni: "Dog", gana: "Rakshasa", nadi: "Aadi" },
  { name: "Purva Ashadha", rashi: "Sagittarius", lord: "Venus", varna: "Kshatriya", vashya: "Nara", yoni: "Monkey", gana: "Manushya", nadi: "Madhya" },
  { name: "Uttara Ashadha", rashi: "Sagittarius/Capricorn", lord: "Sun", varna: "Kshatriya", vashya: "Nara/Chatushpad", yoni: "Mongoose", gana: "Manushya", nadi: "Antya" },
  { name: "Shravana", rashi: "Capricorn", lord: "Moon", varna: "Vaisya", vashya: "Chatushpad", yoni: "Monkey", gana: "Deva", nadi: "Antya" },
  { name: "Dhanishta", rashi: "Capricorn/Aquarius", lord: "Mars", varna: "Sudra", vashya: "Chatushpad/Nara", yoni: "Lion", gana: "Rakshasa", nadi: "Madhya" },
  { name: "Shatabhisha", rashi: "Aquarius", lord: "Rahu", varna: "Sudra", vashya: "Nara", yoni: "Horse", gana: "Rakshasa", nadi: "Aadi" },
  { name: "Purva Bhadrapada", rashi: "Aquarius/Pisces", lord: "Jupiter", varna: "Brahmin", vashya: "Nara/Jalchar", yoni: "Lion", gana: "Manushya", nadi: "Aadi" },
  { name: "Uttara Bhadrapada", rashi: "Pisces", lord: "Saturn", varna: "Brahmin", vashya: "Jalchar", yoni: "Cow", gana: "Manushya", nadi: "Madhya" },
  { name: "Revati", rashi: "Pisces", lord: "Mercury", varna: "Brahmin", vashya: "Jalchar", yoni: "Elephant", gana: "Deva", nadi: "Antya" }
];

export const RASI_LORDS: Record<string, string> = {
  Aries: "Mars", Taurus: "Venus", Gemini: "Mercury", Cancer: "Moon", Leo: "Sun", Virgo: "Mercury",
  Libra: "Venus", Scorpio: "Mars", Sagittarius: "Jupiter", Capricorn: "Saturn", Aquarius: "Saturn", Pisces: "Jupiter"
};

export const MAITRI_TABLE: Record<string, Record<string, number>> = {
  Sun: { Sun: 5, Moon: 5, Mars: 5, Mercury: 4, Jupiter: 5, Venus: 0, Saturn: 0 },
  Moon: { Sun: 5, Moon: 5, Mars: 4, Mercury: 5, Jupiter: 4, Venus: 0, Saturn: 0 },
  Mars: { Sun: 5, Moon: 4, Mars: 5, Mercury: 0, Jupiter: 5, Venus: 3, Saturn: 0 },
  Mercury: { Sun: 4, Moon: 0, Mars: 0, Mercury: 5, Jupiter: 0, Venus: 5, Saturn: 4 },
  Jupiter: { Sun: 5, Moon: 4, Mars: 5, Mercury: 0, Jupiter: 5, Venus: 0, Saturn: 0 },
  Venus: { Sun: 0, Moon: 0, Mars: 3, Mercury: 5, Jupiter: 0, Venus: 5, Saturn: 5 },
  Saturn: { Sun: 0, Moon: 0, Mars: 0, Mercury: 4, Jupiter: 0, Venus: 5, Saturn: 5 }
};

export const YONI_POINTS: Record<string, Record<string, number>> = {
  Horse: { Horse: 4, Elephant: 2, Sheep: 3, Serpent: 2, Dog: 1, Cat: 2, Rat: 1, Cow: 3, Buffalo: 2, Tiger: 1, Deer: 3, Monkey: 3, Mongoose: 2, Lion: 1 },
  Elephant: { Horse: 2, Elephant: 4, Sheep: 3, Serpent: 3, Dog: 2, Cat: 2, Rat: 2, Cow: 2, Buffalo: 3, Tiger: 1, Deer: 2, Monkey: 3, Mongoose: 2, Lion: 1 },
  Sheep: { Horse: 3, Elephant: 3, Sheep: 4, Serpent: 2, Dog: 1, Cat: 2, Rat: 1, Cow: 1, Buffalo: 1, Tiger: 1, Deer: 2, Monkey: 2, Mongoose: 2, Lion: 0 },
  Serpent: { Horse: 2, Elephant: 3, Sheep: 2, Serpent: 4, Dog: 2, Cat: 1, Rat: 1, Cow: 1, Buffalo: 1, Tiger: 1, Deer: 2, Monkey: 2, Mongoose: 0, Lion: 1 },
  // ... (Simplificado por brevidade, pode ser expandido conforme necessário)
};

export const GANA_POINTS: Record<string, Record<string, number>> = {
  Deva: { Deva: 6, Manushya: 5, Rakshasa: 1 },
  Manushya: { Deva: 5, Manushya: 6, Rakshasa: 0 },
  Rakshasa: { Deva: 1, Manushya: 0, Rakshasa: 6 }
};

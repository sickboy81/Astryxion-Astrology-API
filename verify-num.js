async function verify() {
  const url = 'http://localhost:3000/api/v1/numerology/complete';
  const body = {
    fullName: "Maria Silva",
    dateOfBirth: "1990-05-14",
    comparisonName: "Jose Santos",
    targetYear: 2026
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-internal-call': 'true' 
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (res.ok) {
      console.log("SUCCESS: Unified Numerology Engine is running perfectly.");
      console.log(" традиции (Traditions) check:");
      console.log("- Pythagorean:", !!data.pythagorean?.lifePath?.meaning);
      console.log("- Chaldean:", !!data.chaldean?.nameNumber?.compoundMeaning);
      console.log("- Vedic Planet:", data.vedic?.psychicNumber?.planet);
      console.log("- Kabbalah:", data.kabbalah?.motivation?.label);
      console.log("- Lo Shu Grid:", data.loShuGrid?.grid?.length === 3);
      console.log("- Compatibility:", data.compatibility?.score, data.compatibility?.rating);
    } else {
      console.log("FAILED:", data);
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

verify();

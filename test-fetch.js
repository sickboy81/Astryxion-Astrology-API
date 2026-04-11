async function test() {
    const res = await fetch('http://localhost:3000/api/v1/vedic-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-internal-call': 'true' },
        body: JSON.stringify({
            date: "1990-05-15",
            timeUtc: "14:30:00",
            latitude: -23.55,
            longitude: -46.63
        })
    });
    console.log(res.status);
    console.log(await res.text());
}
test();

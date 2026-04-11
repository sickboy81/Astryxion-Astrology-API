async function test() {
    const res = await fetch('http://localhost:3000/api/v1/geo/search?q=Rio', {
        headers: { 'x-internal-call': 'true' }
    });
    console.log(await res.text());
}
test();

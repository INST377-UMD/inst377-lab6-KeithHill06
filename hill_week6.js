function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

const map = L.map('map').setView([38, -95], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

const pins = [
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
    { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
];

pins.forEach((marker, index) => {
    const adder = L.marker([marker.lat, marker.lon]).addTo(map);
    document.getElementById(`coords${index + 1}`).textContent = `Latitude: ${marker.lat}, Longitude: ${marker.lon}`;

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${marker.lat}&longitude=${marker.lon}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const loc = data.locality;
            document.getElementById(`loc${index + 1}`).textContent = loc;
        })
});
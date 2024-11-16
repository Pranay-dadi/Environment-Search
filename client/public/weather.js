function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
    });

    map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lon = event.latLng.lng();
        fetchWeatherData(lat, lon);
    });
}

window.initMap = initMap;

async function fetchWeatherData(lat, lon) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=4f238f9b37f0e7ffd5794fe164479fe5`);
        const data = await response.json();
        displayWeatherInfo(data);
        updateAirQualityMeter(data.list[0].main.aqi); // Update the air quality meter
    } catch (error) {
        console.error("Error fetching pollution data:", error);
        document.getElementById('weather-details').innerHTML = '<p>Error fetching weather data</p>';
        updateAirQualityMeter(0); // Reset meter on error
    }
}

function displayWeatherInfo(data) {
    const weatherDetailsDiv = document.getElementById('weather-details');

    // Create a table to display the weather info
    const table = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Attribute</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Latitude</td>
                    <td>${data.coord.lat}</td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td>${data.coord.lon}</td>
                </tr>
                <tr>
                    <td>Air Quality Index</td>
                    <td>${data.list[0].main.aqi}</td>
                </tr>
                <tr>
                    <td>CO Level</td>
                    <td>${data.list[0].components.co}</td>
                </tr>
                <tr>
                    <td>NO Level</td>
                    <td>${data.list[0].components.no}</td>
                </tr>
                <tr>
                    <td>NO2 Level</td>
                    <td>${data.list[0].components.no2}</td>
                </tr>
                <tr>
                    <td>SO2 Level</td>
                    <td>${data.list[0].components.so2}</td>
                </tr>
                <tr>
                    <td>O3 Level</td>
                    <td>${data.list[0].components.o3}</td>
                </tr>
                <tr>
                    <td>PM 2.5 Level</td>
                    <td>${data.list[0].components.pm2_5}</td>
                </tr>
                <tr>
                    <td>PM 10 Level</td>
                    <td>${data.list[0].components.pm10}</td>
                </tr>
                <tr>
                    <td>NH3 Level</td>
                    <td>${data.list[0].components.nh3}</td>
                </tr>
            </tbody>
        </table>
    `;

    weatherDetailsDiv.innerHTML = table;
}



function updateAirQualityMeter(aqi) {
    const meter = document.getElementById('air-quality-meter');
    const status = document.getElementById('air-quality-status');
    let color, text;

    // Determine the color and text based on AQI value
    switch (aqi) {
        case 1:
            color = '#00e400'; // Good (Green)
            text = 'Good';
            break;
        case 2:
            color = '#ffff00'; // Moderate (Yellow)
            text = 'Moderate';
            break;
        case 3:
            color = '#ff7e00'; // Unhealthy for sensitive groups (Orange)
            text = 'Unhealthy for Sensitive Groups';
            break;
        case 4:
            color = '#ff0000'; // Unhealthy (Red)
            text = 'Unhealthy';
            break;
        case 5:
            color = '#99004d'; // Very Unhealthy (Purple)
            text = 'Very Unhealthy';
            break;
        default:
            color = '#d3d3d3'; // Default color for unknown
            text = 'Unknown';
    }

    meter.style.backgroundColor = color; // Change the meter color
    status.textContent = `Air Quality: ${text}`; // Display air quality status text
}

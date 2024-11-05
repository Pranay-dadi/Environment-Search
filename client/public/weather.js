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
    weatherDetailsDiv.innerHTML = `
        <p>Latitude: ${data.coord.lat}</p>
        <p>Longitude: ${data.coord.lon}</p>
        <p>Air Quality Index: ${data.list[0].main.aqi}</p>
        <p>CO level: ${data.list[0].components.co}</p>
        <p>NO level: ${data.list[0].components.no}</p>
        <p>NO2 level: ${data.list[0].components.no2}°C</p>
        <p>SO2 level: ${data.list[0].components.so2}%</p>
        <p>O3 level: ${data.list[0].components.o3}</p>
        <p>PM 2.5 level: ${data.list[0].components.pm2_5}</p>
        <p>PM 10 level: ${data.list[0].components.pm10}</p>
        <p>NH3 level: ${data.list[0].components.nh3}</p>
    `;
    
}

function updateAirQualityMeter(aqi) {
    const meter = document.getElementById('air-quality-meter');
    let color;

    // Determine the color based on AQI value
    switch (aqi) {
        case 1:
            color = '#00e400'; // Good (Green)
            break;
        case 2:
            color = '#ffff00'; // Moderate (Yellow)
            break;
        case 3:
            color = '#ff7e00'; // Unhealthy for sensitive groups (Orange)
            break;
        case 4:
            color = '#ff0000'; // Unhealthy (Red)
            break;
        case 5:
            color = '#99004d'; // Very Unhealthy (Purple)
            break;
        default:
            color = '#d3d3d3'; // Default color for unknown
    }

    meter.style.backgroundColor = color; // Change the meter color
}

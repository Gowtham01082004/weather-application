const inputValue = document.querySelector('.input-val');
const searchBtn = document.getElementById('searchButton');
const weather_status = document.querySelector('.weather-status');
const not_found = document.querySelector('.not-found');
const display = document.querySelector('.display');
const temperature = document.querySelector('.weather-data');
const description = document.querySelector('.weather-data2');
const humidity = document.getElementById('humidity');
const visibility = document.getElementById('visibility');
const wind_speed = document.getElementById('wind-speed');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

async function weatherCheck(city){
    if(city.trim() === '') {
        alert("Please enter a location.");
        return;
    }

    const API_KEY = "aafc4233f5bb6119a3d5fdad93926f0e";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await fetch(URL);
        const weather_data = await response.json();

        if(weather_data.cod === "404") {
            not_found.style.display = "flex";
            display.style.display = "none";
            return;
        }

        not_found.style.display = "none";
        display.style.display = "flex";

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}<sup>°C</sup>`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        visibility.innerHTML = `${weather_data.visibility / 1000} Km`;
        humidity.innerHTML = `${weather_data.main.humidity} %`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/h`;

        const sunriseTime = new Date(weather_data.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        const sunsetTime = new Date(weather_data.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
        
        sunrise.innerHTML = sunriseTime;
        sunset.innerHTML = sunsetTime;

        switch(weather_data.weather[0].main) {
            case 'Rain':
                weather_status.src = "rain.gif";
                break;
            case 'Clouds':
                weather_status.src = "cloudy.gif";
                break;
            case 'Mist':
                weather_status.src = "mist.gif";
                break;
            case 'Smoke':
                weather_status.src = "mist.gif";
                break;
            case 'Haze':
                weather_status.src = "haze.gif";
                break;
            case 'Fog':
                weather_status.src = "fog.gif";
                break;
            case 'Snow':
                weather_status.src = "snow.gif";
                break;
            case 'Clear':
                weather_status.src = "clear.gif";
                break;
            default:
                weather_status.src = "default.gif";
        }
    } catch (error) {
        not_found.style.display = "flex";
        display.style.display = "none";
        console.error("Error fetching weather data: ", error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputValue.value;
    weatherCheck(city);
});

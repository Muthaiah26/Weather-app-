const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");

const API_KEY = "13f1c646e75f41c3b3a125105241711"; 
const createCurrentWeatherCard = (data) => {
    return `<div class="details">
                <h2>${data.location.name} (${data.location.localtime.split(" ")[0]})</h2>
                <h6>Temperature: ${data.current.temp_c}°C</h6>
                <h6>Wind: ${data.current.wind_kph} kph</h6>
                <h6>Humidity: ${data.current.humidity}%</h6>
            </div>
            <div class="icon">
                <img src="https:${data.current.condition.icon}" alt="weather-icon">
                <h6>${data.current.condition.text}</h6>
            </div>`;
};

const createForecastCards = (forecastDays) => {
    return forecastDays.map(day => {
        return `<li class="card">
                    <h3>${day.date}</h3>
                    <img src="https:${day.day.condition.icon}" alt="weather-icon">
                    <h6>Temp: ${day.day.avgtemp_c}°C</h6>
                    <h6>Wind: ${day.day.maxwind_kph} kph</h6>
                    <h6>Humidity: ${day.day.avghumidity}%</h6>
                </li>`;
    }).join('');
};

const getWeatherDetails = (cityName) => {
    const WEATHER_API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5`;

    fetch(WEATHER_API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("WeatherAPI response:", data); 
            
            if (!data.location) {
                alert(`No weather data found for "${cityName}". Please check the city name.`);
                return;
            }

            cityInput.value = "";
            currentWeatherDiv.innerHTML = createCurrentWeatherCard(data);
            weatherCardsDiv.innerHTML = createForecastCards(data.forecast.forecastday);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching the weather data. Please try again later.");
        });
};

const getCityWeather = () => {
    const cityName = cityInput.value.trim();
    if (cityName === "") {
        alert("Please enter a city name.");
        return;
    }
    getWeatherDetails(cityName);
};

searchButton.addEventListener("click", getCityWeather);
cityInput.addEventListener("keyup", e => e.key === "Enter" && getCityWeather());

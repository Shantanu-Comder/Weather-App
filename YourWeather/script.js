const apiKey = '4247b45f0f319a9c2460e083012622ce'


async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        console.log(data);

        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const formElement = document.querySelector(".search-form");

const inputElement = document.querySelector(".city-input");

const cityElement = document.querySelector(".city");

const date = document.querySelector(".date");

const descriptionIcon = document.querySelector(".description i");

const descriptionText = document.querySelector(".description-text");

const temperature = document.querySelector(".temp");

const windSpeed = document.querySelector(".wind-speed");

const humidity = document.querySelector(".humidity");

const visibility = document.querySelector(".visibility-distance");



function updateWeatherUI(data) {

    cityElement.textContent = data.name;
    
    date.textContent = currentDate.toDateString();
    
    descriptionText.textContent = data.weather[0].description;
    
    temperature.textContent = `${Math.round(data.main.temp)}°`;
    
    windSpeed.textContent = `${data.wind.speed} km/h`;
    
    humidity.textContent = `${data.main.humidity}%`;
    
    visibility.textContent = `${data.visibility / 1000} km`;

    const currentDate = new Date();
    
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    
    descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}


formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}

document.addEventListener('DOMContentLoaded',()=>{
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');
    const cityNameEl = document.getElementById('city-name');
    const localTimeEl = document.getElementById('local-time');
    const weatherIconEl = document.getElementById('weather-icon');
    const temperatureEl = document.getElementById('temperature');
    const conditionEl = document.getElementById('condition');
    const feelsLikeEl = document.getElementById('feels-like');
    const humidityEl = document.getElementById('humidity');
    const windSpeedEl = document.getElementById('wind-speed');
    const pressureEl = document.getElementById('pressure');
    const visibilityEl = document.getElementById('visibility');
    const uvIndexEl = document.getElementById('uv-index');

    const API_KEY = '05593afd13d9427585a201822251308';

    async function fetchWeatherData(city){
        try{
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=pt`);
            const data = await response.json();

            if(data.error){
                weatherResult.classList.add('hidden');
                errorMessage.classList.remove('hidden');
                return;
            }

            displayWeatherData(data);
        }catch(error){
            console.error("Erro ao buscar dados da API:", error);
            weatherResult.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    }

    function displayWeatherData(data){
        errorMessage.classList.add('hidden');
        weatherResult.classList.remove('hidden');

        cityNameEl.textContent = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
        localTimeEl.textContent = `Hora local: ${data.location.localtime}`;
        weatherIconEl.src = data.current.condition.icon;
        weatherIconEl.alt = data.current.condition.text;
        temperatureEl.textContent = `${data.current.temp_c}°C`;
        conditionEl.textContent = data.current.condition.text;
        feelsLikeEl.textContent = `${data.current.feelslike_c}°C`;
        humidityEl.textContent = `${data.current.humidity}%`;
        windSpeedEl.textContent = `${data.current.wind_kph} km/h`;
        pressureEl.textContent = `${data.current.pressure_mb} mb`;
        visibilityEl.textContent = `${data.current.vis_km} km`;
        uvIndexEl.textContent = data.current.uv;
    }

    searchBtn.addEventListener('click',()=>{
        const city = cityInput.value.trim();
        if(city){
            fetchWeatherData(city);
        }else{
            alert('Por favor, digite o nome de uma cidade.');
        }
    }
    );

    cityInput.addEventListener('keydown',(event)=>{
        if(event.key=='Enter'){
            searchBtn.click();
        }
    }
    );
}
);
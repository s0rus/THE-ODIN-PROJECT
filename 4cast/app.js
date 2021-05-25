const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';

const createElement = (element, nameClass, content) => {
  const createdElement = document.createElement(element);
  createdElement.className = nameClass;
  createdElement.textContent = content;

  return createdElement;
};

const getWeather = async (query) => {
  try {
    const URL = `${BASE_URL}q=${query}&appid=f9475d8236b76b482833d3d6b22d3c9f`;
    const response = await fetch(URL, { mode: 'cors' });
    const weatherData = await response.json();
    const temperatures = weatherData.main;
    const { weather } = weatherData.weather;
    const location = weatherData.name;
    const { country } = weatherData.sys;

    return {
      location,
      country,
      temperatures,
      weather,
    };
  } catch (error) {
    console.log(error);
  }
};

const determineTemperature = (tempKelvin) => {
  const switchElement = document.querySelector('input[type="checkbox"]');

  return switchElement.checked
    ? `${Math.floor(tempKelvin * (9 / 5) - 459.67)}°F`
    : `${Math.floor(tempKelvin - 273.15)}°C`;
};

const cleanContainer = () =>
  document.querySelector('.weather-container').remove();

const displayWeather = async (query) => {
  if (query === '') return false;
  if (document.querySelector('.weather-container')) {
    cleanContainer();
  }

  try {
    const weatherData = await getWeather(query);

    const weatherContainer = createElement('div', 'weather-container', null);

    weatherContainer.appendChild(
      createElement(
        'h1',
        'location',
        `${weatherData.location}, ${weatherData.country}`,
      ),
    );

    weatherContainer.appendChild(
      createElement(
        'h1',
        'temperature',
        determineTemperature(weatherData.temperatures.temp),
      ),
    );

    weatherContainer.appendChild(
      createElement(
        'h1',
        'info',
        `FEELS LIKE: ${determineTemperature(
          weatherData.temperatures.feels_like,
        )}`,
      ),
    );

    weatherContainer.appendChild(
      createElement(
        'h1',
        'info',
        `HUMIDITY: ${weatherData.temperatures.humidity}%`,
      ),
    );

    weatherContainer.appendChild(
      createElement(
        'h1',
        'info',
        `PRESSURE: ${weatherData.temperatures.pressure} hPa`,
      ),
    );

    document.body.appendChild(weatherContainer);
  } catch (error) {
    console.log(error);
  }
};

(() => {
  const searchInput = document.querySelector('#search-input');
  const searchButton = document.querySelector('#search-button');

  searchButton.addEventListener('click', () =>
    displayWeather(searchInput.value),
  );

  displayWeather('Kraków');
})();

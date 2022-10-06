import { useState } from 'react';
import Search from './components/Search/Search';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import Forecast from './components/Forecast/Forecast';
import './App.css';

const loader = (
  <div style={{ textAlign: 'center' }}>
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const handleOnSearchChange = (searchData) => {
    setIsLoading(true);
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponseData = await response[0].json();
        const forecastResponseData = await response[1].json();

        if (weatherResponseData && forecastResponseData) {
          setIsLoading(false);
          setCurrentWeather({ city: searchData.label, ...weatherResponseData });
          setForecast({ city: searchData.label, ...forecastResponseData });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1>ReactWeather</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {loading && loader}
      {!loading && currentWeather && <CurrentWeather data={currentWeather} />}
      {!loading && forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;

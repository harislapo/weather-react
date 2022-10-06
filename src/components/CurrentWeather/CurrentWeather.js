import classes from './CurrentWeather.module.css';

const CurrentWeather = ({ data }) => {
  return (
    <div className={classes.weather}>
      <div className={classes.top}>
        <div>
          <p className={classes.city}>{data.city}</p>
          <p className={classes['weather-description']}>
            {data.weather[0].description}
          </p>
        </div>
        <img
          alt="weather"
          className={classes['weather-icon']}
          src={`icons/${data.weather[0].icon}.png`}
        />
      </div>
      <div className={classes.bottom}>
        <p className={classes.temperature}>{Math.round(data.main.temp)}°C</p>
        <div className={classes.details}>
          <div className={classes['parameter-row']}>
            <span className={`${classes['parameter-label']} ${classes.top}`}>
              Details
            </span>
          </div>
          <div className={classes['parameter-row']}>
            <span className={classes['parameter-label']}>Feels like</span>
            <span className={classes['parameter-value']}>
              {Math.round(data.main.feels_like)}°C
            </span>
          </div>
          <div className={classes['parameter-row']}>
            <span className={classes['parameter-label']}>Wind</span>
            <span className={classes['parameter-value']}>
              {Math.round(data.wind.speed)} m/s
            </span>
          </div>
          <div className={classes['parameter-row']}>
            <span className={classes['parameter-label']}>Humidity</span>
            <span className={classes['parameter-value']}>
              {data.main.humidity}%
            </span>
          </div>
          <div className={classes['parameter-row']}>
            <span className={classes['parameter-label']}>Pressure</span>
            <span className={classes['parameter-value']}>
              {data.main.pressure} hPa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;

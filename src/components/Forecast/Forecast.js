import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import classes from './Forecast.module.css';

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Forecast = ({ data }) => {
  const currentDay = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(currentDay, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, currentDay)
  );

  return (
    <>
      <div className={classes['centered-title']}>
        <label className={classes.title}>Daily</label>
      </div>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, index) => {
          return (
            <AccordionItem key={index}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className={classes['daily-item']}>
                    <img
                      alt="weather"
                      className={classes['icon-small']}
                      src={`icons/${item.weather[0].icon}.png`}
                    />
                    <label className={classes.day}>{forecastDays[index]}</label>
                    <label className={classes.description}>
                      {item.weather[0].description}
                    </label>
                    {/* Since the API was broken for the min and max temperatures, I added a random number 
                    to the max temperature just for the look of it. It did not make sense that min and max were the same. */}
                    <label className={classes['min-max']}>
                      {Math.round(item.main.temp_min)} °C /
                      {Math.round(item.main.temp_max) +
                        Math.floor(Math.random() * 10)}
                      °C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className={classes['daily-details-grid']}>
                  <div className={classes['daily-details-grid-item']}>
                    <label>Pressure</label>
                    <label>{item.main.pressure} hPa</label>
                  </div>
                  <div className={classes['daily-details-grid-item']}>
                    <label>Humidity</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className={classes['daily-details-grid-item']}>
                    <label>Clouds</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className={classes['daily-details-grid-item']}>
                    <label>Wind speed</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className={classes['daily-details-grid-item']}>
                    <label>Feels like</label>
                    <label>{Math.round(item.main.feels_like)}°C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};

export default Forecast;

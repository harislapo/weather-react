import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions, GEO_API_URL } from '../../api';
import classes from './Search.module.css';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState();

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=200000&namePrefix=${inputValue}`,
        geoApiOptions
      );
      const responseData = await response.json();
      return {
        options: responseData.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          };
        }),
      };
    } catch (err) {
      return console.error(err);
    }
  };

  return (
    <AsyncPaginate
      className={classes.search}
      placeholder="Enter a city.."
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;

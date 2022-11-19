
import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@mui/material";
const Header = () => {
  const [countries, setCountries] = useState([""]);
  const [selectedCountry, setSelectedCountry] = useState("Worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, [countries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setSelectedCountry(countryCode);
  };
  return (
    <div className="app__header flex flex-row justify-between align-middle">
      <h1>The tracker</h1>
      <FormControl>
        <Select
          variant="outlined"
          onChange={onCountryChange}
          value={selectedCountry}
        >
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map((country, id) => (
            <MenuItem key={id} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Header;

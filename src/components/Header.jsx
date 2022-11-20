import React, { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
const Header = () => {
  const [countries, setCountries] = useState([""]);
  const [selectedCountry, setSelectedCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});

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

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/countries"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSelectedCountry(countryCode);
        setCountryInfo(data);
      });
  };
  return (
    <div className="app__header flex flex-row justify-between align-middle">
      <h1>The tracker</h1>
      <FormControl>
        <select
          variant="outlined"
          onChange={onCountryChange}
          value={selectedCountry}
        >
          <option value="Worldwide">Worldwide</option>
          {countries.map((country, id) => (
            <option key={id} value={country.value}>
              {country.name}
            </option>
          ))}
        </select>
      </FormControl>
    </div>
  );
};

export default Header;

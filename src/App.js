import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import Header from "./components/Header";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";

const App = () => {
  const [countries, setCountries] = useState([""]);
  const [selectedCountry, setSelectedCountry] = useState("Worldwide");
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
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/countries"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setSelectedCountry(countryCode);
        setCountryInfo(data);
        console.log(countryInfo)
      });
  };
  return (
    <div className="app sm:flex sm:flex-col ">
      <div className="app__left">
        {/*  */}
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

        {/*  */}
        {/*  */}
        <div className="app__stats flex flex-row justify-between">
          <InfoBox /> <InfoBox /> <InfoBox />
        </div>
        {/*  */}
        {/*  */}
        <Map />
        {/*  */}
      </div>
      <Card className="app__right">
        <CardContent>
          {/* table */}
          {/* graph */}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;

/** @format */

import { Card, CardContent, FormGroup, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import numeral from "numeral"
import "./App.css"
import InfoBox from "./components/InfoBox"
import LineGraph from "./components/LineGraph"
import Map from "./components/Map"
import Table from "./components/Table"
import { sortData, prettyPrintStat } from "./utils/utils"

const kenya = { lat: 0.02, lng: 37.9 }
const africa = { lat: 8.78, lng: 34.5 }

function App() {
  const [countries, setCountries] = useState([])
  const [country, setInputCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [mapCenter, setMapCenter] = useState({ lat: 55.3781, lng: 3.436 })
  const [mapZoom, setMapZoom] = useState(3)

  const [mapCountries, setMapCountries] = useState([])

  const [tableData, setTableData] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [showGraph, setShowGraph] = useState(true)

  const handleCountrySelect = async (e) => {
    e.preventDefault()
    const countryCode = e.target.value

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        console.log(mapCenter)
        setMapZoom(3)
      })
  }

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            key: country._id,
          }))

          const sortedData = sortData(data)
          setMapCountries(data)
          setCountries(countries)

          setTableData(sortedData)
        })
    }
    getCountriesData()
  }, [])

  return (
    <div className="app h-[100vh] w-full flex flex-col bg-gradient-to-r from-sky-500 to-indigo-500">
      {/* TopHeader  */}
      <div className="app__Header flex flex-row justify-between">
        <span className="appTitle text-4xl p-3 flex justify-center font-semibold">
          Tracker
        </span>
        {/*  */}
        <div className="formGroup__Button">
          <FormGroup sx={{ width: 200 }}>
            <Select value={country} onChange={handleCountrySelect}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, key) => {
                return (
                  <MenuItem key={key} value={country.value}>
                    {country.name}
                  </MenuItem>
                )
              })}
            </Select>
          </FormGroup>
        </div>
      </div>
      <hr />
      <div className="appBody flex flex-row p-2 gap-3">
        {/* App Left */}
        <div className="app__left relative flex-1">
          {/* Stats */}
          <div className="app__Stats flex flex-row justify-around gap-3">
            <InfoBox
              title="Covid Cases"
              cases={prettyPrintStat(countryInfo.todayCases)}
              total={numeral(countryInfo.cases).format("0.0a")}
            />
            <InfoBox
              title="Recovered"
              cases={prettyPrintStat(countryInfo.todayRecovered)}
              total={numeral(countryInfo.recovered).format("0.0a")}
            />
            <InfoBox
              title="Deaths"
              cases={prettyPrintStat(countryInfo.todayDeaths)}
              total={numeral(countryInfo.deaths).format("0.0a")}
            />
          </div>
          {/* Map */}
          <div className="mapDiv">
            <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

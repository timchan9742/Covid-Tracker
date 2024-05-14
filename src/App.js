import React, {useState, useEffect} from "react"
import InfoBox from "./components/InfoBox.js"
import Map from "./components/Map.js"
import {FormControl, Select, MenuItem, Card, CardContent} from "@material-ui/core"
import Table from "./components/Table.js"
import Graph from "./components/Graph.js"
import "leaflet/dist/leaflet.css"
import "./App.css"

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [updates, setUpdates] = useState({})
  const [mapCenter, setMapCenter] = useState( [34.80746, -40.4796] )
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])

  const getCountryData = async (targetURL, type) => {
    await fetch(targetURL)
    .then(response => response.json())
    .then(data => {
      setUpdates(data)
    })
  }

  useEffect(()=> {
    const targetURL = "https://disease.sh/v3/covid-19/countries"
    const getCountries = async () => {
      await fetch(targetURL)
      .then(response => response.json())
      .then(data => {
        setCountries(data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        })))
        setMapCountries(data)
      })
    }
    getCountries()
    getCountryData("https://disease.sh/v3/covid-19/all", "default")

  },[])

  const onCountryChange = async (event) => {

    const countryCode = event.target.value
    setCountry(countryCode)
    console.log(country)

    const targetURL = countryCode === "worldwide"? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(targetURL)
    .then(response => response.json())
    .then(data => {
      setUpdates(data)
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });

    // getCountryData(targetURL, "on-change")
  }

  return (
    <div className="app">
      <div className="left-panel">
        <div className="header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app-dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app-stats">
          <InfoBox title="Coronavirus cases" newCases={updates.todayCases} total={updates.cases} />
          <InfoBox title="Recovered" newCases={updates.todayRecovered} total={updates.recovered} />
          <InfoBox title="Deaths" newCases={updates.todayDeaths} total={updates.deaths} />
        </div>

        <Map center={mapCenter} zoom={mapZoom} countries={mapCountries}/>
      </div>

      <Card className="right-panel">
        <CardContent className="right-card-container">
          <h2>Live cases by Country</h2>
          <Table />
          <h2>Worldwide new cases</h2>
          <Graph countryCode={country} caseType="cases"/>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;

import React from "react"
import { MapContainer as LeafletMap, TileLayer, Circle, Popup} from "react-leaflet"
import numeral from "numeral"
import ChangeView from "./ChangeView.js"
import "./Map.css"

function Map(props) {

  return (
    <div className="map">
      <LeafletMap center={props.center} zoom={props.zoom}>
        <ChangeView center={props.center} zoom={props.zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {props.countries?.map(country => (
          <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color="#CC1034"
            radius={Math.sqrt(country.cases) * 60}
          >
            <Popup>
              <div className="popup-container">
                <div className="popup-name">
                  <h3>{country.country}</h3>
                </div>
                <div className="popup-cases">
                  Cases: {numeral(country.cases).format("0,0")}
                </div>
                <div className="popup-recovered">
                  Recovered: {numeral(country.recovered).format("0,0")}
                </div>
                <div className="popup-deaths">
                  Deaths: {numeral(country.deaths).format("0,0")}
                </div>
              </div>
            </Popup>
          </Circle>
        ))}
      </LeafletMap>
    </div>
  )
}

export default Map

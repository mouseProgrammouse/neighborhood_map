import React, { Component } from 'react'
import Map from './Map'
import Locations from './Locations'
import * as LocationsInfo from './LocationsInfo'
import './App.css'

class App extends Component {
  state = {
    //lat and lng of center my home district at Dublin city
    initialLocation: {lat: 53.325182, lng: -6.270153},
    zoom: 14,
    map: null,
    geocoder: null,
    locations: [],
    markerIcon: require('./icons/coffee-icon.svg')
  }

  componentDidMount = () => {
    //get and set cafe's locations
    this.setState ({
      locations: LocationsInfo.getLocationsInfo()
    })
  }

  setMap = (newMap) => {
    this.setState  ({ map: newMap })
  }

  setGeocoder = (newGeocoder) => {
    this.setState ({geocoder: newGeocoder})
  }

  setLocations = (newLocations) => {
    this.setState({locations: newLocations})
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>The Best Coffee at Dublin</h1>
        </div>
        <Locations
          locations={this.state.locations}
        />
        <Map
          setMap={this.setMap}
          setGeocoder={this.setGeocoder}
          setLocations={this.setLocations}
          initialLocation={this.state.initialLocation}
          markerIcon={this.state.markerIcon}
          locations={this.state.locations}
          zoom={this.state.zoom}
          map={this.state.map}
          geocoder={this.state.geocoder}
          />
      </div>
    );
  }
}

export default App

import React, { Component } from 'react'
import Map from './Map'
import * as Locations from './LocationsInfo'
import './App.css'

class App extends Component {
  state = {
    //lat and lng of center my home district at Dublin city
    initialLocation: {lat: 53.325182, lng: -6.270153},
    zoom: 14,
    map: null,
    locations: []
  }

  componentDidMount = () => {
    //get and set cafe's locations
    this.setState ({
      locations: Locations.getLocationsInfo()
    })
  }

  setMap = (newMap) => {
    this.setState  ({ map: newMap })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>The Best Coffee at Dublin</h1>
        </div>
        <Map
        setMap={this.setMap}
        initialLocation={this.state.initialLocation}
        locations={this.state.locations} zoom={this.state.zoom}
        map={this.state.map}/>
      </div>
    );
  }
}

export default App

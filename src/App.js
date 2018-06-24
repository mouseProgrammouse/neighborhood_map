import React, { Component } from 'react'
import Map from './Map'
import Locations from './Locations'
import * as Fetchers from './Fetchers'
import './App.css'

class App extends Component {
  state = {
    //lat and lng of center my home district at Dublin city
    initialLocation: {lat: 53.324176, lng: -6.265439},
    zoom: 14,
    map: null,
    locations: [],
    markerIcon: require('./icons/coffee-icon.svg')
  }

  componentWillMount = () => {
    //get and set cafe's locations
    Fetchers.getLocationsInfo().then((response)=>{
      if (response.status === 200) {
        return response.json()
      }
      else Promise.reject('Error: Can\'t get location\'s info. ' + response.status)
    }).then((data)=>{
      this.setLocations(data)
      //get more information about places from YELP
      let places = []
      for (const place of this.state.locations) {
        places.push(this.getInformationAboutPlace(place))
      }
      Promise.all(places).then((data)=>{
        console.log(data)
        this.setLocations(data)
      })
      //this.setLocations(places)
    }).catch((err)=>{console.error(' Can\'t get location\'s info from YELP: '+err)})
  }

  getInformationAboutPlace = (place) =>{
    //get info from YELP
    const newPlace = place
    return new Promise(function(resolve, reject) {
      Fetchers.getPlacesInfo(place).then((response)=>{
        if(response.status === 200){
          response.json().then((data)=>{
            newPlace.address = data.businesses[0].location.display_address[0]+' '+data.businesses[0].location.display_address[1]
            newPlace.phone = data.businesses[0].display_phone
            newPlace.img = data.businesses[0].image_url
            newPlace.yelpID = data.businesses[0].id
            resolve(place)
          })
        }
        else reject('Error: Can\'t get location\'s info from YELP. ' + response.status)
      })
    })
  }

  setMap = (newMap) => {
    this.setState  ({ map: newMap })
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
          initialLocation={this.state.initialLocation}
          markerIcon={this.state.markerIcon}
          locations={this.state.locations}
          zoom={this.state.zoom}
          map={this.state.map}
          />
      </div>
    );
  }
}

export default App

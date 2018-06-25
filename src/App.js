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
    defaultImg: require('./static/coffee.png'), //default img for info window
    markerIcon: require('./static/coffee-icon.svg')
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
      let businessesInfo = []
      for (const place of this.state.locations) {
        businessesInfo.push(this.getInformationAboutPlace(place, this.state.defaultImg))
      }
      Promise.all(businessesInfo).then((data)=>{
        this.setLocations(data)
        //get working info and rating
        let workingInfo = []
        for (const place of this.state.locations) {
          workingInfo.push(this.getWorkingHoursAndRating(place))
        }
        Promise.all(workingInfo).then((data)=>{
          this.setLocations(data)
        })
      })
      //this.setLocations(places)
    }).catch((err)=>{console.error(' Can\'t get location\'s info from YELP: '+err)})
  }

  /* for searching uses locations and cafe's name
  * search ONLY at Dublin, Ireland
  */
  getInformationAboutPlace = (place, defaultImg) => {
    //get info from YELP
    let newPlace = place
    //default information about place (If we didn't find inforamtion about it on YELP)
    newPlace.address = `You can use locations: lat ${place.location.lat}
    , lng ${place.location.lng}`
    newPlace.img = defaultImg
    return new Promise((resolve, reject) => {
      Fetchers.getPlacesInfo(place).then((response)=>{
        if(response.status === 200){
          response.json().then((data)=>{
            if (data.businesses[0]) {
              const businessInfo = data.businesses[0]
              newPlace.address = `${businessInfo.location.display_address[0]} ${businessInfo.location.display_address[1]}`
              newPlace.img = (businessInfo.image_url)?(businessInfo.image_url):(defaultImg)
              newPlace.phone = businessInfo.phone
              newPlace.yelpID = businessInfo.id
            }
            resolve(newPlace)
          })
        }
        else reject('Error: Can\'t get places\'s info from YELP. ' + response.status)
      })
    })
  }

  //we can get that info only by yelpID
  getWorkingHoursAndRating = (place) => {
    let newPlace = place
    //default information
    newPlace.is_closed = 'false'
    newPlace.rating = 0
    newPlace.hours = []
    return new Promise((resolve, reject) => {
      if (place.yelpID) {
        Fetchers.getWorkingInfoByYelpID(place.yelpID).then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              newPlace.is_closed = data.is_closed
              newPlace.rating = data.rating
              newPlace.hours = data.hours
              resolve(newPlace)
            })
          }
          else reject('Error: Can\'t get places\'s working info from YELP. ' + response.status)
        })
      } else resolve(newPlace)
    }
    )
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

import React, { Component } from 'react'
import Map from './Map'
import Locations from './Locations'
import PlaceInfo from './PlaceInfo'
import * as Fetchers from './Fetchers'
import './App.css'

class App extends Component {
  state = {
    //lat and lng of center my home district at Dublin city
    initialLocation: {lat: 53.324176, lng: -6.265439},
    zoom: 14,
    map: null,
    locations: [],
    ratings: [1,2,3,4,5],
    currentFilterRaiting: 'all',
    defaultImg: require('./static/coffee.png'), //default img for info window
    markerIcon: require('./static/coffee-icon.svg'),
    selectedPlace: null,//place selected for more information
    previousFocus: null, //for ARIA
    modalOn: false//uses for navigate througth modal window
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
    }).catch((err)=>{window.alert(' Can\'t get location\'s info from YELP: '+err)})
  }

  /* for searching uses locations and cafe's name
  * search ONLY at Dublin, Ireland
  */
  getInformationAboutPlace = (place, defaultImg) => {
    //get info from YELP
    let newPlace = place
    //default information about place (If we didn't find inforamtion about it on YELP)
    newPlace.address = `coordinates: ${place.location.lat}
    , ${place.location.lng}`
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

  //filter locations by rating
  //if value === all -> reset
  filterLocationsByRating = (e, locations) => {
    const value = e.target.value
    let newLocations = locations
    //hide info window
    this.setSelectedPlace(null)
    //hide/show locations from map and list
    if (value === 'all') {
      this.showAll(locations)
      //reset filters
    } else {
      for (const place of newLocations){
        place.show = (place.rating >= value)
      }
      this.setLocations(newLocations)
    }
    //set current value to filter
    this.setFilterRaiting(value)
  }

  //reset filter
  showAll = (locations) => {
    let newLocations = locations
    //hide/show locations from map and list
    for (const place of newLocations){
      place.show = true
    }
    this.setLocations(newLocations)
  }

  showPlaceInfo = (event, value, tabIndex) => {
    if (event.key === 'Enter' || event.type === 'click') {
      if (value) {
        //set selected place
        this.setSelectedPlace(value)
        if (event.key === 'Enter') {
          //set target (ARIA: for return focus on place)
          this.saveFocus(event.target)
          //activate navigate througth modal window
          this.setModalOn()
        }
      }
      else window.alert('Something wrong with location\'s info.')
    }
  }

  resetSelectedPlace = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      //return focus
      if (this.state.previousFocus) {
        this.state.previousFocus.focus()
        this.setModalOff()
      }
      this.setSelectedPlace(null)
    }
  }

  exitModal = (event) => {
    if (event.keyCode === 27) {
      //return focus
      if (this.state.previousFocus) {
        this.state.previousFocus.focus()
        this.setModalOff()
      }
      this.setSelectedPlace(null)
    }
  }

  setMap = (newMap) => {
    this.setState  ({ map: newMap })
  }

  setLocations = (newLocations) => {
    this.setState({locations: newLocations})
  }

  saveFocus = (target) => {
    this.setState({previousFocus: target})
  }

  setFilterRaiting = (newValue) => {
    this.setState({currentFilterRaiting: newValue})
  }

  setSelectedPlace = (newPlace) => {
    this.setState({selectedPlace: newPlace})
  }

  //those method uses for ARIA
  //if modalOn:true -> navigate throught modal window is on
  setModalOn = () => {
    this.setState({modalOn: true})
  }

  setModalOff = () => {
    this.setState({modalOn: false})
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1 tabIndex={1}>The Best Coffee at Dublin</h1>
        </div>
        <Map
          setMap={this.setMap}
          initialLocation={this.state.initialLocation}
          markerIcon={this.state.markerIcon}
          locations={this.state.locations}
          setLocations={this.setLocations}
          zoom={this.state.zoom}
          map={this.state.map}
        />
        <Locations
          locations={this.state.locations}
          showAll={this.showAll}
          showOpenNow={this.showOpenNow}
          currentFilterRaiting={this.state.currentFilterRaiting}
          filterLocationsByRating={this.filterLocationsByRating}
          ratings = {this.state.ratings}
          showPlaceInfo={this.showPlaceInfo}
          tabIndexStart={2}
        />
        <PlaceInfo
          place={this.state.selectedPlace}
          resetSelectedPlace={this.resetSelectedPlace}
          modalOn={this.state.modalOn}
          exitModal={this.exitModal}
          tabIndexStart={10}
        />
      </div>
    );
  }
}

export default App

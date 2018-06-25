/*global google*/
//for disable ESLint
import React, { Component } from 'react'
//for gogle map API loading
import scriptLoader from 'react-async-script-loader'

class Map extends Component {
  //initial map
  //update address info
  //add markers on map
  componentWillReceiveProps = ({ isScriptLoaded, isScriptLoadSucceed }) => {
    const {
      setMap,
      initialLocation,
      zoom
    } = this.props;

    if (isScriptLoaded && !this.props.isScriptLoaded) {
      //map loaded with succes
      if (isScriptLoadSucceed) {
        //create map
        const map = new google.maps.Map(this.refs.map, {
          center: initialLocation,
          zoom: zoom
        })
        //set map
        setMap(map)
      }
      else window.alert('Oh...Something bad happens😱 Map isn\'t loaded')
    }
  }

  componentWillUpdate = () => {
    const {
      locations,
      map,
      markerIcon,
      setLocations
     } = this.props;
    //when map is set - generate markers
    if (map) {
      //markers isn't exists
      if (!locations[0].hasOwnProperty('marker')) {
        //generate markers
        setLocations(this.generateMarkers(locations, map,  markerIcon))
      } else {
        //update markers on map
        this.hideMarkersOnMap(locations)
        this.showMarkersOnMap(map, locations)
      }
    }
  }

  generateMarkers = (locations, map,  markerIcon) => {
    let newLocations = []
    for (const i in locations) {
      let place = locations[i]
      //customize icon
      var customIcon = {
        url: markerIcon, // url
        scaledSize: new google.maps.Size(60, 60), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(30, 60) // anchor
      }
      // Create a marker per location, and put into markers array.
      let marker = new google.maps.Marker({
        position: place.location,
        title: place.title,
        address: place.address,
        phone: place.phone,
        img: place.img,
        animation: google.maps.Animation.DROP,
        map: map,
        icon: customIcon,
        id: i
      })

      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function() {
        //create content
        const contentString =
          `<div class='info-window'>
            <h2>${this.title}</h2>
            <img src='${this.img}' alt='cafe: ${this.title}'/>
            <p>${this.address}</p>
            <span class='phone'>${this.phone}</span>
          </div>`
        const infoWindow = new google.maps.InfoWindow({
          content: contentString
        })
        infoWindow.open(map, this)
      })

      //add marker to markers
      place.marker = marker
      newLocations.push(place)
    }
    return newLocations
  }

  showMarkersOnMap = (map, locations) => {
    for (const place of locations) {
      if(place.show) //show on map
        place.marker.setVisible(true)
    }
  }

  hideMarkersOnMap = (locations) => {
    for (const place of locations) {
      place.marker.setVisible(false)//hide from map
    }
  }

  render () {
    const {map} = this.props

    return (
      <div className="map-container">
        <div ref="map" id="map"></div>
        { !map && <div className="map-loader">Loading...</div> }
      </div>
    )
  }
}

export default scriptLoader(
  [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBera9lrx3RBYNJDG7XFUqzqKM3Ghm9GaE'
  ]
)(Map)

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
    const { locations, map, markerIcon } = this.props;
    if (map) {
      this.addMarkersOnMap(map, locations, markerIcon)
    }
  }

  addMarkersOnMap = (map, locations, markerIcon) => {
    for (const i in locations) {
      if (locations[i].show) {
        // Get the position of current marker
        const position = locations[i].location
        const title = locations[i].title
        const address = locations[i].address
        const img_src = locations[i].img
        const phone = locations[i].phone
        //customize icon
        var customIcon = {
          url: markerIcon, // url
          scaledSize: new google.maps.Size(60, 60), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(30, 60) // anchor
        }
        // Create a marker per location, and put into markers array.
        const marker = new google.maps.Marker({
          position: position,
          title: title,
          address: address,
          phone: phone,
          img: img_src,
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
        });
      }
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

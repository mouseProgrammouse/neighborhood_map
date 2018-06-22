/*global google*/
//for disable ESLint
import React, { Component } from 'react'
//for gogle map API loading
import scriptLoader from 'react-async-script-loader'

class Map extends Component {
  //initial map and geocoder
  //update address info
  //add markers on map
  componentWillReceiveProps = ({ isScriptLoaded, isScriptLoadSucceed }) => {
    const {
      setMap,
      setGeocoder,
      setLocations,
      initialLocation,
      zoom,
      locations,
      markerIcon
    } = this.props;

    if (isScriptLoaded && !this.props.isScriptLoaded) {
      //map loaded with succes
      if (isScriptLoadSucceed) {
        //create map
        const map = new google.maps.Map(this.refs.map, {
          center: initialLocation,
          zoom: zoom
        })
        //create geocoder(to get adresses for locations)
        const geocoder = new google.maps.Geocoder()
        //set map and geocoder
        setMap(map)
        setGeocoder(geocoder)
        //update address information about places
        let promises = []
        for (const place of locations) {
          promises.push(this.updatePlaceInfo(geocoder, place))
        }
        Promise.all(promises).then(results => {
          //update array with adresses in main component
          setLocations(results)
          //add markers on map
          this.addMarkersOnMap(map, locations, markerIcon)
        }).catch(err => {window.alert(err)})
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

  //get Info about place by using lat&lng
  //return promise
  updatePlaceInfo = (geocoder, place) => {
    let newPlace = place
    newPlace.address = ''//address by default
    return new Promise (function(resolve, reject){
      geocoder.geocode({'location': newPlace.location}, function(result, status) {
        if (status === 'OK') {
          //resolve(result)
          if(result) {
            newPlace.address = result[0].formatted_address
            resolve(newPlace)
          } else {
            resolve(newPlace)
          }
        } else {
          reject(new Error('Can\'t get addresses. Geocoder failed due to: ' + status))
        }
      })
    })
  }


  addMarkersOnMap = (map, locations, markerIcon) => {
    for (let i = 0; i < locations.length; i++) {
      // Get the position of current marker
      const position = locations[i].location
      const title = locations[i].title
      const address = locations[i].address
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
        animation: google.maps.Animation.DROP,
        map: map,
        icon: customIcon,
        id: i
      })

      //this.updatePlaceInfo(geocoder, map, position)
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function() {
        //create content
        const contentString = '<div class="info-window"><h2>'+this.title+'</h2><p>'+this.address+'</p></div>'
        const infoWindow = new google.maps.InfoWindow({
          content: contentString
        })
        infoWindow.open(map, this)
      });
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

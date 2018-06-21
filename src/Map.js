/*global google*/
//for disable ESLint
import React, { Component } from 'react'
//for gogle map API loading
import scriptLoader from 'react-async-script-loader'

class Map extends Component {
  componentWillReceiveProps = ({ isScriptLoaded, isScriptLoadSucceed }) => {
    const {setMap, initialLocation, zoom, locations} = this.props;

    if (isScriptLoaded && !this.props.isScriptLoaded) {
      //map loaded with succes
      if (isScriptLoadSucceed) {
        const map = new google.maps.Map(this.refs.map, {
          center: initialLocation,
          zoom: zoom
        })
        setMap(map)
        //add markers on map
        this.addMarkersOnMap(map, locations)
      }
      else alert('Oh...Something bad happens😱 Map isn\'t loaded')
    }
  }


  addMarkersOnMap = (map, locations) => {
    for (let i = 0; i < locations.length; i++) {
      // Get the position of current marker
      const position = locations[i].location;
      const title = locations[i].title;
      // Create a marker per location, and put into markers array.
      const marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        map: map,
        id: i
      });
      // Create an onclick event to open the large infowindow at each marker.
      marker.addListener('click', function() {
        //create content
        const contentString = '<div>'+this.title+'</div>'
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
        <div ref="map" style={{height: '600px'}}></div>
        { !map && <div className="center-md">Loading...</div> }
      </div>
    )
  }
}

export default scriptLoader(
  [
    'https://maps.googleapis.com/maps/api/js?key=AIzaSyBera9lrx3RBYNJDG7XFUqzqKM3Ghm9GaE'
  ]
)(Map)

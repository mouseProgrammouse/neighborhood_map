import React, { Component } from 'react'

class Locations extends Component {

render () {
  const {locations} = this.props

  return (
    <div className="location-container">
      <ul>
        { locations.map((location) => (<li key={location.title}>{location.title}</li>))}
      </ul>
    </div>
  )
}
}

export default Locations

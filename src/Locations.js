import React, { Component } from 'react'

class Locations extends Component {

render () {
  const {locations} = this.props

  return (
    <div className="location-container">
      <ul className="location-list">
        { locations.map((location) => (<li key={location.title}>
          <h2>{location.title}</h2>
          <p className="location-address">{location.address}</p>
          </li>))}
      </ul>
    </div>
  )
}
}

export default Locations

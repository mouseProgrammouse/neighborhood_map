import React from 'react'

const Locations = (props) => {
    const {
      locations,
      ratings,
      currentFilterRaiting,
      filterLocationsByRating
    } = props

    return (
      <div className="location-container">
        <div className="raiting-filter">
          <select value={currentFilterRaiting} onChange={(e) => filterLocationsByRating(e, locations)}>
            <option disabled>choose rating</option>
            {ratings.map((value)=>(
              <option key={value} value={value}>{value}</option>
            ))}
            <option key="all" value="all">all</option>
          </select>
        </div>
        <ul className="location-list">
          { locations.filter((location)=>(location.show)).map((location) => (<li key={location.title}>
            <h2>{location.title}</h2>
            <p className="location-address">{location.address}</p>
            <span className="rating">Rating: {location.rating}</span>
            </li>))}
        </ul>
      </div>
    )
}

export default Locations

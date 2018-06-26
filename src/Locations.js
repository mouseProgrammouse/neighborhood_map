import React from 'react'
import PropTypes from 'prop-types'

const Locations = (props) => {
    const {
      locations,
      ratings,
      currentFilterRaiting,
      filterLocationsByRating,
      showPlaceInfo
    } = props

    return (
      <div className="location-container">
        <div className="rating-filter">
          <select value={currentFilterRaiting} onChange={(e) => filterLocationsByRating(e, locations)}>
            <option disabled>choose rating</option>
            {ratings.map((value)=>(
              <option key={value} value={value}>{value}</option>
            ))}
            <option key="all" value="all">all</option>
          </select>
        </div>
        <ul className="location-list">
          { locations.filter((location)=>(location.show)).map((location) => (<li key={location.title} onClick={() => showPlaceInfo(location)}>
            <h2>{location.title}</h2>
            <img src={location.img} alt={location.title}/>
            <p className="location-address">{location.address}</p>
            <div className="rating">
              <i className="fa fa-yelp"></i>
              <span> {location.rating}</span>
            </div>
            </li>))}
        </ul>
      </div>
    )
}

Locations.propTypes = {
    locations: PropTypes.array.isRequired,
    ratings: PropTypes.array.isRequired,
    currentFilterRaiting: PropTypes.string.isRequired,
    filterLocationsByRating: PropTypes.func.isRequired,
    showPlaceInfo: PropTypes.func.isRequired
  }

export default Locations

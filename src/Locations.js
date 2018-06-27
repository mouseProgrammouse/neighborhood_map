import React from 'react'
import PropTypes from 'prop-types'

const Locations = (props) => {
    const {
      locations,
      ratings,
      currentFilterRaiting,
      filterLocationsByRating,
      showPlaceInfo,
      tabIndexStart
    } = props

    return (
      <div className="location-container" tabIndex={tabIndexStart} aria-label="information about cafe">
        <div role="listbox" className="rating-filter">
          <select tabIndex={tabIndexStart+1} aria-label="choose rating to filter cafe" value={currentFilterRaiting} onChange={(e) => filterLocationsByRating(e, locations)}>
            <option disabled>choose rating</option>
            {ratings.map((value)=>(
              <option key={value} value={value}>{value}</option>
            ))}
            <option key="all" value="all">show all</option>
          </select>
        </div>
        <ul tabIndex={tabIndexStart+2} aria-label="list of cafe" className="location-list">
          { locations.filter((location)=>(location.show)).map((location) => (<li tabIndex={tabIndexStart+3} aria-label="press enter for more information about cafe" role="link" key={location.title} onClick={(e) => showPlaceInfo(e, location, tabIndexStart+3)}
          onKeyPress={(e) => showPlaceInfo(e, location, tabIndexStart+3)}
          >
            <h2>{location.title}</h2>
            <img src={location.img} alt={location.title}/>
            <p className="location-address">{location.address}</p>
            <div aria-label="rating from yelp" className="rating">
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

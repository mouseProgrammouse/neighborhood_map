import React from 'react'
import PropTypes from 'prop-types'

const PlaceInfo = (props) => {
  const {place,
    resetSelectedPlace,
  } = props

 //at working hours array (from yelp) days are represent like 1,2,3...
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  let workingHours = []

  if (place && place.hasOwnProperty('hours'))
    workingHours = place.hours[0].open
  console.log(workingHours)

  //<div className='working-hours'>{place.hours[0].open}</div>

  return (<div className={(place)?("place-info-container"):("hide")}>
  <div className='close' onClick={()=>resetSelectedPlace()}><i className="fa fa-close"></i></div>
  {(place) && (
    <div className='place-info'>
      <h2>{place.title}</h2>
      <div className='address'><i className='fa fa-map-pin'></i> {place.address}</div>
      <div className='phone'><i className='fa fa-phone'></i> {(place.phone)?(place.phone):('phone number is unavailable')}</div>
      <div className='working-hours'>{(workingHours)? workingHours.map((data)=>(<div key={data.day} className="working">
        <span className='day'>{days[data.day]} </span>
        <span className='time'>{data.start.slice(0,2)} : {data.start.slice(2,4)} -
        {data.end.slice(0,2)} : {data.end.slice(2,4)}</span>
      </div>))
      :('Information about working hours are unavailable')}</div>
      <div className="yelp">all information provides by <i className="fa fa-yelp"></i></div>
    </div>
  )}
  </div>)
}

PlaceInfo.propTypes = {
  place: PropTypes.object
}

export default PlaceInfo

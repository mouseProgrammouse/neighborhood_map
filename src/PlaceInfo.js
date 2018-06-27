import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PlaceInfo extends Component {

  componentDidUpdate = () => {
    const {
      modalOn
    }
    = this.props

    if (modalOn === true){
      //console.log('modalOn')
      this.refs.modal.focus()
    }
  }

  //handle Focus
  handleBlur = (e) => {
      const previousElement = e.target
      //rich the end of modal window
      if (previousElement === this.refs.end)
         this.refs.start.focus()
  }

  render () {
    const {place,
      resetSelectedPlace,
      tabIndexStart,
      exitModal
    } = this.props

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

    return (<div ref="modal" id="modal" tabIndex={tabIndexStart} role="dialog" aria-label="Information about cafe" className={(place)?("place-info-container"):("hide")} onBlur={(e)=>{this.handleBlur(e)}}
    onKeyUp={(e)=>{exitModal(e)}}>
    <div ref="start" tabIndex={tabIndexStart} role="button" aria-label="close" className='close' onClick={(e)=>resetSelectedPlace(e)}
    onKeyPress={(e)=>resetSelectedPlace(e)}
    onKeyUp={(e)=>resetSelectedPlace(e)}
    ><i className="fa fa-close"></i></div>
    {(place) && (
      <div className='place-info'>
        <h2 tabIndex={tabIndexStart}>{place.title}</h2>
        <div tabIndex={tabIndexStart} aria-label="address" className='address'><i className='fa fa-map-pin'></i> {place.address}</div>
        <div tabIndex={tabIndexStart} aria-label="phone" className='phone'><i className='fa fa-phone'></i> {(place.phone)?(place.phone):('phone number is unavailable')}</div>
        <div tabIndex={tabIndexStart} aria-label="working hours" className='working-hours'>{(workingHours)? workingHours.map((data)=>(<div key={data.day} className="working">
          <span className='day'>{days[data.day]} </span>
          <span className='time'>{data.start.slice(0,2)} : {data.start.slice(2,4)} -
          {data.end.slice(0,2)} : {data.end.slice(2,4)}</span>
        </div>))
        :('Information about working hours are unavailable')}</div>
      </div>
    )}
    <p ref="end" tabIndex={tabIndexStart} className="yelp">all information provides by <i className="fa fa-yelp"></i></p>
    </div>)
  }
}

PlaceInfo.propTypes = {
  place: PropTypes.object,
  resetSelectedPlace: PropTypes.func.isRequired,
  modalOn: PropTypes.bool.isRequired,
  exitModal: PropTypes.func.isRequired,
  tabIndexStart: PropTypes.number.isRequired
}

export default PlaceInfo

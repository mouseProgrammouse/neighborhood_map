//information about backend server
const backendServer = {
    host:'127.0.0.1',
    port:'5959'
  }

//get main inforamations about places
//return promise
export const getLocationsInfo = () => {
  return fetch('http://'+backendServer.host+':'+backendServer.port+'/get_locations')
}

//get information about plases from yelp
//ex: YELP_id, address, img, phone and more
export const getPlacesInfo = (place) => {
  return fetch('http://'+backendServer.host+':'+backendServer.port+'/search?term='+place.title+'&loc=Dublin,Ireland&lat='+place.location.lat+'&lng='+place.location.lng+'&radius=300')
}

//get information about plases from yelp
//ex: rating and hours of working
export const getWorkingInfoByYelpID = (YelpID) => {
  return fetch('http://'+backendServer.host+':'+backendServer.port+'/get_details?id='+YelpID)
}

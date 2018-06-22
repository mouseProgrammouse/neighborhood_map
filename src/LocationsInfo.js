/**
* File provided information about my favorite coffee places in Dublin🍀
*/

const locations = [{
      title: 'Five Points',
      location: {
        lat : 53.3199513,
        lng : -6.2790107
      }
    },{
      title: 'Two Fifty Square',
      location: {
        lat : 53.325263,
        lng : -6.266136
      }
    },{
      title: 'Nick\'s coffee',
      location: {
        lat : 53.3260303,
        lng : -6.255507499999999
      }
    }, {
      title: 'The Art of Coffee Rathmines',
      location: {
        lat : 53.3235756,
        lng : -6.2650488
      }
    }, {
      title: 'Grove Road',
      location: {
        lat : 53.329884,
        lng : -6.264442
      }
    }];


//get inforamtions about places
export const getLocationsInfo = () => {
  return locations;
}

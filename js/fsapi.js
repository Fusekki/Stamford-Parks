  var fsConnect = function (nameLocation) {
  var httpMethod = 'GET',
      fsurl = 'https://api.foursquare.com/v2/venues/search',
      clientId = 'ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA',
      clientSecret = 'S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM',
      near = 'Stamford, CT',
      latLon = '41.07,73.54';


  var settings = {
    type: httpMethod,
    url : 'https://api.foursquare.com/v2/venues/search' +
        '?client_id=' + clientId +
        '&client_secret=' + clientSecret +
        '&v=20130815' +
        '&near=' + near +
        '&query=' + nameLocation,
    success: function(results) {
        console.log("SUCCESS! %o", results);
     },
    error: function(results) {
        console.log("ERROR! %o", results);
    }
  }
  console.log(settings);
  $.ajax(settings);
};

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
        console.log("FS SUCCESS! %o", results);
        var resultsTotal = results.response.venues.length;
        var results = results.response.venues;
        console.log(results);
        console.log(resultsTotal + ' results found in FS. Analyzing...');
        var filteredResults = 0;
        var city = near.slice(0, -4);
        console.log(city);
        $.each(results, function(index, element) {
          if ((element.name === nameLocation) && (element.location.city === city)) {
            console.log('element added to Foursquare.');
            filteredResults ++;
            fsDetails(element.id);
          } else {
            console.log('Rejected from FS: ' + element.name + ' in ' + element.location.city);
          }

      });
        console.log(filteredResults + ' results from FS.');

        if (filteredResults === 0) {
          console.log('Nothing found from FourSquare.');
          $('#fsNone').show();
         // parseResults(yelpObject, null);
      }
     },
    error: function(results) {
        console.log("ERROR! %o", results);
    }
  }
  console.log(settings);
  $.ajax(settings);
};

var fsDetails = function (fsID) {
  var httpMethod = 'GET',
      fsurl = 'https://api.foursquare.com/v2/venues/' + fsID,
      clientId = 'ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA',
      clientSecret = 'S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM',
      near = 'Stamford, CT';
      // latLon = '41.07,73.54';


  var settings = {
    type: httpMethod,
    url : fsurl +
        '?client_id=' + clientId +
        '&client_secret=' + clientSecret +
        '&v=20130815' +
        '&near=' + near,
    success: function(results) {
        console.log("FS Details SUCCESS! %o", results);
        var results = results.response.venue;
        var city = near.slice(0, -4);
        console.log(city);
        console.log('Venue added to Foursquare.');
        fsParseResults(results);

     },
    error: function(results) {
        console.log("ERROR! %o", results);
    }
  }
  console.log(settings);
  $.ajax(settings);
};

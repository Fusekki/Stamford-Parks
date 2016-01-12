var instaConnect = function (nameLocation) {
  var httpMethod = 'GET',
      url = 'https://api.instagram.com/oauth/authorize/?client_id=',
      url_end ='&redirect_uri=REDIRECT-URI&response_type=token',
  //    urlPrefix = 'https://api.foursquare.com/v2/venues/search',
  //    urlSuffix = '/media/recent?client_id=',
      client_id = 'd8445b612ab34329ae3825262d15978e',
      client_secret = '499e8ecf05e445bab5152af311b30de2',
      dataType = 'jsonp',
      cache = false;
  var settings = {
    type: httpMethod,
    url : url + client_id + url_end,
    success: function(results) {
        console.log("SUCCESS! %o", results);
        var resultsTotal = results.response.venues.length;
        var results = results.response.venues;
        console.log(results);
        console.log(resultsTotal + ' results found. Analyzing...');
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
     },
    error: function(results) {
        console.log("ERROR! %o", results);
    }
  }
  console.log(settings);
  $.ajax(settings);
};


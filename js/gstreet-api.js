var streetConnect = function (lat, lng) {
  var url_prefix = 'https://maps.googleapis.com/maps/api/js?key=',
      url_suffix ='&signed_in=true',
  //    urlPrefix = 'https://api.foursquare.com/v2/venues/search',
  //    urlSuffix = '/media/recent?client_id=',
      webKey = 'AIzaSyB5N3qC1nhOOTEF82SFwKGfcN8wAST8Eec',
      dataType = 'jsonp';
  var settings = {
     cache: true,
     jsonpCallback: 'cb',
     dataType: 'jsonp',
     url : url_prefix + webKey + url_suffix,
     success: function(results) {
        console.log("SUCCESS! %o", results);
      //   var resultsTotal = results.response.venues.length;
      //   var results = results.response.venues;
      //   console.log(results);
      //   console.log(resultsTotal + ' results found. Analyzing...');
      //   var filteredResults = 0;
      //   var city = near.slice(0, -4);
      //   console.log(city);
      //   $.each(results, function(index, element) {
      //     if ((element.name === nameLocation) && (element.location.city === city)) {
      //       console.log('element added to Foursquare.');
      //       filteredResults ++;
      //       fsDetails(element.id);
      //     } else {
      //       console.log('Rejected from FS: ' + element.name + ' in ' + element.location.city);
      //     }

      // });
     },
    error: function(results) {
        console.log("ERROR! %o", results);
    }
  }
  console.log(settings);
  $.ajax(settings);


};


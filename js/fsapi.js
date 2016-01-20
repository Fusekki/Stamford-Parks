var fsStart = function() {
      console.log('FS Start.');
      // Add code here to add progress bar in CSS.
  };

var fsComplete = function() {
      console.log('Foursquare complete.');
      // Add code here to end progress bar in CSS.
};




var fsConnect = function(nameLocation) {
      console.log(self);
    var httpMethod = 'GET',
        url = ['https://api.foursquare.com/v2/venues/search?client_id=',
               '&client_secret=',
               '&v=20130815&near=',
               '&query='],
        clientId = 'ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA',
        clientSecret = 'S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM',
        near = 'Stamford, CT',
        latLon = '41.07,73.54';

    var urlParams = url[0] + clientId +
                    url[1] + clientSecret +
                    url[2] + near +
                    url[3] + nameLocation;

    var settings = {
        url: urlParams,
        type: httpMethod,
        cache: true,
        // jsonpCallback: 'localJsonpCallback',
        dataType: 'jsonp',
        complete: fsComplete,
        beforeSend: fsStart,
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
                    filteredResults++;
                    fsDetails(element.id);
                } else {
                    console.log('Rejected from FS: ' + element.name + ' in ' + element.location.city);
                }

            });
            console.log(filteredResults + ' results from FS.');

            if (filteredResults === 0) {
                console.log('Nothing found from FourSquare.');
                $('#four-square').hide();
                $('#galleryTab').hide();
                $('#fs-noresult').show();
                $('#gallery-pill').hide();
            }
        },
        error: function(results) {
            console.log("ERROR! %o", results);
        }
    }
    console.log(settings);
    $.ajax(settings);
};

var fsDetails = function(fsID) {
    var httpMethod = 'GET',
        url = 'https://api.foursquare.com/v2/venues/' + fsID,
        clientId = 'ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA',
        clientSecret = 'S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM',
        near = 'Stamford, CT';

    var settings = {
        type: httpMethod,
        url: url +
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
            console.log(self);
            self.ViewModel.fsParseResults(results);

        },
        error: function(results) {
            console.log("ERROR! %o", results);
        }
    }
    console.log(settings);
    $.ajax(settings);
};
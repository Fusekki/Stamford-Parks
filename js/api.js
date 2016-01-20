console.log(self);

var nonce_generate = function() {
      return (Math.floor(Math.random() * 1e12).toString());
  };

var localJsonpCallback = function(data) {
      console.log(JSON.stringify(data));
  };

var yelpStart = function() {
      console.log('Yelp Start.');
      // Add code here to add progress bar in CSS.
  };

var yelpComplete = function() {
      console.log('Yelp complete.');
      // Add code here to end progress bar in CSS.
  };



  var YelpConnect = function(nameLocation) {
      var httpMethod = 'GET',
          consumerKey = 'YsPDWGOo52SXK3U-FoNm6g',
          consumerKeySecret = 'd4oiThmVyRCZrZR1o8phpOV4FjI',
          url = 'https://api.yelp.com/v2/search?',
          token = 'MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2',
          signatureMethod = 'HMAC-SHA1',
          version = '1.0',
          local = 'Stamford, CT',
          tokenSecret = 'IKtJiQ-P4Gk_arqDvP3buDE-Wio'

      var parameters = {
          term: nameLocation,
          location: local,
          oauth_consumer_key: consumerKey,
          oauth_token: token,
          oauth_nonce: nonce_generate(),
          oauth_timestamp: Math.floor(Date.now() / 1000),
          oauth_signature_method: 'HMAC-SHA1',
          callback: 'localJsonpCallback'
      };

      var encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerKeySecret, tokenSecret);
      parameters.oauth_signature = encodedSignature;

      var settings = {
          type: httpMethod,
          url: url,
          data: parameters,
          cache: true,
       //   jsonpCallback: 'localJsonpCallback',  // Not sure if need this since the callback in parameters is necessary.
          dataType: 'jsonp',
          complete: yelpComplete,
          beforeSend: yelpStart,
          success: function(results) {
              console.log("YELP SUCCESS! %o", results);
              console.log(results.total + ' results found for Yelp. Analyzing...');
              var resultsTotal = results.total;
              var filteredResults = 0;
              var city = local.slice(0, -4);
              // console.log(city);
              $.each(results.businesses, function(index, element) {
                  if ((element.name === nameLocation) && (element.location.city === city)) {
                      filteredResults++;
                      console.log(self);
                      self.ViewModel.parseResults(element);
                  } else {
                      console.log('Rejected: ' + element.name + ' in ' + element.location.city);
                  }

              });

              if (filteredResults === 0) {
                  console.log('Nothing found from Yelp.');
                  $('#yelp-noresult').show();
                  $('#yelp').hide();
                  // parseResults(yelpObject, null);
              }

          },
          error: function(results) {
              console.log("error %o", results);
          }
      }

      $.ajax(settings);
  };
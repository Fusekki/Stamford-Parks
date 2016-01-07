  function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    };

  var YelpConnect = function (nameLocation) {
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
    callback: 'cb'
  };

  console.log(parameters);

//var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, consumerKey, consumerKeySecret, tokenSecret);
  var encodedSignature = oauthSignature.generate(httpMethod, url, parameters, consumerKeySecret, tokenSecret);
  parameters.oauth_signature = encodedSignature;

  var settings =  {
     url: url,
     data: parameters,
     cache: true,
     jsonpCallback: 'cb',
     dataType: 'jsonp',
     success: function(results) {
      console.log("SUCCESS! %o", results);
      console.log(results.total + ' results found. Analyzing...');
      var resultsTotal = results.total;
      var filteredResults = 0;
      var city = local.slice(0, -4);
      console.log(city);
      $.each(results.businesses, function(index, element) {
        if ((element.name === nameLocation) && (element.location.city === city)) {
          filteredResults ++;
          parseResults(yelpObject, element);
        } else {
          console.log('Rejected: ' + element.name + ' in ' + element.location.city);
        }

      });

      if (filteredResults === 0) {
        console.log('Nothing found from Yelp.');
        parseResults(yelpObject, null);
      }

     },
     error: function(results) {
           console.log("error %o", results);
     }
    }

  console.log(settings);
  $.ajax(settings);
};



/* var auth = {
    consumerKey: "YsPDWGOo52SXK3U-FoNm6g",
    consumerSecret: "4oiThmVyRCZrZR1o8phpOV4FjI",
    accessToken: "MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2",
    accessTokenSecret: "IKtJiQ-P4Gk_arqDvP3buDE-Wio",
  };

  var terms = 'parks';
  var near = 'Stamford';

  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };

  var parameters = [];
  parameters.push(['term', terms]);
  parameters.push(['location', near]);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);

  var message = {
    'action': 'http://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
  };

  oauth.setTimestampAndNonce(message);

  oauth.SignatureMethod.sign(message, accessor);

  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)

  var url = OAuth.addToURL(message.action,parameterMap);
  var response = UrlFetchApp.fetch(url).getContentText();
  var responseObject = Utilities.jsonParse(response);*/
  //have my JSON object, do whatever we want here, like add to spreadsheets
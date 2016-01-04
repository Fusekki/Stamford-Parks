var generateContentString = function (nameLocation) {
  var nameLocation = nameLocation;
  var location = "Stamford";
  var consumerKey = "YsPDWGOo52SXK3U-FoNm6g";
  var consumerKeySecret = "4oiThmVyRCZrZR1o8phpOV4FjI"
  var token = "MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2"
  var tokenSecret = "IKtJiQ-P4Gk_arqDvP3buDE-Wio";

  var yelp_url = 'https://api.yelp.com/v2/search?';

  var parameters = {
    term: nameLocation,
    location: location,
    oauth_consumer_key: consumerKey,
    oauth_token: token ,
    oauth_nonce: nonce_generate(),
    oauth_timestamp: Math.floor(Date.now() / 1000),
    oauth_signature_method: 'HMAC-SHA1',
    callback: 'cb'
  };

  function nonce_generate() {
        return (Math.floor(Math.random() * 1e12).toString());
    }


  var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, consumerKey, consumerKeySecret, tokenSecret);
    parameters.outh_signature = encodedSignature;
  var settings =  {
     url: yelp_url,
     data: parameters,
     cache: true,
     dataType: 'jsonp',
     success: function(results) {
               console.log("SUCCESS! %o", results);
     },
     error: function() {
           console.log("error");
      }
    }
  $.ajax(settings);
}



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
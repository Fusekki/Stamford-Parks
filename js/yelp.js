var auth = {
    consumerKey : "YsPDWGOo52SXK3U-FoNm6g",
    consumerSecret : "d4oiThmVyRCZrZR1o8phpOV4FjI",
    accessToken : "MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2",
    accessTokenSecret : "IKtJiQ-P4Gk_arqDvP3buDE-Wio",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

console.log(OAuth);

var terms = 'food';
var near = 'San+Francisco';

var accessor = {
    consumerSecret : auth.consumerSecret,
    tokenSecret : auth.accessTokenSecret
};

parameters = [];
parameters.push(['term', terms]);
parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var message = {
    'action' : 'http://api.yelp.com/v2/search?',
    'method' : 'GET',
    'parameters' : parameters
};

OAuth.setTimestampAndNonce(message);
console.log(message);
console.log(accessor);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
console.log(parameterMap);

$.ajax({
    'url' : message.action,
    'data' : parameterMap,
    'cache' : true,
    'dataType' : 'jsonp',
    'jsonpCallback' : 'cb',
    'success' : function(data, textStats, XMLHttpRequest) {
        console.log(data);
            if(data) {
                var hits = data.businesses,
                    item_str = '<li>%name%</li>';
                hits.forEach(function(result) {
                    console.log('success');
                 //$('#results').append(item_str.replace('%name%', result.name))
                });
            }
    },
    'error' : function(error) {
        console.log('error with request');

       //      $('#error').css('opacity', '1');
    }
});

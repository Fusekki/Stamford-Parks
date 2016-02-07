// Google Maps object
var Map = {
    initMap: function() {
        var stamford = new google.maps.LatLng(41.074448, -73.541316);
        try {
            // Create a map object and specify the DOM element dor display.
            this.instance = new google.maps.Map(document.getElementById('map'), {
                center: stamford,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scroolwheel: true,
                zoom: 12,
                styles: styleArray
            });
        } catch (err) {
            Helpers.handleError("Google maps is not loading. This may be due to not having an internet connection.");
        }
    },
    showStreet: function(lat, lng) {
        "use strict";
        var loc = {
            lat: lat,
            lng: lng
        };
        var panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'), {
            position: loc,
            prob: {
                heading: 24,
                pitch: 18
            }
        });
        this.instance.setStreetView(panorama);
        google.maps.event.trigger(this.instance, 'resize', function() {});
    },
    removeStreet: function() {
        "use strict";
        var panorama = this.instance.getStreetView();
        if (panorama) {
            panorama.setVisible(false);
        }


    },

    toggleBounce: function(marker) {
        "use strict";
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 3000);
        }
    }
};
// Helper Objects (for error handling).
var Helpers = {
    handleError: function(msg) {
        if (msg === 'map') {
            msg = "Google Maps could not load. Please check your internet connnection.";
        }

        return alert(msg);
    },
    logError: function(msg) {
        return console.log(msg);
    }
};
// Mark object for creating array of markers.
function mark(place, map) {
    "use strict";
    var myMap = map;
    var pos = new google.maps.LatLng(place.lat(), place.lng());
    var marker = new google.maps.Marker({
        title: place.name(),
        position: pos,
        number: place.number(),
        label: place.marker(),
        animation: google.maps.Animation.DROP
    });
    marker.setMap(myMap);
}
// Place object for model information (totally seperate from AJAX calls.)

function Place(data, num) {
    "use strict";
    this.name = data.name;
    this.lat = data.address.lat;
    this.lng = data.address.lng;
    this.number = num;
    this.description = data.description;
    this._destroy = data._destroy;
    this.marker = null;

}

function Result(data) {
    "use strict";
    this.name = data.result;
    this.url = data.url;
}

// Viewmodel with Knockout.
var ViewModel = function() {
    "use strict";
    var self = this;

    // Knockout declarations
    self.yelpResults = ko.observableArray([]);
    self.fsResults = ko.observableArray([]);

    self.places = ko.observableArray([]);
    self.query = ko.observable('');

    self.currentPlace = ko.observable({
        name: 'none'
    });
    self.currentName = ko.observable();
    self.currentDesc = ko.observable();

    self.showModel = ko.observable(false);

    self.showYelpNoResult = ko.observable(false);
    self.showYelp = ko.observable(false);
    self.showFSnoresult = ko.observable(false);
    self.showFS = ko.observable(false);

    // This Knockout computed variable handles the visibility of the places.
    self.resultsFound = ko.pureComputed(function() {
        var i = 0;
        self.places().forEach(function(placeItem) {
            if (placeItem._destroy() === false) {
                i++;
            }
        });
        return i;
    });

    self.fsTipsStyle = ko.pureComputed(function() {
        return self.fsTips().length > 0 ? "fs-element-show" : "fs-element-hide";
    });
    self.fsCrossStyle = ko.pureComputed(function() {
        return self.fsCrossStreet() === "" ? "fs-element-show" : "fs-element-hide";
    });

    // <!-- End Knockout Declarations -->


    this.currentMarker = function() {
        return self.places()[self.currentPlace()];
    };
    this.search = function(value) {

        self.places().forEach(function(placeItem) {

            if (placeItem.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {

                placeItem._destroy(false);
                placeItem.marker.setVisible(true);
            } else {

                placeItem._destroy(true);
                placeItem.marker.setVisible(false);
            }
        });


    };
    this.placeMarker = function(place, num) {

        var pos = new google.maps.LatLng(place.address.lat, place.address.lng);

        var marker = new google.maps.Marker({
            title: place.name,
            position: pos,
            number: num,
            animation: null,
        });
        self.places()[num].marker = marker;
        place.marker = marker;

        marker.addListener('click', function() {

            self.selectPlace(place);
        });

        marker.setMap(Map.instance);

    };
    this.populateLocations = function() {

        var i = 0;
        places.forEach(function(placeItem) {
            self.places().push(new Place(placeItem, i));
            self.placeMarker(placeItem, i);
            i++;
        });

    };
    this.selectPlace = function(place) {


        if (self.currentPlace().name === place.name) {

            Map.toggleBounce(place.marker);

        } else if (self.currentPlace().name !== 'none') {

            self.currentPlace().marker.setIcon('');
            // Check for icon animation for previous entry.  If it is active, set it to null.
            self.currentPlace().marker.setAnimation(null);
        }

        self.currentPlace(self.places()[place.marker.number]);
        // Change the selected Marker icon to green.

        self.currentPlace().marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

        var latLng = new google.maps.LatLng(self.currentPlace().lat, self.currentPlace().lng);
        Map.instance.panTo(latLng);

        Map.toggleBounce(self.currentPlace().marker);

        self.currentDesc(place.description);
        self.currentName(place.name);

        self.initAjax();
    };
    this.initAjax = function() {


        self.clearObservables();

        self.fillcontentWindow();
        self.showModel(true);

        YelpConnect();
        fsConnect();

    };
    this.clearObservables = function() {
        // This function clears the existing Knockout observable array variables before the Ajax call.
        self.yelpResults.removeAll();
        self.fsResults.removeAll();



    };
    this.fillcontentWindow = function() {
        var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<b>' + self.currentPlace().name + '</b> ' + '</div>';
        self.infoWindow.setOptions({
            content: contentString
        });
        self.infoWindow.open(Map.instance, self.currentPlace().marker);
    };

    this.openSite = function(url, event) {

        if (event.type === "click") {
            window.open(url, '_blank');
        }


    };
    var nonce_generate = function() {
        return (Math.floor(Math.random() * 1e12).toString());
    };
    var localJsonpCallback = function(data) {};
    var callStart = function(apiName) {};
    var callComplete = function(apiName) {};
    var YelpConnect = function() {
        var httpMethod = 'GET',
            consumerKey = 'YsPDWGOo52SXK3U-FoNm6g',
            consumerKeySecret = 'd4oiThmVyRCZrZR1o8phpOV4FjI',
            url = 'https://api.yelp.com/v2/search?',
            token = 'MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2',
            local = 'Stamford, CT',
            tokenSecret = 'IKtJiQ-P4Gk_arqDvP3buDE-Wio';
        var parameters = {
            term: self.currentPlace().name,
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
            dataType: 'jsonp',
            timeout: 5000,
            complete: callComplete('Yelp'),
            beforeSend: callStart('Yelp'),
            success: function(results) {

                if (results.businesses.length > 0) {

                    self.showYelp(true);
                    self.showYelpNoResult(false);
                } else {

                    self.showYelp(false);
                    self.showYelpNoResult(true);

                }


                for (var i = 0; i < results.businesses.length; i++) {

                    self.yelpResults.push({
                        name: results.businesses[i].name,
                        url: results.businesses[i].url
                    });

                }


            },
            error: function(results) {
                Helpers.handleError('Error encountered in communicating with Yelp.  Please just your internet connection and firewall settings.');
            }
        };
        $.ajax(settings);
    };
    var fsConnect = function() {
        var httpMethod = 'GET',
            url = ['https://api.foursquare.com/v2/venues/search?client_id=', '&client_secret=', '&v=20130815&near=', '&query='],
            clientId = 'ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA',
            clientSecret = 'S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM',
            near = 'Stamford, CT';
        var urlParams = url[0] + clientId + url[1] + clientSecret + url[2] + near + url[3] + self.currentPlace().name;
        var settings = {
            url: urlParams,
            type: httpMethod,
            cache: true,
            dataType: 'json',
            complete: callComplete('fs'),
            beforeSend: callStart('fs'),
            success: function(results) {

                results = results.response;
                if (results.venues.length > 0) {

                    self.showFS(true);
                    self.showFSnoresult(false);
                    for (var i = 0; i < results.venues.length; i++) {
                        fsDetails(results.venues[i].id);
                    }
                } else {

                    self.showFS(false);
                    self.showFSnoresult(true);
                }
            },
            error: function(results) {

                Helpers.handleError('Error encountered in communicating with Foursquare.  Please just your internet connection and firewall settings.');
            }
        };
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
            url: url + '?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20130815' + '&near=' + near,
            success: function(results) {


                self.fsResults.push({
                    name: results.response.venue.name,
                    url: results.response.venue.canonicalUrl
                });


            },
            error: function(results) {

                Helpers.handleError('Error encountered in communicating with Foursquare.  Please just your internet connection and firewall settings.');
            }
        };
        $.ajax(settings);
    };


    // Statements
    this.query.subscribe(self.search);
    // This event triggers the street view to display in the modal.  This code acts to refresh the streetview.  Without it, the StreetView doesn't display correctly.
    $('#modal-place').on('shown.bs.modal', function() {

        Map.showStreet(self.currentPlace().lat, self.currentPlace().lng);

    });

    $('#modal-place').on('hidden.bs.modal', function() {

        Map.removeStreet();

    });
    // Initialize the map.
    Map.initMap(self);
    //Populate Map with Markers on initial load.
    self.populateLocations();
    self.infoWindow = new google.maps.InfoWindow();
    self.helpers = Helpers;
    // End Statements
};

ko.applyBindings(new ViewModel());
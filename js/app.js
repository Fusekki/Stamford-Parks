function hide() {
    $('#nav-mobile').toggleClass('open');
    $('#nav-mobile span').toggleClass('changecolor');
    $('.navigation').toggleClass('fadein');
    $('.site-wrap').toggleClass('fadeout');
}

function minimize() {
    $('.left-main').toggleClass('shrink');
}

$('#nav-mobile').click(function() {
    hide();

});
$('.nav-item').click(function() {
    hide();
});

$('.minimize').click(function() {
    minimize();
});

function handleChange(cb) {
    if (cb.checked == true) {
        // Drawer Open
        $('.container-fluid').css('overflowY', 'hidden');
    } else {
        // Drawer Closed
        $('.container-fluid').css('overflowY', 'auto');
    }
}

// Map animation function
function markerAnimation(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 3000);
}
// Google Maps object
function initMap() {
    // var stamford = new google.maps.LatLng(41.074448, -73.541316),
    var stamford = new google.maps.LatLng(41.074448, -73.541316),
        map = new google.maps.Map(document.getElementById('map'), {
            center: stamford,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: true,
            mapTypeControl: false,
            zoomControl: true,
            styles: styleArray
        });

    // This ensures the map boundaries are set dynamically so that all markers appear on map despite display
    var bounds = new google.maps.LatLngBounds();
    var prev_marker = false;
    var prev_infowindow = false;
    infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var pos = new google.maps.LatLng(place.address.lat, place.address.lng);
        var marker = new google.maps.Marker({
            title: places[i].name,
            position: pos,
            number: i,
            animation: null,
            draggable: false
        });
        bounds.extend(pos);

        // This adds the click event listener to the marker object
        google.maps.event.addListener(marker, 'click', function(markerCopy) {

            return function() {
                // Attach infoWindow
                infoWindow = new google.maps.InfoWindow();
                var contentString = '<div id="content">' + '<div id="siteNotice">' + '</div>' + '<b>' + this.title + '</b> ' + '</div>' +
                    '<span id="info-label">More Info<button class="btn btn-warning" data-target="#modal-place" data-toggle="modal" id="openBtn" type="button" aria-label="Left Align">' +
                    '<span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></button></span></span>';
                infoWindow.setOptions({
                    content: contentString
                });
                infoWindow.setContent(contentString);

                infoWindow.open(map, this);

                cur_infowindow = {
                    name: this.title,
                    infowindow: infoWindow,
                    marker: this
                };

                // Change the selected Marker icon to green.
                this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                map.panTo(this.position);

                if (this.getAnimation() !== null) {
                    this.setAnimation(null);
                } else {
                    markerAnimation(this);
                }

                // Check to see if the prev_marker exists.
                if (prev_marker) {
                    // Check marker if is the previously selected one
                    if (prev_marker.title === place.name) {
                        // Toggle the animations
                        if (this.getAnimation() !== null) {
                            this.setAnimation(null);
                        } else {
                            markerAnimation(this);
                        }
                        // This is a different marker, therefore disable animation and change color on previous one.
                    } else {
                        prev_marker.setIcon('');
                        prev_infowindow.close();
                        // Check for icon animation for previous entry.  If it is active, set it to null.
                        prev_marker.setAnimation(null);
                        places[prev_marker.number].marker = prev_marker;
                    }

                    this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    map.panTo(this.position);
                } else {
                    markerAnimation(this);
                }
                prev_marker = this;
                prev_infowindow = infoWindow;
                selected = this.number;
                selectPlace(this.number);
            };

        }(marker));

        places[i].marker = marker;

        marker.setMap(map);
        map.fitBounds(bounds);
    }
}

function selectPlace(place) {

    // The skip variable is used because every selectPlace will be called twice.  It's triggered both by the click marker event and the drawer
    // click event.  This variable limits the call to once.
    if (!skip) {
        skip = true;
        // Perform action based on the caller (either the map or the drawer)
        if (typeof place === 'number') {
            // This is triggered from the marker.
            place = places[place];

        } else {
            // This is triggered from the drawer.
            var num = place.marker.number;
            // Trigger the click event for the marker
            google.maps.event.trigger(places[num].marker, 'click');
            // close the drawer
            hide();
        }

        if ($('.left-main').hasClass('shrink')) {
            minimize();
        }

        // Set the current Model information
        currentName(place.name);
        currentDesc(place.description);
        showModel(true);

        skip = false;


        // Reset the modal display
        showYelpLoading(true);
        showYelp(false);
        showYelpNoResult(false);
        showFSLoading(true);
        showFSnoresult(false);
        showFS(false);
    }
}

function nonce_generate() {
    return (Math.floor(Math.random() * 1e12).toString());
}

function localJsonpCallback(data) {}

function callStart(apiName) {}

function callComplete(apiName) {}

function getYelp(place) {
    var results = null;

    var httpMethod = 'GET',
        consumerKey = 'YsPDWGOo52SXK3U-FoNm6g',
        consumerKeySecret = 'd4oiThmVyRCZrZR1o8phpOV4FjI',
        url = 'https://api.yelp.com/v2/search?',
        token = 'MyX8vDPrsgUCTH3qWMK4M3zp8oLuBkE2',
        local = 'Stamford, CT',
        tokenSecret = 'IKtJiQ-P4Gk_arqDvP3buDE-Wio';

    var parameters = {
        term: place,
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
        beforeSend: callStart('Yelp')
    };

    $.getJSON(settings)
        .done(function(results) {
            if (results.businesses.length > 0) {
                showYelpLoading(false);
                showYelp(true);
                showYelpNoResult(false);
            } else {
                showYelpLoading(false);
                showYelp(false);
                showYelpNoResult(true);

            }
            // Clear out observable array before populating.
            yelpResults.removeAll();


            for (var i = 0; i < results.businesses.length; i++) {

                yelpResults.push({
                    name: results.businesses[i].name,
                    url: results.businesses[i].url
                });
            }
        })
        .fail(function(results) {
            Helpers.handleError('Error encountered in communicating with the Yelp API.  Please try again in a few minutes.');
            showYelpLoading(false);
            showYelp(false);
            showYelpNoResult(true);
        });

}


function getFS(place) {
    var results = null;
    var httpMethod = 'GET',
        url = ['https://api.foursquare.com/v2/venues/search?client_id=', '&client_secret=', '&v=20130815&near=', '&query='],
        clientId = 'ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA',
        clientSecret = 'S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM',
        near = 'Stamford, CT';
    var urlParams = url[0] + clientId + url[1] + clientSecret + url[2] + near + url[3] + place;
    var settings = {
        url: urlParams,
        type: httpMethod,
        cache: true,
        dataType: 'json',
        complete: callComplete('fs'),
        beforeSend: callStart('fs')
    };

    $.getJSON(settings)
        .done(function(results) {
            results = results.response;
            if (results.venues.length > 0) {
                // Clear out observable array
                fsResults.removeAll();
                showFSLoading(false);
                showFS(true);
                showFSnoresult(false);
                for (var i = 0; i < results.venues.length; i++) {
                    fsDetails(results.venues[i].id);
                }
            } else {
                showFSLoading(false);
                showFS(false);
                showFSnoresult(true);
            }
        })
        .fail(function(results) {
            Helpers.handleError('Error encountered in communicating with the Foursqure API.  Please try again in a few minutes.');
            showFSLoading(false);
            showFS(false);
            showFSnoresult(true);
        });


}

function fsDetails(fsID) {
    var httpMethod = 'GET',
        url = 'https://api.foursquare.com/v2/venues/' + fsID,
        clientId = 'ZUPJOALYACXTHW3ZLE2I0RF2IWBOLFQPORW5LBUFHL2KEFTA',
        clientSecret = 'S4M2PBBKJVQP3HM3SCKEZIIEJARLZ5ITP1KUKN4IXT03CXTM',
        near = 'Stamford, CT';
    var settings = {
        type: httpMethod,
        url: url + '?client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20130815' + '&near=' + near
    };

    $.getJSON(settings)
        .done(function(results) {
            self.fsResults.push({
                name: results.response.venue.name,
                url: results.response.venue.canonicalUrl
            });

        })
        .fail(function(results) {
            Helpers.handleError('Error encountered in communicating with Foursquare.  Please check your internet connection and firewall settings.  If this issue persists, there may be difficulty in communicating with Foursquare.');
        });
}

// Helper Objects (for error handling).
var Helpers = {
    handleError: function(msg) {
        if (msg === 'map') {
            return alert("There was an error loading the Google Maps API.  Please check your connection.");
        } else {
            return alert(msg);
        }
    },
    logError: function(msg) {
        return console.log(msg);
    }
};

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
    self.places = ko.observableArray(places);
    self.query = ko.observable('');

    // This Knockout computed variable handles the visibility of the places.
    self.resultsFound = ko.pureComputed(function() {
        var ttl = 0;

        for (var i = 0; i < self.places().length; i++) {
            if (places[i]._destroy() === false) {
                ttl++;
            }
        }
        return ttl;
    });

    self.placeNumber = ko.pureComputed(function() {
        return selected;
    });



    console.log(self.placeNumber());
    $('#firstHeading').text("THE PARKS MAP");
    console.log($('#firstHeading'));
    $('#modelDesc').text('The park maps displays all of the parks located in the Stamford, CT area.  Click the above menu icon to bring up a list of parks in the area.  After selecting one, feel free to click the yellow icon next to it in the infowindow to bring up additional information of it, such as a streetview and potential matches from Foursquare and Yelp.');

    self.helpers = Helpers;

    // <!-- End Knockout Declarations -->
    for (var i = 0; i < places.length; i++) {
        availableTags.push(places[i].name);
    }

    // $("#search-input").autocomplete({
    //     source: availableTags
    // });


    // $('#search-input').on('autocompleteselect', function(e, ui) {
    //     for (var i = 0; i < availableTags.length; i++) {
    //         if (ui.item.value.toLowerCase() === availableTags[i].toLowerCase()) {
    //             // Pass on the entire place object so that it launches the click event.
    //             selectPlace(self.places()[i]);
    //         }
    //     }
    // });


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
                if (cur_infowindow) {
                    if (placeItem.name === cur_infowindow.name) {
                        cur_infowindow.infowindow.close();
                        cur_infowindow.marker.setIcon('');
                        cur_infowindow = false;
                        showModel(false);
                    }
                }
            }
        });


    };

    this.openSite = function(url, event) {
        // Included this workaround as the AJAX observable array results launch the click event on push.
        if (event.type === "click") {
            window.open(url, '_blank');
        }
    };

    // Statements
    this.query.subscribe(self.search);
    console.log($('#pill-streetview'));



    // This event triggers the street view to display in the modal.  This code acts to refresh the streetview.  Without it, the StreetView doesn't display correctly.
    $('#modal-place').on('shown.bs.modal', function() {

        var place = self.places()[selected].marker;

        // Start the ajax calls
        getYelp(place.title);
        getFS(place.title);



        var lat = place.getPosition().lat();
        var lng = place.getPosition().lng();

        var loc = new google.maps.LatLng(lat, lng);
        var id = 'street-view';
        console.log($(id));
        console.log($('modal-map'));
        console.log($(id).is(':visible'));

        console.log($('#modal-map').is(':visible'));

        if ($('.modal-map').is(':visible')) {

            console.log('streetview not hidden');
        } else {
            id = 'pill-streetview';
            console.log('streetview hidden.');
        }
        console.log(id);

        console.log(document.getElementById('street-view'));

        var panorama = new google.maps.StreetViewPanorama(document.getElementById(id), {
            position: loc,
            panControl: true,
            prob: {
                heading: 24,
                pitch: 18
            }
        });

        // Check to see if streetview is appearing in the pills

        if ($('#sv-pill').is(':visible')) {
            console.log('mobile streetview is activated');


            // Since the tab is hidden by default, we need to trigger a resize event so it displays properly when the pill is selected
            $('a[data-toggle="pill"]').on('shown.bs.tab', function(e) {
                var target = $(e.target).attr("href") // activated tab
                if (target === '#pill-streetview') {
                    console.log('trigger map resize');
                    google.maps.event.trigger(panorama, "resize");

                }
            });

        } else {
            console.log('mobile streetview disabled.');
        }


    });


    // End Statements
};
ko.applyBindings(new ViewModel());
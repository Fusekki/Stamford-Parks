"use strict";

var Map = {

    initMap: function() {
        var stamford = new google.maps.LatLng(41.074448, -73.541316);

        try {
            // Create a map object and specify the DOM element dor display.
            this.instance = new google.maps.Map(document.getElementById('map'), {
                center: stamford,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scroolwheel: true,
                zoom: 15,
                styles: styleArray
            });

        } catch (err) {
            Helpers.handleError("Google maps is not loading. This may be due to not having an internet connection.");
        }


    },

    showStreet: function(lat, lng) {
        var loc = {
            lat: lat,
            lng: lng
        };
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('street-view'), {
                position: loc,
                prob: {
                    heading: 24,
                    pitch: 18
                }
            });

        this.instance.setStreetView(panorama);

        google.maps.event.trigger(this.instance, 'resize', function() {
            // your callback content
            console.log('resize1');
        });

    },

    toggleBounce: function(marker) {

        console.log(marker.title + ' has an animation of ' + marker.getAnimation());

            if (marker.getAnimation() !== null){
                console.log('not enabling animation because item is currently animated with animation = ' + marker.getAnimation());
                console.log('animation detected.  Disabling animation for ' + marker.title);
                marker.setAnimation(null);
                console.log('animation set to = ' + marker.getAnimation());

            }
             else {
                console.log('no animation detected.  Activating animation for ' + marker.title);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                console.log('animation set to = ' + marker.getAnimation());
            }
            console.log('marker = ' + marker.getAnimation());
            console.log('animation set to = ' + marker.getAnimation());
    }
};


var Helpers = {
    handleError: function(msg) {
        return alert(msg);
    },
    logError: function(msg) {
        return console.log(msg);
    }


};


function mark(place, map) {
    var myMap = map;
    var pos = new google.maps.LatLng(place.lat(), place.lng());
    var marker = new google.maps.Marker({
        title: place.name(),
        position: pos,
        number: place.number(),
        label: place.marker(),
        animation: google.maps.Animation.DROP
    });

    self.markers.push(marker);
    marker.setMap(myMap);
};


function Place(data, num) {
    this.name = data.name;
    this.lat = data.address.lat;
    this.lng = data.address.lng;
    this.number = num;
    this.description = data.description;

};

var ViewModel = function() {

    var self = this;

    self.isBorder = false;

    self.markers = [];

    // Knockout declarations
    self.yelpName = ko.observable();
    self.yelpPhone = ko.observable();
    self.yelpRatingUrl = ko.observable();
    self.yelpRatingImg = ko.observable();
    self.yelpReviews = ko.observable();
    self.yelpImg = ko.observable();
    self.yelpAddress = ko.observable();
    self.yelpZip = ko.observable();
    self.yelpDesc = ko.observable();
    self.yelpUrl = ko.observable();

    self.fsName = ko.observable();
    self.fsPhone = ko.observable();
    self.fsAddress = ko.observableArray([]);
    self.fsZip = ko.observable();
    self.fsCity = ko.observable();
    self.fsCrossStreet = ko.observable();
    self.fsImg = ko.observableArray([]);
    self.fsTips = ko.observableArray([]);
    self.fsRating = ko.observable();
    self.fsUrl = ko.observable();


    self.places = ko.observableArray([]);
    self.query = ko.observable('');

    self.menuVisible = ko.observable('true');

    self.currentPlace = ko.observable(-1); // contains index value that wires model elements to drawer list

    self.currentName = ko.observable();
    self.currentDesc = ko.observable();



    // This Knockout computer variable adjusts the number of columns to display based on the filtered list count.
    self.resultsFound = ko.pureComputed(function() {
        return self.places().length;
    });

    self.resultsStyle = ko.pureComputed(function() {
        return self.resultsFound() < 26 ? "drawer-item-single" : "drawer-item-double";
     });

    self.drawerStyle = ko.pureComputed(function() {
        return self.resultsFound() < 26 ? "drawer-list-single" : "drawer-list-double";
     });

    self.fsTipsStyle = ko.pureComputed(function() {
        console.log(self.fsTips() > 0);
        return self.fsTips() > 0 ? "fs-element-show" : "fs-element-hide";
     });

    self.fsCrossStyle = ko.pureComputed(function() {
        return self.fsCrossStreet() === ""  ? "fs-element-show" : "fs-element-hide";
     });



    // End Knockout Declarations
    // Credit to Jake Rocheleau @ http://blog.templatemonster.com/2014/06/23/responsive-sliding-drawer-menu-lightbox-effect/
  var menuwidth  = 30; // vw value for sliding menu width
  var menuspeed  = 400; // milliseconds for sliding menu animation time
  var btnpadding = 2;

/*  var $bdy       = $('body');
  var $container = $('#pgcontainer');
  var $burger    = $('#hamburgermenu');*/
  var negwidth   = "-"+menuwidth+"vw";
  var poswidth   = menuwidth+"vw";
  var pospadding = 2 * menuwidth + btnpadding + "vw";
  var negpadding = btnpadding + "vw";
//First we create a number of variables which are used throughout the script. I previously mentioned the menuwidth being set dynamically. Also the animation speed is adjustable by updating the menuspeed variable in milliseconds.

//The last few variables contain jQuery selector objects to save memory, along with calculations for how many pixels to hide & show the menu.

  $('.menubtn').on('click',function(e){
    if($('body').hasClass('openmenu')) {
      jsAnimateMenu('close');
    } else {
      jsAnimateMenu('open');
    }
  });

  $('.overlay').on('click', function(e){
    if($('body').hasClass('openmenu')) {
      jsAnimateMenu('close');
    }
  });

  $('a[href$="#"]').on('click', function(e){
    e.preventDefault();
  });

  function jsAnimateMenu(tog) {
    if(tog == 'open') {
      $('body').addClass('openmenu');

      //$container.animate({marginRight: negwidth, marginLeft: poswidth}, menuspeed);
      $('.menubtn').animate({'padding-left': pospadding}, menuspeed);
      $('#hamburgermenu').animate({width: poswidth}, menuspeed);
      $('.overlay').animate({left: poswidth}, menuspeed);
    }

    if(tog == 'close') {
      $('body').removeClass('openmenu');
      $('.menubtn').animate({'padding-left': negpadding}, menuspeed);

     // $container.animate({marginRight: "0", marginLeft: "0"}, menuspeed);
      $('#hamburgermenu').animate({width: "0"}, menuspeed);
      $('.overlay').animate({left: "0"}, menuspeed);
    }
  };






    self.infoWindow = new google.maps.InfoWindow();
    self.helpers = Helpers;

    this.currentMarker = function() {
       // console.log(self.currentPlace())
             return self.markers[self.currentPlace()];


    },

    // Function Declarations

    this.search = function(value) {
        // remove all the current places, which removes them from the view
        self.places.removeAll();

        for (var i in places) {
            if (places[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.places.push(places[i]);
            }
        }

        //console.log(self.markers);
        for (var i in self.markers) {
            //console.log(value);
            //console.log(self.markers[i].title.toLowerCase().indexOf(value.toLowerCase()));
            if (self.markers[i].title.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                self.markers[i].setVisible(false);
            } else {
                self.markers[i].setVisible(true);
            }
        }

        if (value.length === 0) {
            self.populateLocations();
            console.log('empty value');
        }

    };


    this.placeMarker = function(place, num) {
        var pos = new google.maps.LatLng(place.lat, place.lng);

        var marker = new google.maps.Marker({
            title: place.name,
            position: pos,
            number: num,
            animation: null
         //   animation: google.maps.Animation.DROP
        })

        self.markers.push(marker);

        marker.addListener('click', function() {
            console.log('clicked marker for ' + this.title + '. current animation = ' + this.getAnimation());
            self.selectPlace(place);
        });

        marker.setMap(Map.instance);

    };


    this.populateLocations = function() {
        self.places.removeAll();
        var i = 0;
        places.forEach(function(placeItem) {
            self.places.push(new Place(placeItem, i));
            i++;
        });

        // Check to make sure markers do not exist.
        if (self.markers.length === 0) {
            for (var i = 0; i < self.places().length; i++) {
                var place = self.places()[i];
                //console.log(place);
                self.placeMarker(place, i);
            }
        }

        for (var i in self.markers) {
            if (self.markers[i].visible === false) {
                self.markers[i].setVisible(true);
            }
        }
    };

    this.selectPlace = function(place) {
        console.log(place);
        console.log('Drawer or map item clicked for ' + place.name);

        if (typeof self.currentMarker() != 'undefined') {
            console.log('item defined.');
            if (self.currentMarker().title === place.name) {
                console.log('Item is already selected.');
                Map.toggleBounce(self.currentMarker(), null);
                return;
                } else {
                    console.log('new item is selected : ' + place.name );
                    // Clear the marker of the previously selected item.
                    console.log('removing green from previous icon : ' + self.markers[self.currentPlace()].title);
                    self.markers[self.currentPlace()].setIcon('');

                    console.log('Remove animation on previous item: ' + self.markers[self.currentPlace()].title);
                    // Check for icon animation for previous entry.  If it is active, set it to null.
                    self.currentMarker().setAnimation(null);
                }
        } else {
            console.log('Currentitem not defined.');
            console.log("First time click.");
        }

        console.log('out of if else loops for ' + place.name);

            // Chnage the selected Marker icon to green.
            console.log('Setting icon color to green for ' + place.name)
            self.markers[place.number].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

            console.log('Pan to started for ' + place.name);
            var latLng = new google.maps.LatLng(place.lat, place.lng);
            Map.instance.panTo(latLng);
             console.log(self.markers[place.number]);
            console.log('Pan to animation = ' + self.markers[place.number].getAnimation() + ' for ' + self.markers[place.number].title);
            console.log('Pan to ended.');
            console.log(self.markers[place.number]);

            console.log('Toggle animation for current item : ' + self.markers[place.number].title);
            Map.toggleBounce(self.markers[place.number]);
            console.log('Toggle animation completed for : ' + self.markers[place.number].title);

            console.log('Setting new currentPlace to ' + self.markers[place.number].title);
            // Populate observables with new current marker informaton.
            self.currentPlace(place.number);
            self.currentDesc(place.description);
            self.currentName(place.name);
            self.initAjax(place);
    };

    this.initAjax = function(place) {

        console.log('initAjax called for ' + place.name);
        console.log(place.name + ' has an animation of ' + self.currentMarker().getAnimation());

        self.clearObservables();

        self.fillcontentWindow();

        $('#model-data').show();

        YelpConnect(place.name);
        fsConnect(place.name);

    };

    this.clearObservables = function() {

        // This function clears the existing Knockout observable array variables before the Ajax call.
        self.fsAddress.removeAll();
        self.fsImg.removeAll();
        self.fsTips.removeAll();
    };


    this.fillcontentWindow = function() {

        console.log(self.places()[self.currentPlace()]);

        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<b>' + self.places()[self.currentPlace()].name + '</b> ' +
            '</div>';


        self.infoWindow.setOptions({
            content: contentString
        });

        self.infoWindow.open(Map.instance, self.markers[self.currentPlace()]);
        // Chnage the selected Marker icon to green.
        self.markers[self.currentPlace()].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

    };

    this.parseResults = function(element) {

        if (element != null) {
        //    console.log('Current entry: ' + element.name);

            self.yelpName(element.name);
            self.yelpRatingUrl(element.rating_img_url);
            self.yelpRatingImg(element.rating_img_url_small);
            self.yelpReviews(element.review_count);
            self.yelpImg(element.image_url);
            self.yelpAddress(element.location.display_address);
            self.yelpZip(element.postal_code);
            self.yelpDesc(element.snippet_text);
            self.yelpUrl(element.url);

            if (element.display_phone) {
                self.yelpPhone(element.display_phone.slice(3, -1));
            } else {
                self.yelpPhone("");
            }
            $('#yelp-noresult').hide();
            $('#yelp').show();

        }

      //  console.log(self.yelpName());

        if ($("#resultLink".length != 0)) {

            $('#yelp-logo').click(function() {
                openSite(self.yelpUrl());
            });
        }
    };

    this.fsParseResults = function(element) {

        if (element != null) {
            console.log('FS Parse. Current entry: ' + element.name);
        //    console.log(element);

            self.fsName(element.name);

            for (var i = 0; i < element.location.formattedAddress.length; i++) {
        //        console.log(element.location.formattedAddress[i]);
                self.fsAddress.push(element.location.formattedAddress[i]);
            }


            self.fsCrossStreet(element.location.crossStreet);
            self.fsZip(element.location.postalCode);



            for (i = 0; i < element.tips.groups[0].items.length; i++) {
    //            console.log(element.tips.groups[0].items[i].text);
                self.fsTips.push('"' + element.tips.groups[0].items[i].text + '"');

                }

           // $('#fs-body-content').show();


            try {
                for (i = 0; i < element.photos.groups[0].items.length; i++) {
        //      console.log(element.photos.groups[0].items[i].prefix);
                    self.fsImg.push(element.photos.groups[0].items[i].prefix + '300x300' + element.photos.groups[0].items[i].suffix);

                 }
                 $('#gallery-pill').show();
            } catch (err) {
                Helpers.logError("No photos found for this venue.");
                $('#gallery-pill').hide();
            }



       //     console.log(self.fsTips().length);

            // if (self.fsTips().length > 3) {
            //     $('#fs-body-content').css('overflow', 'auto');
            // } else {
            //     $('#fs-body-content').css('overflow', 'none');
            // }

      //      console.log(element.photos.groups[0].items.length);


            self.fsUrl(element.shortUrl);

            // Specify divs to display based on results.
            $('#fs-noresult').hide();
            $('#four-square').show();
          //  $('#gallery-pill').show();
            //$('carousel-inner:nth-child(2)').addClass('active');

        }



    //    console.log(self.fsName());
    //    console.log(self.fsImg());
        for (var i = 0; i < self.fsAddress().length; i++) {
   //         console.log(self.fsAddress()[i]);
        }

   //     console.log(self.fsTips());

        if ($("#resultLink".length != 0)) {

            $('#fs-logo').click(function() {
                self.openSite(self.fsUrl());
            });
        }

    //    console.log("$('#carousel-control').addClass('active')");

        $('#carousel-control').addClass('active');
        $('#carousel-item').addClass('active');

    };

    this.openSite = function(url) {

        var win = window.open(url, '_blank');
        win.focus();
    };

    this.menuToggle = function() {


        if ($('#drawer').css('display') == 'none') {
            console.log('Drawer to become visible.');
            $('#pg-container').click(function() {
                self.menuToggle();
            });
        }

        else {
            console.log('Drawer to become hidden.');
          //  $('#drawer').fadeOut();
            $('#pg-container').unbind('click');
        }

    // $('#drawer').fadeOut(function () {
    //     $('#drawer').toggle('slide', {
    //         direction: 'left'
    //     }, 1000);
    // });


       $('#drawer').toggle('slide');

    };

    this.toggleBorder = function() {
  //      console.log('toggle');
        if (self.isBorder) {
   //         console.log('turning off');
    //        console.log($("*").css("border"));
            $("*").css("border", "none");
            self.isBorder = false;
        } else {
    //        console.log('turning on');
    //        console.log($("*").css("border"));
            $("*").css("border", "1px solid red");
            self.isBorder = true;

        }

    };

var nonce_generate = function() {
      return (Math.floor(Math.random() * 1e12).toString());
  };

var localJsonpCallback = function(data) {
      console.log(JSON.stringify(data));
  };

var callStart = function(apiName) {
  //    console.log(apiName +' Start.');
      // Add code here to add progress bar in CSS.
  };

var callComplete = function(apiName) {
   //   console.log(apiName + ' complete.');
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
          complete: callComplete('Yelp'),
          beforeSend: callStart('Yelp'),
          success: function(results) {
    //          console.log("YELP SUCCESS! %o", results);
    //          console.log(results.total + ' results found for Yelp. Analyzing...');
              var resultsTotal = results.total;
              var filteredResults = 0;
              var city = local.slice(0, -4);
              // console.log(city);
              $.each(results.businesses, function(index, element) {
                  if ((element.name === nameLocation) && (element.location.city === city)) {
                      filteredResults++;
     //                 console.log(self);
                      self.parseResults(element);
                  } else {
    //                  console.log('Rejected: ' + element.name + ' in ' + element.location.city);
                  }

              });

              if (filteredResults === 0) {
    //              console.log('Nothing found from Yelp.');
                  $('#yelp-noresult').show();
                  $('#yelp').hide();
                  // parseResults(yelpObject, null);
              }

          },
          error: function(results) {
    //          console.log("error %o", results);
          }
      }

      $.ajax(settings);
  };



var fsConnect = function(nameLocation) {
 //     console.log(self);
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
        complete: callComplete('fs'),
        beforeSend: callStart('fs'),
        success: function(results) {
            console.log("FS SUCCESS! %o", results);
            var resultsTotal = results.response.venues.length;
            var results = results.response.venues;
    //        console.log(results);
    //        console.log(resultsTotal + ' results found in FS. Analyzing...');
            var filteredResults = 0;
            var city = near.slice(0, -4);
    //        console.log(city);
            $.each(results, function(index, element) {
                if ((element.name === nameLocation) && (element.location.city === city)) {
    //                console.log('element added to Foursquare.');
                    filteredResults++;
                    fsDetails(element.id);
                } else {
                    console.log('Rejected from FS: ' + element.name + ' in ' + element.location.city);
                }

            });
    //        console.log(filteredResults + ' results from FS.');

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
    //        console.log(city);
    //        console.log('Venue added to Foursquare.');
    //        console.log(self);
            self.fsParseResults(results);

        },
        error: function(results) {
            console.log("ERROR! %o", results);
        }
    }

    $.ajax(settings);
};

    // End Function declarations

    // Statements
    this.query.subscribe(self.search);

    $('modal-place').on('hidden.bs.modal', function() {})

    // This event triggers the street view to display in the modal.
    $('#modal-place').on('shown.bs.modal', function() {
        Map.showStreet(self.places()[self.currentPlace()].lat, self.places()[self.currentPlace()].lng);
    });

    $('#pg-container').click(function() {
        self.menuToggle();
    });


    Map.initMap(self);


    //Populate Map with Markers on initial load.
    self.populateLocations();

    // End Statements


};

ko.applyBindings(new ViewModel());
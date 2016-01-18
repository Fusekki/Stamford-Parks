// $(function() {
$("form").submit(function() {
    return false;
});

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

            //return this.map;
        } catch (err) {
            this.helpers.handleError("Google maps is not loading. This may be due to not having an internet connection.");
        }


    },

    showStreet: function(lat, lng) {
        var loc = {
            lat: lat,
            lng: lng
        };
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('gStreet'), {
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

    }
};

var Helpers = {
    handleError: function(msg) {
        return alert(msg);
    }

};


var mark = function(place, map) {
    var myMap = map;
    var pos = new google.maps.LatLng(place.lat(), place.lng());
    //	console.log(Map.map);
    //	console.log(place.name());
    //	console.log(place.lat());
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


var Place = function(data, num) {
    this.name = data.name;
    this.lat = data.address.lat;
    this.lng = data.address.lng;
    this.marker = data.marker;
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
    self.yelpImage = ko.observable();
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

    self.currentPlace = ko.observable();
    self.currentName = ko.observable();
    self.currentDesc = ko.observable();

    self.infoWindow = new google.maps.InfoWindow();
    self.helpers = Helpers;

    resultsFound = ko.pureComputed(function() {
        var count = self.places().length;

        //console.log(count);

        if (count > 25) {
            //	console.log('count > 25');
            $('#drawer-list').css({
                "column-count": "2"
            }, {
                "-webkit-column-count": "2"
            }, {
                "-moz-column-count": "2"
            }, {
                "-webkit-column-gap": "40px"
            }, {
                "-moz-column-gap": "40px"
            }, {
                "column-gap": "40px"
            });
        } else {
            //	console.log('count less than 30');
            $('#drawer-list').css({
                "column-count": "1"
            });
        }


        //console.log(count);
        return count === 0 ? "0 results found" : count + " results found";

    });

    // End Knockout Declarations




    search = function(value) {
        // remove all the current places, which removes them from the view
        self.places.removeAll();
        //console.log(places);

        for (var i in places) {
            if (places[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                self.places.push(places[i]);
            }
        }

        console.log(self.markers);
        for (var i in self.markers) {
            console.log(value);
            console.log(self.markers[i].title.toLowerCase().indexOf(value.toLowerCase()));
            if (self.markers[i].title.toLowerCase().indexOf(value.toLowerCase()) < 0) {
                self.markers[i].setVisible(false);
            } else {
                self.markers[i].setVisible(true);
            }
        }

        if (value.length === 0) {
            populateLocations();
            console.log('empty value');
        }

    };

    //console.log(self.places());

    placeMarker = function(place, num) {
        //console.log(place);
        var pos = new google.maps.LatLng(place.lat, place.lng);
        //	console.log(Map.map);
        //	console.log(place.name);
        //	console.log(place.lat);
        var marker = new google.maps.Marker({
            title: place.name,
            position: pos,
            label: place.marker,
            number: num,
            animation: google.maps.Animation.DROP
        })

        self.markers.push(marker);

        marker.addListener('click', function() {
            focusMarker(place);
            //infoWindow.open(Map.map, marker);
        });

        marker.setMap(Map.instance);

    };


    populateLocations = function() {
        self.places.removeAll();
        //console.log('now populating');
        var i = 0;
        places.forEach(function(placeItem) {
            //console.log(placeItem);
            self.places.push(new Place(placeItem, i));
            i++;
        });

        // Check to make sure markers do not exist.
        if (self.markers.length === 0) {
            for (var i = 0; i < self.places().length; i++) {
                var place = self.places()[i];
                //console.log(place);
                placeMarker(place, i);
            }
        }



        for (var i in self.markers) {
            //console.log(self.markers[i].visible);
            if (self.markers[i].visible === false) {
                //console.log('cycling through markers for visibile.');

                self.markers[i].setVisible(true);
            }

        }


    };

    initAjax = function(place) {
        // console.log(self.infoWindow);
        // console.log('focus on marker ' + place.number);
        // console.log(self.markers);

        console.log('initAjax called.');

        //$('#yelp').hide('slow');
        //$('#four-square').hide('slow');



        self.currentPlace(place.number);
        self.currentDesc(place.description);
        self.currentName(place.name);


        // Reset former marker back to red if it was previously chosen.
        if (self.currentPlace != null) {
            self.markers[self.currentPlace()].setIcon('');
        }

        YelpConnect(place.name);
        fsConnect(place.name);
        // $('#modalPlace').on('shown.bs.modal', function () {
        // 	console.log('resize');
        // 	google.maps.event.trigger(Map, "resize");
        // 	});

        //Map.showStreet(place.lat, place.lng);

        var latLng = new google.maps.LatLng(place.lat, place.lng);
        Map.instance.panTo(latLng);

        fillcontentWindow();



        $('#modelData').show();

        //obtainWiki(place.name);

    };

    // Function Declarations

    fillcontentWindow = function() {

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

    parseResults = function(element) {

        if (element != null) {
            console.log('Current entry: ' + element.name);

            self.yelpName(element.name);
            self.yelpRatingUrl(element.rating_img_url);
            self.yelpRatingImg(element.rating_img_url_small);
            self.yelpReviews(element.review_count);
            self.yelpImage(element.image_url);
            self.yelpAddress(element.location.display_address);
            self.yelpZip(element.postal_code);
            self.yelpDesc(element.snippet_text);
            self.yelpUrl(element.url);

            if (element.display_phone) {
                self.yelpPhone(element.display_phone.slice(3, -1));
            } else {
                self.yelpPhone("NA");
            }
            $('#yelpNone').hide();
            $('#yelp').show();
            //	$('#yelp').show();

        }

        console.log(self.yelpName());

        if ($("#resultLink".length != 0)) {

            $('#yelpLogo').click(function() {
                openSite(self.yelpUrl());
            });
        }
    };

    fsParseResults = function(element) {

        if (element != null) {
            console.log('FS Parse. Current entry: ' + element.name);
            console.log(element);


            self.fsName(element.name);


            //console.log(element.location.formattedAddress.length);

            for (var i = 0; i < element.location.formattedAddress.length; i++) {
                console.log(element.location.formattedAddress[i]);
                self.fsAddress.push(element.location.formattedAddress[i]);
            }


            self.fsCrossStreet(element.location.crossStreet);
            self.fsZip(element.location.postalCode);
            //self.fsRating(element.rating);
            for (i = 0; i < element.tips.groups[0].items.length; i++) {
                console.log(element.tips.groups[0].items[i].text);
                self.fsTips.push('"' + element.tips.groups[0].items[i].text + '"');
            }


            console.log(element.photos.groups[0].items.length);
            for (i = 0; i < element.photos.groups[0].items.length; i++) {
                console.log(element.photos.groups[0].items[i].prefix);
                self.fsImg.push(element.photos.groups[0].items[i].prefix + '300x300' + element.photos.groups[0].items[i].suffix);
            }

            //self.fsImg(element.photos.groups[0].items[0].prefix +'60x60'+ element.photos.groups[0].items[0].suffix);
            self.fsUrl(element.shortUrl);
            $('#fsNone').hide();
            $('#four-square').show();
            $('#galleryTab').show();
            //$('carousel-inner:nth-child(2)').addClass('active');

        }

        console.log(self.fsName());
        console.log(self.fsImg());
        for (var i = 0; i < self.fsAddress().length; i++) {
            console.log(self.fsAddress()[i]);
        }

        console.log(self.fsTips());

        if ($("#resultLink".length != 0)) {

            $('#fsLogo').click(function() {
                openSite(self.fsUrl());
            });
        }

        console.log("$('#carousel-control').addClass('active')");

        $('#carousel-control').addClass('active');
        $('#carousel-item').addClass('active');

    };

    openSite = function(url) {

        var win = window.open(url, '_blank');
        win.focus();
    };

    menuToggle = function() {
        $("#drawer").toggle("slide");
    };

    toggleBorder = function() {
        console.log('toggle');
        if (self.isBorder) {
            console.log('turning off');
            console.log($("*").css("border"));
            $("*").css("border", "none");
            self.isBorder = false;
        } else {
            console.log('turning on');
            console.log($("*").css("border"));
            $("*").css("border", "1px solid red");
            self.isBorder = true;

        }

    };

    // End Function declarations

    // Statements
    self.query.subscribe(search);

    $('modalPlace').on('hidden.bs.modal', function() {})

    // This event triggers the street view to display in the modal.
    $('#modalPlace').on('shown.bs.modal', function() {
        Map.showStreet(self.places()[self.currentPlace()].lat, self.places()[self.currentPlace()].lng);
    });


    Map.initMap(self);


    //Populate Map with Markers on initial load.
    populateLocations();

    // End Statements


};

// ViewModel.resultsFound = ko.pureComputed(function() {
// 	return count === 0 ? "0 results found" : count + " results found";
// }, ViewModel);



ko.applyBindings(new ViewModel());
// });
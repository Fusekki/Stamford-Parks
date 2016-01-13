// $(function() {
	$("form").submit(function() { return false; });

	 var Map = {

		initMap: function() {
			var stamford = new google.maps.LatLng(41.074448, -73.541316);

			try {
				// Create a map object and specify the DOM element dor display.
				this.map = new google.maps.Map(document.getElementById('map'), {
					center: stamford,
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					scroolwheel: true,
					zoom: 15,
					styles: styleArray
				});

				//return this.map;
			}
			catch(err) {
				this.helpers.handleError("Google maps is not loading. This may be due to not having an internet connection.");
			}


		},

		showStreet: function(lat, lng) {
			var loc = {lat: lat, lng: lng};
			var panorama = new google.maps.StreetViewPanorama(
				document.getElementById('gStreet'), {
					position: loc,
					prob: {
						heading: 24,
						pitch: 18
					}
				});

			this.map.setStreetView(panorama);

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


	 var obtainWiki = function(placeName) {

	 	var placeName = placeName.trim();
 		 // Using jQuery
 		 console.log('https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=' + placeName + '&callback=?');
		$.ajax( {
			type: 'GET',
		    url: 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=' + placeName + '&callback=?',
		    contentType: 'application/json; charset=utf-8',
		    async: false,
		    //data: queryData,
		    dataType: 'json',
		    type: 'POST',
		    headers: { 'Api-User-Agent': 'Example/1.0' },
		    success: function (data, textStatus, jqXHR) {

				var markup = data.parse.text["*"];
				var i = $('<div></div>').html(markup);

				// remove links as they will not work
				i.find('a').each(function() { $(this).replaceWith($(this).html()); });

				// remove any references
				i.find('sup').remove();

				// remove cite error
				i.find('.mw-ext-cite-error').remove();

				$('#article').html($(i).find('p'));
		    }
		} );
	 };




	var ViewModel = function() {

		var self = this;

		self.isBorder = false;

		self.markers = [];

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
		self.fsAddress = ko.observable();
		self.fsZip = ko.observable();
		self.fsCity = ko.observable();
		self.fsCrossStreet = ko.observable();
		self.fsImg = ko.observable();
		self.fsRating = ko.observable();
		self.fsUrl = ko.observable();


		self.places = ko.observableArray([]);
		self.query = ko.observable('');

		self.menuVisible = ko.observable('true');


	//	self.currentPlace = null;

		self.currentPlace = ko.observable();
		self.currentName = ko.observable();
		self.currentDesc = ko.observable();

		self.infoWindow = new google.maps.InfoWindow();
		self.helpers = Helpers;
		//console.log(self.yelpName());
		//console.log(self.yelpResults());


		resultsFound = ko.pureComputed(function() {
			var count = self.places().length;

			console.log(count);

			if (count > 25) {
				console.log('count > 25');
				$('#drawer-list').css({"column-count":"2"}, {"-webkit-column-count":"2"}, {"-moz-column-count":"2"},
					{"-webkit-column-gap":"40px"},{"-moz-column-gap":"40px"},{"column-gap":"40px"});
			} else {
				console.log('count less than 30');
				$('#drawer-list').css({"column-count":"1"});
			}


			//console.log(count);
			return count === 0 ? "0 results found" : count + " results found";

		});

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
		    	}
		    	else {
		    		self.markers[i].setVisible(true);
		    	}
		    }

		    if (value.length === 0) {
		    	populateLocations();
		    	console.log('empty value');
		    }

		};

		self.query.subscribe(search);



		Map.initMap(self);
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

			marker.setMap(Map.map);

		};


		populateLocations = function() {
			self.places.removeAll();
				//console.log('now populating');
				var i = 0;
				places.forEach(function(placeItem){
					//console.log(placeItem);
		 			self.places.push(new Place ( placeItem, i) );
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
			   		if (self.markers[i].visible === false){
			   			//console.log('cycling through markers for visibile.');

			   			self.markers[i].setVisible(true);
			   		}

		    	}


		};

		initAjax = function(place) {
			// console.log(self.infoWindow);
			// console.log('focus on marker ' + place.number);
			// console.log(self.markers);

			console.log('initAjax');

			$('#yelp').hide('slow');
			$('#four-square').hide('slow');



			self.currentPlace(place.number);
			self.currentDesc(place.description);
			self.currentName(place.name);


			// Reset former marker back to red if it was previously chosen.
			if (self.currentPlace != null) {
				self.markers[self.currentPlace()].setIcon('');
			}

			YelpConnect(place.name);
			//fsConnect(place.name);
			Map.showStreet(place.lat, place.lng);
			fillcontentWindow();



			//obtainWiki(place.name);

		};

		fillcontentWindow = function () {
			console.log('line324');

			var contentString = '<div id="content">' +
					 			'<div id="siteNotice">' +
		 						'</div>' +
								'<b>' + self.places()[self.currentPlace()].name + '</b> ' +
								'</div>' +
								'<button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#modalPlace">Info</button>';



				self.infoWindow.setOptions({
					content: contentString
				});


				self.infoWindow.open(Map.map, self.markers[self.currentPlace()]);
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

			}

			console.log(self.yelpName());

			if($("#resultLink".length != 0)) {

				 $('#yelpScore').click(function(){
					openSite(self.yelpUrl());
				});
			}


/*
				var contentString = '<div id="content">' +
								      '<div id="siteNotice">' +
								      '</div>' +
								      '<h1 id="firstHeading">' + self.yelpResults[0].name + '</h1>' +
								      '<img id="yelpImage" src="'+ self.yelpResults[0].image + '" alt="Park picture"></img><br>' +
								      '<div id="bodyContent">' +
								      '<p><b>' + self.yelpResults[0].name + '</b> ' + self.yelpResults[0].description + '</p>' +
								      '<p>Phone:' + self.yelpResults[0].phone + '<br>' +
								      'Address:' + self.yelpResults[0].address + '<br>' +
								      'Yelp Score: <img id="yelpScore" src="'+ self.yelpResults[0].ratingImg + '" alt="Score: ' + self.yelpResults[0].reviews +'"></img><br>' +
								      // 'Review:' + self.yelpResults[0].reviews + '<br>' +
									  '</p>' +
								      '</div>' +
								      '</div>';
				} else {
					var place = places[self.currentPlace];

					var contentString = '<div id="content">' +
									      '<div id="siteNotice">' +
									      '</div>' +
									      '<h1 id="firstHeading">' + place.name + '</h1>' +
									      '<div id="bodyContent">' +
									      '<p><b>' + place.name + '</b> ' + place.description + '</p>' +
										  '</p>' +
									      '</div>' +
									      '</div>';

				}

				self.infoWindow.setOptions({

					content: contentString
				});

				self.infoWindow.open(Map.map, self.markers[self.currentPlace]);
				// Chnage the selected Marker icon to green.
				self.markers[self.currentPlace].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

				if($("#resultLink".length != 0)) {

				 $('#yelpScore').click(function(){
					openYelp(self.yelpResults[0].url);
				});
				}*/

			//console.log(self);
			//console.log(element);
			//console.log(yelpObject);



		};

		fsParseResults = function(element) {

		if (element != null) {
			console.log('Current entry: ' + element.name);


			self.fsName(element.name);
			self.fsAddress(element.location.address);
			self.fsCity(element.location.city);
			self.fsCrossStreet(element.location.crossStreet);
			self.fsZip(element.postal_code);
			self.fsPhone(element.contact.formattedPhone);
			self.fsRating(element.rating);
			self.fsImg(element.photos.groups[0].items[0].prefix +'60x60'+ element.photos.groups[0].items[0].suffix);
			self.fsUrl(element.shortUrl);
			$('#fsNone').hide();
			$('#four-square').show();

			}

		console.log(self.fsName());

		if($("#resultLink".length != 0)) {

		 	$('#fsScore').click(function(){
				openSite(self.fsUrl());
				});
			}
		};

		openSite = function(url) {

			var win = window.open(url, '_blank');
			win.focus();


		};


		menuToggle = function() {
			//console.log('Click event for menuToggle.');
			//console.log(drawer);

			//drawer.classList.toggle('close');

			$("#drawer").toggle("slide");



/*			$('main').click(function(){
				drawer.classList.remove('open');
			});*/



		};

		toggleBorder = function() {
			console.log('toggle');
			if (self.isBorder){
				console.log('turning off');
				console.log($("*").css("border"));
				$("*").css("border","none");
				self.isBorder = false;
			} else {
				console.log('turning on');
				console.log($("*").css("border"));
				$("*").css("border","1px solid red");
				self.isBorder = true;

			}

		};


		//Populate Map with Markers on initial load.
		populateLocations();
		//console.log(self.resultsFound());


	};

	// ViewModel.resultsFound = ko.pureComputed(function() {
	// 	return count === 0 ? "0 results found" : count + " results found";
	// }, ViewModel);



	ko.applyBindings(new ViewModel());
// });
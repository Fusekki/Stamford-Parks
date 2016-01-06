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
/*
	 var api = {
	 	ititRequests = function(locations) {
	 		var getYelp = this.getYelp(locations);


	 	},

	 	getYelp = function(locations) {
	 		return new Promise(function(resolve, reject)) {
	 			var counter = Locations.length;
	 			var resolveForYelpFn = function() {
	 				console.log('getYelp resolved!');
	 			};

	 			Locations.forEach(function(location) {
	 				var url = model.API.YELP.CONTEXT.BASE_URL + Location.data.yelp.businessID,
	 					consumer_secret = model.API.YELP.AUTH_SECRET.consumer_secret,
	 					token_secret = model.API.YELP.AUTH_SECRET.token_secret;

	 				var params = {
	 					oauth_consumer_key: model.API.YELP
	 				}

	 			})
	 		}
	 	}
	 }*/

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

		self.markers = [];

		self.places = ko.observableArray([]);
		self.query = ko.observable('');

		self.menuVisible = ko.observable('true');


		self.currentPlace = null;

		self.infoWindow = new google.maps.InfoWindow();
		self.helpers = Helpers;
		//console.log(self.helpers);


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

			// var infoWindow = new google.maps.InfoWindow({
			// 	content: place.description
			// });

			marker.addListener('click', function() {
				focusMarker(place);
				//infoWindow.open(Map.map, marker);
			});

		 //    google.maps.event.addListener(marker, 'rightclick', function(event) {
		 //        marker.setMap(null);
		 //    });

			marker.setMap(Map.map);

		};


		populateLocations = function() {
			self.places.removeAll();
			//console.log('places: ' + self.places.length);
			//console.log('markers: ' + self.markers.length);
			//console.log(self.places);

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

		focusMarker = function(place) {
			// console.log(self.infoWindow);
			// console.log('focus on marker ' + place.number);
			// console.log(self.markers);

			console.log('focus marker');


			// Reset former marker back to red if it was previously chosen.
			if (self.currentPlace != null) {
				self.markers[self.currentPlace].setIcon('');
			}

			var yelpData = YelpConnect(place.name);
			console.log(yelpData);


			//obtainWiki(place.name);

			self.currentPlace = place.number;
			self.infoWindow.setOptions({
				content: place.description
			});
			// console.log(Map);
			// var chicago = new google.maps.LatLng(place.lat, place.lng);
 		// 	Map.setCenter(chicago);
			//Map.setCenter({lat: place.lat, lng: place.lng});

			self.infoWindow.open(Map.map, self.markers[place.number]);
			// Chnage the selected Marker icon to green.
			self.markers[place.number].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
			//console.log(self.infoWindow);
		};

		menuToggle = function() {
			console.log('Click event for menuToggle.');
			console.log(drawer);

			//drawer.classList.toggle('close');

			$("#drawer").toggle("slide");


/*			$('main').click(function(){
				drawer.classList.remove('open');
			});*/



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
$(function() {
	var places = [
		{
			name: 'Stamford Parks & Recreation',
			address: { lat: 41.051474, lng: -73.542895 },
			marker: "A",
			description : ''
		},
		{
			name: 'West Beach',
			address: { lat: 41.041237, lng: -73.526585 },
			marker: "B",
			description: ''
		},
		{
			name: 'Scalzi Park',
			address: { lat: 41.065657, lng: -73.550403 },
			marker: "C",
			description: ''
		},
		{
			name: 'Kosciuszko Park',
			address: { lat: 41.035151, lng: -73.538068 },
			marker: "D",
			description: ''
		},
		{
			name: 'Cummings Park',
			address: { lat: 41.225, lng: -73.3112 },
			marker: "E",
			description: ''
		},
		{
			name: 'Scalzi Park',
			address: { lat: 41.065312, lng: -73.552071 },
			marker: "F",
			description: ''
		},
		{
			name: 'Darien Parks & Recreation',
			address: { lat: 41.066630, lng: -73.484064 },
			marker: "G",
			description: ''
		},
		{
			name: 'Mill River Park',
			address: { lat: 41.052942, lng: -73.543161 },
			marker: "H",
			description: ''
		}

	];

	var Map = {

		initMap: function() {
			var stamford = new google.maps.LatLng(41.074448, -73.541316);

			// Create a map object and specify the DOM element dor display.
			var map = new google.maps.Map(document.getElementById('map'), {
				center: stamford,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scroolwheel: true,
				zoom: 13
			});

			var markers = [];

			// Create a map marker and set its position.
			// var marker = new google.maps.Marker({
			// 	map: map,
			// 	position: stamford,
			// 	title: 'Hello World!'
			// });

		},

		// placeMarker: function() {
		// 	var marker = new google.maps.Marker({
		// 		map: map,
		// 		position: ViewModel.currentPlace().address.lat, ViewModel.currentPlace().address.lng,
		// 		title: ViewModel.currentPlace().name
		// 	})

		// }

	};

	 var Place = function(data) {
	 	this.name = ko.observable(data.name);
	 	this.lat = ko.observable(data.address.lat);
	 	this.lng = ko.observable(data.address.lng);
	 	this.marker = ko.observable(data.marker);
	 	this.description = ko.observable(data.description);

	 };


	var ViewModel = function() {

		var self = this;

		self.places = ko.observableArray([]);
		self.query = ko.observable('');

		self.currentPlace = ko.observable();

		places.forEach(function(placeItem){
		 	console.log(placeItem);
		 	self.places.push(new Place ( placeItem) );
		 });

		search = function(value) {
			// remove all the current beers, which removes them from the view
			//console.log(placeList);
			self.places.removeAll();

		    for (var i in places) {
		      if (places[i].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
		        self.places.push(places[i]);
		      }
		    }

		};

		self.query.subscribe(search);



		Map.initMap();

		setPlace = function(place) {

		 	//console.log('clicked ' + place);
		 	self.currentPlace(place);
		 	console.log(self.currentPlace());

		 	//ViewMap.placeMarker(self.currentPlace());

		 };


		placeMarker = function(place) {
			var marker = new google.maps.Marker({
				map: Map,
				//position: self.currentPlace().address.lat, self.currentPlace().address.lng,
				title: place.name
			})

		};
	};

	ko.applyBindings(new ViewModel());
});
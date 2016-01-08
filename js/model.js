var places = [
		{
			name: "Barrett Park",
			address: { lat: 41.0759301 , lng:  -73.5320674 },
			marker: "A",
			number: null,
			description: "Has playground."
		},
		{
			name: "Bartlett Arboretum",
			address: { lat: 41.132805 , lng: -73.553098 },
			marker: "B",
			number: null,
            description: "Hours: 9am-4pm. The Bartlett Arboretum and Gardens contains 91 acres of parkland, gardens, landscapes, and hiking trails, that focus on the regional plants, ecology and character of Southwestern New England."
		},
		{
			name: "Binney Park",
			address: { lat: 41.034985, lng: -73.570638 },
			marker: "C",
			number: null,
			description: "A picturesque spot hosting July 4th celebrations, with a pond that's popular for winter ice skating."
		},
		{
			name: "Carpinella Park",
			address: { lat: 41.060281 , lng: -73.533699 },
			marker: "D",
			number: null,
			description: "Carpinella Park is located just outside of downtown on the east side and is a wonderful place to stay active or simply pass some time. The facility features ball fields of all kinds as well as tennis and basketball courts. There are also benches, picnic tables and restrooms on the premise."
		},
		{
			name: "Carwin Park",
			address: { lat: 41.049515 , lng: -73.549508 },
			marker: "E",
			number: null,
			description: "Carwin Park is a friendly neighborhood recreation area located on the west side of town. The park entrance is on Spruce Street and the facility features benches and a picnic area as well as a playground and small field. Park hours are every day until 10pm and rules don't allow alcohol, gambling or glass containers of any kind."
		},
		{
			name: "Chestnut Hill Park",
			address: { lat: 41.126026 , lng: -73.571268 },
			marker: "F",
			number: null,
			description: "Fantastic playground with play sets for toddlers and older kids, and it's in a great neighborhood too!"
		},
		{
			name: "Columbus Park",
			address: { lat: 41.053200 , lng: -73.542020 },
			marker: "G",
			number: null,
			description: "Located directly between Tiernan's Pub and Curley's Diner, Columbus Park is a great place to spend part of your day. Surrounded by restaurants, its location makes it a great place to grab some takeout and enjoy a meal on the lawn. A bronze statue of two women, as well as of the park's namesake, Christopher Columbus, give parkgoers an interesting view no matter where they sit."
		},
		{
			name: "Cove Island Park",
			address: { lat: 41.048906 , lng: -73.503533 },
			marker: "H",
			number: null,
			description: "The playground at Cove Island is just part of this expansive shoreline park, which also includes a one mile loop, a great lawn (perfect for kite flying), a salt marsh and of course a long, sandy beach."
		},
		{
			name: "Cummings Park",
			address: { lat: 41.225, lng: -73.3112 },
			marker: "I",
			number: null,
			description: "79-acre beachfront park provides a boardwalk & fishing pier, playground, snack bar & sports fields."
		},
		{
			name: "Czescik Park",
			address: { lat: 41.035485 , lng: -73.527392 },
			marker: "J",
			number: null,
			description: " Park features picnic tables, park benches, pavilions and lovely views of the harbor. Patrons can also enjoy a shoreline walking trail that passes by the numerous boats docked nearby."
		},
		{
			name: "Daskam Park",
			address: { lat: 41.059145 , lng: -73.527111  },
			marker: "K",
			number: null,
			description: "Daskam Park is a quiet little park located near the intersection of Glenbook Road and Daskam Place on the city's east side.&nbsp; The area is perfect for a midday break or a late-day stroll and features park benches, tall trees and a grassy field."
		},
		{
			name: "DePreta Park",
			address: { lat: 41.048931 , lng: -73.515981 },
			marker: "L",
			number: null,
			description: "Depreta Park is a lovely neighborhood recreation area that spans the length of one small block on the south side of Stamford at the corner of Cove Road and Ranson Street. It features tall trees, flowers and benches and it is only a short distance from the harbor. The park stays open one hour after sunset and no alcohol is allowed on the premise."
		},
		{
			name: "Dorothy Heroy Park",
			address: { lat: 41.173738, lng: -73.562112 },
			marker: "M",
			number: null,
			description: "Dorothy Heroy Park is a North Stamford recreational area that can be found near the corner of High Ridge Road and Riding Stable Trail, about four miles north of the Merritt Parkway. The facility houses a Little League field, picnic pavilions as well as basketball and tennis courts. There are also wooded areas, hiking trails, play sets and swings located on the premises. Park hours are from 6am - 10pm and city services encourage visitors to follow the rules."
		},
		{
			name: "Drotar Park",
			address: { lat: 41.100123 , lng: -73.517058 },
			marker: "N",
			number: null,
			description: "Michael J. Drotar Park is the playground located right next to Springdale Elementary School in Stamford's East Side. Students of the school use the park for recess and gym class activities, while the ballfield is home to the Springdale Little League team. Swings, playsets and a concession stand are also found on the premises."
		},
		{
			name: "E. A. Connell Heritage Park",
			address: { lat: 41.053184 , lng: -73.540738 },
			marker: "O",
			number: null,
			description: ""
		},
		{
			name: "Edson Park",
			address: { lat: 41.054714 , lng: -73.503888 },
			marker: "P",
			number: null,
			description: "Gus Edson Park is a small park along Holly Pond.  It is a nice place to sit in the sun or shade while you watch shorebirds hunt and ducks and swans paddle along."
		},
		{
			name: "Edward Hunt Park",
			address: { lat: 41.058195, lng: -73.513500},
			marker: "Q",
			number: null,
			description: "The Edward Hunt Recreation Complex is a large park located on the city's east side at the corner of East Main Street and Courtland Avenue.&nbsp; The park is pet friendly and features playsets, swings, picnic tables and pavilions. There are also many restaurants and other businesses located nearby making lunch or dinner only a short walk away."
		},
		{
			name: "Fort Stamford",
			address: { lat: 41.079664, lng: -73.575469 },
			marker: "R",
			number: null,
			description: "This is a small, quiet, delightful and I think fairly unknown Stamford City Park, with an especially beautiful little formal garden meticulously maintained during the warmer months, right on the site of a Fort that had been constructed during the Revolutionary War to protect the area. There is space for a few cars, and a restroom area. This is a place to go for a quiet time to read or stroll through the garden."
		},
		{
			name: "Gerli Park",
			address: { lat: 41.060734 , lng: -73.508030 },
			marker: "S",
			number: null,
			description: "Gerli Park is a recreation area located right on the border of Stamford and Darien at the corner of East Main Street and Weed Avenue. Park features include tall trees, shoreline trails and picnic tables. There are also restaurants and convenience stores in the area."
		},
		{
			name: "Greenwich Avenue Park",
			address: { lat: 41.027432, lng: -73.565404 },
			marker: "T",
			number: null,
			description: "Greenwich Avenue Park is a gorgeous harbor side recreation area located amid the hustle and bustle of the big city. The park starts at the corner of Greenwich Avenue and Tresser Boulevard and extends all the way down to Pulaski Street. Features include fields, benches and a shoreline walking trail. There are also picnic tables located on the premises."
		},
		{
			name: "Haig Avenue Court",
			address: { lat: 41.088573, lng: -73.527915 },
			marker: "U",
			number: null,
			description: "Haig Avenue Park is a friendly neighborhood recreation facility nestled in the woods near the corner of Crestview Avenue. Features include a basketball court, playfields and swings. The park is also connected to Sleepy Hollow Park, where there are hiking trails and scenic views."
		},
		{
			name: "Hatch Field",
			address: { lat: 41.047818, lng: -73.550855 },
			marker: "V",
			number: null,
			description: "Hatch Field Park is a cozy recreation area located on the city's west side near the corner of Richmond Hill and Fairfield Avenue.&nbsp; The facility features a jungle gym, swings and slides for children to enjoy as well as park benches and a pavilion.&nbsp; There is also a regulation basketball court on the premise where 5 on 5 games get rather competitive at times."
		},
		{
			name: "Hope Street Island Park",
			address: { lat: 41.073563, lng: -73.523677 },
			marker: "W",
			number: null,
			description: "Hope Street Island Park is a small, but peaceful neighborhood park that can be found near the corner of Hope and Union streets. The facility splits the street in half and spans the area of about two blocks. This park features pine trees, memorials, benches and flowers. Sufficient parking is located on the street nearby and there are many restaurants and other stores only minutes away."
		},
		{
			name: "Horon Park",
			address: { lat: 41.066659, lng: -73.550302 },
			marker: "X",
			number: null,
			description: ""
		},
		{
			name: "Jackie Robinson Park",
			address: { lat: 41.048079 , lng: -73.553168 },
			marker: "Y",
			number: null,
			description: "Jackie Robinson Park is a small but charming recreation area located on the city's west side.  It features tall trees, park benches and a stone statue of the Brooklyn Dodger legend himself. The facility is open until sunset."
		},
		{
			name: "John J. Boccuzzi Park",
			address: { lat: 41.032922, lng: -73.546530 },
			marker: "Z",
			number: null,
			description: "Also known as Southfield Park."
		},
		{
			name: "Kiwanis Park",
			address: { lat: 41.054254 , lng: -73.539518 },
			marker: "1",
			number: null,
			description: "Right next to the Palace theater."
		},
		{
			name: "Kosciuszko Park",
			address: { lat: 41.035151, lng: -73.538068 },
			marker: "2",
			number: null,
			description: "Kosciuszko Park is a 7-acre waterfront peninsula park that contains a wide walkway around the perimeter, which encircles ball fields and a children's playground. Narrower loop trails extend down closer to the water. The site has plenty of parking and does not require a fee or sticker to access. Has Restrooms."
		},
		{
			name: "Latham Park",
			address: { lat: 41.056773 , lng: -73.538298 },
			marker: "3",
			number: null,
			description: "Across from the Avon Theater sits John Latham park, a large swatch of green in the heart of downtown.&nbsp; The park includes bronze art of two women talking and a sculpture of a little girl sitting on a bench.&nbsp; The tables located along the east side of the park are perfect for picnicking or chess games.&nbsp; Many local employees enjoy this park as an area for an outdoor lunch on nice days."
		},
		{
			name: "Lione Park",
			address: { lat: 41.053955, lng: -73.556100 },
			marker: "4",
			number: null,
			description: "Michael F. Lione Park is a neighborhood recreational area located near the corner of West Broad Street and Stillwater Avenue. Features of the park include picnic tables, swings, playsets, grills and grassy fields for children to run and play. There is also a basketball and volleyball court as well as a baseball and soccer field on the premise."
		},
		{
			name: "McKeithen Park",
			address: { lat: 41.060770 , lng: -73.517697 },
			marker: "5",
			number: null,
			description: "McKeithen Park, located on Lawn Avenue in Stamford. CT, is a small,  playground that brings the East Side community together in a safe environment to play, socialize, exercise and learn. Playground equipment serving children ages 2 through 12 years old."
		},
		{
			name: "Mianus River Park & Glen",
			address: { lat: 41.085817 , lng: -73.587385 },
			marker: "6",
			number: null,
			description: "The Mianus River flows through this public park, a 389-acre deciduous forest that straddles the Stamford-Greenwich border. It's a haven for dog walkers, mountain bikers, fishermen, hikers and joggers alike. The best entrance to the park is from Merribrook Lane, which is a well-hidden street accessible from Westover Road about a mile south of the Merritt Parkway."
		},
		{
			name: "Mill River Park",
			address: { lat: 41.052942, lng: -73.543161 },
			marker: "7",
			number: null,
			description: "Community urban green space with a playground, artisan carousel & summertime family activities. Hours: 6am - 4pm."
		},
		{
			name: "Newman Mills",
			address: { lat: 41.106370 , lng: -73.589593 },
			marker: "8",
			number: null,
			description: "Newmans Mills Park is a scenic North Stamford recreational area that is completely forest enclosed.&nbsp; The facility is located about a mile north of the Merritt Parkway and is perfect for the outdoorsy types in the region.&nbsp; Features include a flowing stream that leisure fisherman don't seem to mind casting their rods into as well as tall trees, hiking trails and picnic pavilions.&nbsp; Newmans Mills closes nightly at 10pm and park services encourages visitors to follow the rules which include no smoking, fires or alcohol."
		},
		{
			name: "Northrup",
			address: { lat: 41.068989 , lng: -73.523488 },
			marker: "9",
			number: null,
			description: "Northrop Park is a friendly neighborhood playground located on the city's East Side near the corner of Glenbrook Road and Scofield Avenue.&nbsp;It is mainly used as a recess and gym class area for the nearby Julia Stark Elementary School, but&nbsp;it&nbsp;is accessible to all.&nbsp;The grounds feature play sets, slides and swings, as well as a ballpark that is the home field&nbsp;for the Northrop Baseball League for children ages 4 to 12."
		},
		{
			name: "Rippowam Park",
			address: { lat: 41.053207, lng: -73.539335 },
			marker: "0",
			number: null,
			description: "Rippowam Park is located across from the Rippowam Place shops and businesses.&nbsp;The park adds a pleasant touch of green to this large downtown intersection with its&nbsp;many local varieties of plants and flowers. Rippowam Park also houses a monument to Charles E. Rowell, a Stamford physician who served as Mayor of the city from 1911 to 1913."
		},
		{
			name: "Rosa Hartman Park",
			address: { lat: 41.0431526, lng:  -73.5634572},
			marker: "a",
			number: null,
			description: "Rosa Hartman Park in Stamford and Laddins Rock Sanctuary in Old Greenwich are a combined 32-acre piece of preserved land that once faced the possibility of development, when the city of Stamford accepted a proposal for the construction of an amusement park several years ago. However, the plan was blocked by concerned residents, who helped transform the land into a preserve. Today, the property remains a sanctuary for wildlife and people hoping to escape the commotion of a neighborhood in transition."
		},
		{
			name: "Rotary Park",
			address: { lat: 41.050500 , lng: -73.546670 },
			marker: "b",
			number: null,
			description: "Rotary Park, connected by the Greenbelt to Roger Smith Park, runs alongside Mill River and West Main Street. The park includes a large, creatively designed playground and the end of a walking trail which heads north from the park. The playgrounds are separated by age and require parent supervision."
		},
		{
			name: "St. John's Park",
			address: { lat: 41.054283 , lng: -73.533873 },
			marker: "c",
			number: null,
			description: ""
		},
		{
			name: "Saunders Park",
			address: { lat: 41.138611 , lng: -73.571191 },
			marker: "d",
			number: null,
			description: ""
		},
		{
			name: "Scalzi Park & Cubeta Stadium",
			address: { lat: 41.065657, lng: -73.550403 },
			marker: "e",
			number: null,
			description: "Ample green space with facilities for basketball, tennis, baseball, skateboarding, walking & more."
		},
		{
			name: "Scofieldtown Park",
			address: { lat: 41.139592 , lng: -73.559045 },
			marker: "f",
			number: null,
			description: "Scofieldtown Park is a recreational area located near the corner of Scofieldtown and Rock Rimmon Roads about three miles north of the Merritt Parkway.&nbsp;It features wooded areas, picnic tables, ballfields and basketball hoops. The facility is mainly used for North Stamford Pony League baseball and is open daily until 10pm or shortly after games are completed.&nbsp;Park rules include no alcohol or smoking."
		},
		{
			name: "Sleepy Hollow Park",
			address: { lat: 41.092355, lng: -73.525178 },
			marker: "g",
			number: null,
			description: "Sleepy Hollow Park is a backwoods recreation area located between Haig and Woodbury avenues. The parks main features are a mossy stream, tall trees, trails and lovely scenery. There are also picnic table and pavilions nestled deep in the forest."
		},
		{
			name: "Stamford Museum & Nature Center",
			address: { lat: 41.126101 , lng: -73.545515 },
			marker: "h",
			number: null,
			description: "The Stamford Museum & Nature Center, located in Stamford, Connecticut, is an art, history, nature, and agricultural sciences museum. The property covers 118 acres beginning about half a mile north of the Merritt Parkway."
		},
						{
			name: "Springdale Park",
			address: { lat: 41.098812, lng: -73.517999 },
			marker: "i",
			number: null,
			description: "AKA Michael J. Drotar Park.  The playground located right next to Springdale Elementary School in Stamford's East Side. Students of the school use the park for recess and gym class activities, while the ballfield is home to the Springdale Little League team. Swings, playsets and a concession stand are also found on the premises."
		},
		{
			name: "Veterans Memorial Park",
			address: { lat: 41.053430 , lng: -73.538734 },
			marker: "j",
			number: null,
			description: ""
		},
		{
			name: "Vine Road Little League Field",
			address: { lat: 41.099120, lng: -73.537741 },
			marker: "k",
			number: null,
			description: "Vine Road Little League Field is located between High Ridge Road and Newfield Avenue and is most busy in the summer months. The park is home to the Stamford American little league team and features grandstands, a concession area and other athletic fields. Use of the fields is by permit only and the facility stays open until sunset, but games are usually played on into to the night due to lighting on the premise."
		},
								{
			name: "Water Street Park",
			address: { lat: 41.044083, lng: -73.544630 },
			marker: "l",
			number: null,
			description: "Waterside Park is a relaxing recreation spot found in Stamford Harbor not far from the corner of Pulaski and Water streets. The park features tall trees that shade most of the area from the sun as well as calming views of the shoreline. There are also park benches and picnic tables located on the premises, and patrons are encouraged to follow the rules, which include no alcohol"
		},
		{
			name: "West Beach",
			address: { lat: 41.041237, lng: -73.526585 },
			marker: "m",
			number: null,
			description: "Family beach. Playground."
		},
		{
			name: "Wise Park",
			address: { lat: 41.067319 , lng: -73.543064 },
			marker: "n",
			number: null,
			description: "Wise Park is a large, open lawn just south of the First Congregational Church between Bedford and Prospect streets. This open area is a great place to play with kids or walk the dog. The green space is much-needed and appreciated in this busy area of downtown Stamford, which is a mix of business and residential buildings. The lawn is also a popular lunch spot on nice days."
		},
		{
			name: "Woodley Road Bird Sanctuary",
			address: { lat: 41.128090 , lng: -73.555748 },
			marker: "o",
			number: null,
			description: "Woodley Road Bird Sanctuary is a wooded area enclosed by a North Stamford neighborhood where locals come to take in the scenery.&nbsp;A large variety of plant and animal life attracts visitors, making this particular facility the perfect place for a morning hike or afternoon picnic.&nbsp;The park can be found in the hills about 2 miles from the Merritt Parkway and has a couple of different entrances.&nbsp;The easiest way to access by car is from either Woodley Road or Brookdale Drive, but residents can walk into the park from a number of locations."
		}
];

var yelpObject = [{
	name: '',
	ratingUrl: '',
	ratingImg: '',
	reviews: '',
	phone: '',
	image: '',
	address: '',
	zipcode: '',
	description: '',
	url: '',
	mobileUrl: ''
}];

// Specify features and elements to define styles.
var styleArray = [
{
    "featureType": "administrative",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "poi",
    "stylers": [
        {
            "visibility": "simplified"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
        {
            "visibility": "simplified"
        }
    ]
},
{
    "featureType": "water",
    "stylers": [
        {
            "visibility": "simplified"
        }
    ]
},
{
    "featureType": "transit",
    "stylers": [
        {
            "visibility": "simplified"
        }
    ]
},
{
    "featureType": "landscape",
    "stylers": [
        {
            "visibility": "simplified"
        }
    ]
},
{
    "featureType": "road.highway",
    "stylers": [
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.local",
    "stylers": [
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "water",
    "stylers": [
        {
            "color": "#84afa3"
        },
        {
            "lightness": 52
        }
    ]
},
{
    "stylers": [
        {
            "saturation": -17
        },
        {
            "gamma": 0.36
        }
    ]
},
{
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
        {
            "color": "#3f518c"
        }
    ]
}
];
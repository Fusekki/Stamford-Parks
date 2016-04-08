// The locations for this app are parks located in Stamford, CT.
var skip = false,
    cur_infowindow = false,
    availableTags = [],
    selected = 100,
    mapGeneral = false,
    infoWindow = null,
    currentName = ko.observable(),
    currentDesc = ko.observable(),
    yelpResults = ko.observableArray([]),
    fsResults = ko.observableArray([]),
    showYelpNoResult = ko.observable(false),
    showYelp = ko.observable(false),
    showFSnoresult = ko.observable(false),
    showFS = ko.observable(false),
    showModel = ko.observable(false);

var places = [{
    name: "Barrett Park",
    address: {
        lat: 41.0759301,
        lng: -73.5320674
    },

    _destroy: ko.observable(false),
    description: "Hope Street South, at the light by United Housewrecking turn right on Tom’s Rd., Left at the Stop Sign onto Belltown Rd., Barrett Park will be on your right side just after Burdick St."
}, {
    name: "Bartlett Arboretum",
    address: {
        lat: 41.132805,
        lng: -73.553098
    },

    _destroy: ko.observable(false),
    description: "Brookdale Road: 56.31 acres. Hours: 9am-4pm. The Bartlett Arboretum and Gardens contains 91 acres of parkland, gardens, landscapes, and hiking trails, that focus on the regional plants, ecology and character of Southwestern New England."
}, {
    name: "Binney Park",
    address: {
        lat: 41.034985,
        lng: -73.570638
    },

    _destroy: ko.observable(false),
    description: "A picturesque spot hosting July 4th celebrations, with a pond that's popular for winter ice skating."
}, {
    name: "Carpinella Park",
    address: {
        lat: 41.060281,
        lng: -73.533699
    },

    _destroy: ko.observable(false),
    description: "Carpinella Park is located just outside of downtown on the east side and is a wonderful place to stay active or simply pass some time. The facility features ball fields of all kinds as well as tennis and basketball courts. There are also benches, picnic tables and restrooms on the premise."
}, {
    name: "Chestnut Hill Park",
    address: {
        lat: 41.126026,
        lng: -73.571268
    },

    _destroy: ko.observable(false),
    description: "6.3 acres. Chestnut Hill Road & Webbs Road (off Long Ridge Road). Fantastic playground with play sets for toddlers and older kids, and it's in a great neighborhood too!"
}, {
    name: "Columbus Park",
    address: {
        lat: 41.053200,
        lng: -73.542020
    },

    _destroy: ko.observable(false),
    description: "Mini park. Washington Boulevard & Main Street: .56 acres. Originally known as West Park, this land was the first burial ground for Stamford’s earliest settlers. The graves were moved in 1800 to allow the State to widen the Post Road. The park was renamed Columbus Park on October 12, 1958 and the monument was designed and cut by sculptor Lorenzo Ascasibar. It was donated by the Stamford Chapel of UNICO.Located directly between Tiernan's Pub and Curley's Diner, Columbus Park is a great place to spend part of your day. Surrounded by restaurants, its location makes it a great place to grab some takeout and enjoy a meal on the lawn. A bronze statue of two women, as well as of the park's namesake, Christopher Columbus, give parkgoers an interesting view no matter where they sit."
}, {
    name: "Cove Island Park",
    address: {
        lat: 41.048906,
        lng: -73.503533
    },

    _destroy: ko.observable(false),
    description: "Cove Road & Weed Avenue: 83.14 acres. Cove Island is a water oriented park located on Long Island Sound with large open space and extensive shoreline, including beaches. It is an area of unusual natural beauty of which Stamford residents can well be proud. The Island itself, consisting of 42 acres and an additional 41 acres mainland make it a delightful park. Cove Island was formerly the site of the Cove Mills and was purchased by the City of Stamford on October 1, 1954. The Sanford-Holly Mansion located on Cove Island, which is rich in history, now houses the Park Department office. The Mansion House was constructed in 1971 and 1840 and is on the “National Register of Historic Places”. The playground at Cove Island is just part of this expansive shoreline park, which also includes a one mile loop, a great lawn (perfect for kite flying), a salt marsh and of course a long, sandy beach."
}, {
    name: "Cummings Park",
    address: {
        lat: 41.04346565550601,
        lng: -73.52037906646729
    },

    _destroy: ko.observable(false),
    description: "Shippan Avenue 79.29 acres Cummings Park was originally called “Halloween Park”, since the final negotiations took place on Halloween Eve under the administration of the Mayor at that time, Homer Cummings, in 1906. After his death, the park was renamed Cummings Park in his honor. 79-acre beachfront park provides a boardwalk & fishing pier, playground, snack bar & sports fields."
}, {
    name: "Czescik Park",
    address: {
        lat: 41.035485,
        lng: -73.527392
    },

    _destroy: ko.observable(false),
    description: "Shippan Avenue on East Branch Channel: 8.2 acres. Czescik Park was named in 1978 after J. ‘Whitey’ Czescik, who was a local sports figure. Formerly a landfill area, this aprk is in developing stages to accommodate a 200 slip marina and access road.Park features picnic tables, park benches, pavilions and lovely views of the harbor. Patrons can also enjoy a shoreline walking trail that passes by the numerous boats docked nearby."
}, {
    name: "Daskam Park",
    address: {
        lat: 41.059145,
        lng: -73.527111
    },

    _destroy: ko.observable(false),
    description: "Mini park. Glenbrook Road & Daskam Place: 0.64 acres. Daskam Park was named for Walter D. Daskam, who was the first Treasurer of the Stamford Trust Company in 1891. Daskam Park is a quiet little park located near the intersection of Glenbook Road and Daskam Place on the city's east side. The area is perfect for a midday break or a late-day stroll and features park benches, tall trees and a grassy field."
}, {
    name: "DePreta Park",
    address: {
        lat: 41.048931,
        lng: -73.515981
    },

    _destroy: ko.observable(false),
    description: "Depreta Park is a lovely neighborhood recreation area that spans the length of one small block on the south side of Stamford at the corner of Cove Road and Ranson Street. It features tall trees, flowers and benches and it is only a short distance from the harbor. The park stays open one hour after sunset and no alcohol is allowed on the premise."
}, {
    name: "Dorothy Heroy Park",
    address: {
        lat: 41.173738,
        lng: -73.562112
    },

    _destroy: ko.observable(false),
    description: "Riding Stable Trail off High Ridge Road: 15.04 acres. Dorothy Heroy Recreation Complex was named in honor of Dorothy Heroy, who was chairman of the first Recreation Commission in the City of Stamford. She was very active in civic affairs and it was through her efforts the Board of Recreation was founded in 1928. Arts & craft building  Rest Rooms. Dorothy Heroy Park is a North Stamford recreational area that can be found near the corner of High Ridge Road and Riding Stable Trail, about four miles north of the Merritt Parkway. The facility houses a Little League field, picnic pavilions as well as basketball and tennis courts. There are also wooded areas, hiking trails, play sets and swings located on the premises. Park hours are from 6am - 10pm and city services encourage visitors to follow the rules."
}, {
    name: "Drotar Park",
    address: {
        lat: 41.100123,
        lng: -73.517058
    },

    _destroy: ko.observable(false),
    description: "Hope Street (Springdale): 4.46 acres. Drotar Park was acquired in 1952 and was known as Springdale Park. It was renamed in 1972 for M. J. Drotar, who was instrumental in its acquisition. Mr. Drotar was very involved in sports and civic activities. Michael J. Drotar Park is the playground located right next to Springdale Elementary School in Stamford's East Side. Students of the school use the park for recess and gym class activities, while the ballfield is home to the Springdale Little League team. Swings, playsets and a concession stand are also found on the premises."
}, {
    name: "E. A. Connell Heritage Park",
    address: {
        lat: 41.053184,
        lng: -73.540738
    },

    _destroy: ko.observable(false),
    description: "Facility. Bank & Main Streets: 0.42 acres. The former site of the ‘Old Red Bank’ Heritage Park holds remembrances of Stamford’s past. On one plaque there is a copy of the original deed for the town, the second plaque related the story of Ponus, Chief of Shippan, deeding the land to Nathaniel Turner on July 1, 1641.There is also a granite marker “21 miles to Fairfeild” (correct spelling for those days). The marker was placed there by the Stamford Historical Society in 1976. It was renamed in 1983 in honor of Edward A. Connell, first Superintendent of the Department of Parks and Trees. The rose garden was dedicated to Theodore Yudain, one time managing editor of the Stamford Advocate, and donated by the Roasters in 1971."
}, {
    name: "Edson Park",
    address: {
        lat: 41.054714,
        lng: -73.503888
    },

    _destroy: ko.observable(false),
    description: "Mini park. Weed Avenue: 0.38 acres. Gus Edson Park was named after Gus Edson, a Stamford resident and a famous cartoonist. He was the creator of the comic strip “Dondi”. This park was once the site of a boathouse and in the 1940’s was a seaplane base. Gus Edson Park is a small park along Holly Pond.  It is a nice place to sit in the sun or shade while you watch shorebirds hunt and ducks and swans paddle along."
}, {
    name: "Edward Hunt Park",
    address: {
        lat: 41.058195,
        lng: -73.513500
    },

    _destroy: ko.observable(false),
    description: "Courtland Avenue & E. Main Street: 4.9 acres. The Edward Hunt Recreation Complex was named in honor of Edward Hunt, who was Superintendent of the Board of Recreation from 1928 to 1972. The Edward Hunt Recreation Complex is a large park located on the city's east side at the corner of East Main Street and Courtland Avenue. The park is pet friendly and features playsets, swings, picnic tables and pavilions. There are also many restaurants and other businesses located nearby making lunch or dinner only a short walk away."
}, {
    name: "Fort Stamford",
    address: {
        lat: 41.079664,
        lng: -73.575469
    },

    _destroy: ko.observable(false),
    description: "Westover Road: 6.88 acres. Fort Stamford is a historical Park dating back to the late 1700’s (Revolutionary) and is on the “National Register of Historic Places”. The D.A.R. started a campaign to save Fort Stamford inspired by a lecture given by Julia Ward Howe. A book on the history of Ft. Stamford is available at the Stamford Historical Society. Historic site – redoubts (fortifications), Period flower garden, Interpretive building,Open space Parking. This is a small, quiet, delightful and I think fairly unknown Stamford City Park, with an especially beautiful little formal garden meticulously maintained during the warmer months, right on the site of a Fort that had been constructed during the Revolutionary War to protect the area. There is space for a few cars, and a restroom area. This is a place to go for a quiet time to read or stroll through the garden."
}, {
    name: "Gerli Park",
    address: {
        lat: 41.060734,
        lng: -73.508030
    },

    _destroy: ko.observable(false),
    description: "Facility. Post Road & Weed Avenue: 0.47 acres. Gerli Plaza was a gift from Joseph Gerli and was accepted as a park in the 1920’s. Gerli Park is a recreation area located right on the border of Stamford and Darien at the corner of East Main Street and Weed Avenue. Park features include tall trees, shoreline trails and picnic tables. There are also restaurants and convenience stores in the area."
}, {
    name: "Greenwich Avenue Park",
    address: {
        lat: 41.027432,
        lng: -73.565404
    },

    _destroy: ko.observable(false),
    description: "Facility. Greenwich Avenue Park is a gorgeous harbor side recreation area located amid the hustle and bustle of the big city. The park starts at the corner of Greenwich Avenue and Tresser Boulevard and extends all the way down to Pulaski Street. Features include fields, benches and a shoreline walking trail. There are also picnic tables located on the premises."
}, {
    name: "Haig Avenue Court",
    address: {
        lat: 41.088573,
        lng: -73.527915
    },

    _destroy: ko.observable(false),
    description: "Facility. .40 acres. Haig Avenue Park is a friendly neighborhood recreation facility nestled in the woods near the corner of Crestview Avenue. Features include a basketball court, playfields and swings. The park is also connected to Sleepy Hollow Park, where there are hiking trails and scenic views."
}, {
    name: "Hatch Field",
    address: {
        lat: 41.047818,
        lng: -73.550855
    },

    _destroy: ko.observable(false),
    description: "Richmond Hill Avenue 1.05 acres. Hatch Field was named for Alfred H. Hatch, who donated land to the City in 1917 to be used for park purposes. Hatch Field Park is a cozy recreation area located on the city's west side near the corner of Richmond Hill and Fairfield Avenue. The facility features a jungle gym, swings and slides for children to enjoy as well as park benches and a pavilion. There is also a regulation basketball court on the premise where 5 on 5 games get rather competitive at times."
}, {
    name: "Hope Street Island Park",
    address: {
        lat: 41.073563,
        lng: -73.523677
    },

    _destroy: ko.observable(false),
    description: "Facility. Union Place: 0.50 acres. The plaque in this park is a memorial to those who served in the Spanish American War and the battleship ‘ U.S.S. Maine’. The spruce tree, which is used as a permanent Christmas tree, was donated and planted by the Glenbrook Fire Department. Hope Street Island Park is a small, but peaceful neighborhood park that can be found near the corner of Hope and Union streets. The facility splits the street in half and spans the area of about two blocks. This park features pine trees, memorials, benches and flowers. Sufficient parking is located on the street nearby and there are many restaurants and other stores only minutes away."
}, {
    name: "Horon Park",
    address: {
        lat: 41.066659,
        lng: -73.550302
    },

    _destroy: ko.observable(false),
    description: "Washington Boulevard & Bridge Street: 3.14 acres. Horan Park was named after Sergeant Vincent Horan, who was a casualty of the Japanese attack on Pearl Harbor. The park was dedicated in his memory in 1973. Location: Washington Blvd. & Bridge St."
}, {
    name: "Jackie Robinson Park",
    address: {
        lat: 41.048079,
        lng: -73.553168
    },

    _destroy: ko.observable(false),
    description: "West Main, Richmond Hill & Fairfield Avenue: 1.6 acres. Originally known as Richmond Park, this park was renamed in 1973 for Jackie Robinson, famous major league baseball player and first black player in the major leagues. Jackie Robinson Park is a small but charming recreation area located on the city's west side.  It features tall trees, park benches and a stone statue of the Brooklyn Dodger legend himself. The facility is open until sunset."
}, {
    name: "Kiwanis Park",
    address: {
        lat: 41.054254,
        lng: -73.539518
    },

    _destroy: ko.observable(false),
    description: "Facility. 0.24 acres. Kiwanis Park was the first parcel of land to be developed by the U.R.C. Program. The Kiwanis Club was the moving force behind the development of this park and also donated funds. The park was dedicated on May 16, 1968 by Mrs. Lyndon B. Johnson, at that time, the First Lady of the United States. The mural was painted by the Neighborhood Youth Corp in 1978. Right next to the Palace theater."
}, {
    name: "Kosciuszko Park",
    address: {
        lat: 41.035151,
        lng: -73.538068
    },

    _destroy: ko.observable(false),
    description: "Dyke Lane: 18.64 acres. Dyke Park was originally built in the 1930’s. It was expanded by a sanitary land fill project in the early 1970’s. It was renamed and dedicated on May 1, 1977 in memory of Brigadier General Tadeusz Kosciuszko, a Revolutionary War Hero of Polish decent, who served under General George Washington. Kosciuszko Park is a 7-acre waterfront peninsula park that contains a wide walkway around the perimeter, which encircles ball fields and a children's playground. Narrower loop trails extend down closer to the water. The site has plenty of parking and does not require a fee or sticker to access. Has Restrooms."
}, {
    name: "Latham Park",
    address: {
        lat: 41.056773,
        lng: -73.538298
    },

    _destroy: ko.observable(false),
    description: "Facility. Bedford Street: 0.37 acres. Formerly Bedford Park, Latham Park was renamed in 1970 after John C. Latham, who was Stamford’s first Congressional Medal of Honor winner during World War I. Mr. Latham was an expert horticulturist. He had a florist business on Bedford Street and also worked with the Park Department. Latham Park is one of the oldest parks in the City. Across from the Avon Theater sits John Latham park, a large swatch of green in the heart of downtown. The park includes bronze art of two women talking and a sculpture of a little girl sitting on a bench. The tables located along the east side of the park are perfect for picnicking or chess games. Many local employees enjoy this park as an area for an outdoor lunch on nice days."
}, {
    name: "Lawn Avenue Park",
    address: {
        lat: 41.060770,
        lng: -73.517697
    },

    _destroy: ko.observable(false),
    description: "Lawn Avenue: 0.90 acres. Angris McKeithen park was named after Mr. McKeithen, a security guard for the Housing Authority, who died from wounds received while performing his duties. Mr. McKeithen was also involved in athletic and youth organizations in the City. McKeithen Park, located on Lawn Avenue in Stamford. CT, is a small,  playground that brings the East Side community together in a safe environment to play, socialize, exercise and learn. Playground equipment serving children ages 2 through 12 years old."
}, {
    name: "Lione Park",
    address: {
        lat: 41.05482977856113,
        lng: -73.55627546209354
    },

    _destroy: ko.observable(false),
    description: "Stillwater & Merrill Avenue: 9.20 acres. Originally known as Vidal Park, it was purchased in 1946. This park was renamed in 1954 in honor of Michael Lione, a well-known Stamford athlete. Michael F. Lione Park is a neighborhood recreational area located near the corner of West Broad Street and Stillwater Avenue. Features of the park include picnic tables, swings, playsets, grills and grassy fields for children to run and play. There is also a basketball and volleyball court as well as a baseball and soccer field on the premise."
}, {
    name: "Mill River Park",
    address: {
        lat: 41.052942,
        lng: -73.543161
    },

    _destroy: ko.observable(false),
    description: "Mill River Street & West Broad St: 4.1 acres. The Japanese Cherry Trees in Mill River Park were donated by Junzo Nojima, and planted on Arbor Day, April 27, 1957. The Gazebo which was built in 1983, was made possible by the generous donation of Mr. Mordechai Gorn and through the efforts of others in the community. It is a lovely addition to Mill River Park, which is the largest green space in the downtown area.Community urban green space with a playground, artisan carousel & summertime family activities. Hours: 6am - 4pm."
}, {
    name: "Northrup",
    address: {
        lat: 41.068989,
        lng: -73.523488
    },

    _destroy: ko.observable(false),
    description: "Glenbrook Road & Scofield Avenue: 2.35 acres. Northrop Park is a friendly neighborhood playground located on the city's East Side near the corner of Glenbrook Road and Scofield Avenue. It is mainly used as a recess and gym class area for the nearby Julia Stark Elementary School, but it is accessible to all. The grounds feature play sets, slides and swings, as well as a ballpark that is the home field for the Northrop Baseball League for children ages 4 to 12."
}, {
    name: "Rippowam Park",
    address: {
        lat: 41.053207,
        lng: -73.539335
    },

    _destroy: ko.observable(false),
    description: "Facility. Washington Boulevard & Main Street: 0.15 acres. Washington Boulevard, West Broad Street & Whitaker Street: 2.37 acres. Also know as Rippowam Park is located across from the Rippowam Place shops and businesses. The park adds a pleasant touch of green to this large downtown intersection with its many local varieties of plants and flowers. Rippowam Park also houses a monument to Charles E. Rowell, a Stamford physician who served as Mayor of the city from 1911 to 1913."
}, {
    name: "Rotary Park",
    address: {
        lat: 41.050500,
        lng: -73.546670
    },

    _destroy: ko.observable(false),
    description: "Facility. Tresser Boulevard & Greenwich Avenue: 0.55 acres. The Rotary Club paid for the design and landscaping of this City property to commemorate its 50th anniversary. Rotary Park, connected by the Greenbelt to Roger Smith Park, runs alongside Mill River and West Main Street. The park includes a large, creatively designed playground and the end of a walking trail which heads north from the park. The playgrounds are separated by age and require parent supervision."
}, {
    name: "Saunders Park",
    address: {
        lat: 41.138611,
        lng: -73.571191
    },

    _destroy: ko.observable(false),
    description: "Facility. Cascade & Old North Stamford: 0.5 acres."
}, {
    name: "Scalzi Park & Cubeta Stadium",
    address: {
        lat: 41.065657,
        lng: -73.550403
    },

    _destroy: ko.observable(false),
    description: "Bridge Street  48.12 acres. Formerly known as Woodside Park, Scalzi Park was opened to the public in 1868 as a race track which was owned by T.I. and S.H. Ferris. The City purchased the land for a park in 1927 and it was renamed in 1962 for John Scalzi, famed Stamford athlete. A portion of the park was used for the J.M. Wright Technical School and Cubeta Stadium and was built by the State. Ample green space with facilities for basketball, tennis, baseball, skateboarding, walking & more."
}, {
    name: "Southfield Park",
    address: {
        lat: 41.033353261108644,
        lng: -73.54733184331482
    },

    _destroy: ko.observable(false),
    description: "Formerly known as John J. Boccuzzi Park."
}, {
    name: "Springdale Park",
    address: {
        lat: 41.097923278808594,
        lng: -73.51419067382812
    },

    _destroy: ko.observable(false),
    description: "Facility. Hope St. : 0.07 acres. The memorial in Springdale Park was dedicated in 1919 to 80 soldiers & sailors (from then Springdale village). AKA Michael J. Drotar Park.  The playground located right next to Springdale Elementary School in Stamford's East Side. Students of the school use the park for recess and gym class activities, while the ballfield is home to the Springdale Little League team. Swings, playsets and a concession stand are also found on the premises."
}, {
    name: "Stamford Museum & Nature Center",
    address: {
        lat: 41.125187752404855,
        lng: -73.54579039638527
    },

    _destroy: ko.observable(false),
    description: "The Stamford Museum & Nature Center, located in Stamford, Connecticut, is an art, history, nature, and agricultural sciences museum. The property covers 118 acres beginning about half a mile north of the Merritt Parkway."
}, {
    name: "St. John's Park",
    address: {
        lat: 41.060579,
        lng: -73.535251
    },

    _destroy: ko.observable(false),
    description: "Facility. Main Street: 0.78 acres. St. John’s Park appears on a map of Stamford Village dated 1837 as ‘East Green’ and has been used as a park for over 140 years. The monument is a memorial to soldiers of the French & Indian War, Revolutionary War, War of 1812, Mexican War, Civil War, Spanish American War and World War I and was dedicated in 1923."
}, {
    name: "Vine Road Little League Field",
    address: {
        lat: 41.099120,
        lng: -73.537741
    },

    _destroy: ko.observable(false),
    description: "Vine Road Little League Field is located between High Ridge Road and Newfield Avenue and is most busy in the summer months. The park is home to the Stamford American little league team and features grandstands, a concession area and other athletic fields. Use of the fields is by permit only and the facility stays open until sunset, but games are usually played on into to the night due to lighting on the premise."
}, {
    name: "Water Street Park",
    address: {
        lat: 41.044083,
        lng: -73.544630
    },

    _destroy: ko.observable(false),
    description: "Facility. Pulaski and Water Streets: 0.40 acres. Funds were provided by the Community Development Office and groundbreaking ceremonies took place in 1976. Waterside Park is a relaxing recreation spot found in Stamford Harbor not far from the corner of Pulaski and Water streets. The park features tall trees that shade most of the area from the sun as well as calming views of the shoreline. There are also park benches and picnic tables located on the premises, and patrons are encouraged to follow the rules, which include no alcohol"
}, {
    name: "West Beach",
    address: {
        lat: 41.041237,
        lng: -73.526585
    },

    _destroy: ko.observable(false),
    description: "Shippan Ave. 26.58 acres. The West Beach property was originally owned by the Spelke family, a prominent Stamford family, and for years was known as Spelke Beach. Family beach. Playground."
}, {
    name: "Wiser Park",
    address: {
        lat: 41.067319,
        lng: -73.543064
    },

    _destroy: ko.observable(false),
    description: "Facility. Bedford & Chester Streets: 0.73 acres. Through the efforts of the Revonah Neighborhood Association and the City, this area became a park in 1970. A memorial plaque was dedicated in 1976 in honor of Homer Wise, World War II Congressional Medal of Honor winner. Wiser Park is a large, open lawn just south of the First Congregational Church between Bedford and Prospect streets. This open area is a great place to play with kids or walk the dog. The green space is much-needed and appreciated in this busy area of downtown Stamford, which is a mix of business and residential buildings. The lawn is also a popular lunch spot on nice days."
}, {
    name: "Woodley Road Bird Sanctuary",
    address: {
        lat: 41.128090,
        lng: -73.555748
    },

    _destroy: ko.observable(false),
    description: "Off Scofieldtown Road: 19.15 acres. Woodley Road Bird Sanctuary is a wooded area enclosed by a North Stamford neighborhood where locals come to take in the scenery. A large variety of plant and animal life attracts visitors, making this particular facility the perfect place for a morning hike or afternoon picnic. The park can be found in the hills about 2 miles from the Merritt Parkway and has a couple of different entrances. The easiest way to access by car is from either Woodley Road or Brookdale Drive, but residents can walk into the park from a number of locations."
}];
// Specify features and elements to define styles.
var styleArray = [{
    "featureType": "administrative",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "water",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "transit",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "landscape",
    "stylers": [{
        "visibility": "simplified"
    }]
}, {
    "featureType": "road.highway",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.local",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "water",
    "stylers": [{
        "color": "#84afa3"
    }, {
        "lightness": 52
    }]
}, {
    "stylers": [{
        "saturation": -17
    }, {
        "gamma": 0.36
    }]
}, {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
        "color": "#3f518c"
    }]
}];
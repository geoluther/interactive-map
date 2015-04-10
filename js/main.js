
var initialPlaces = [
{
  name: "Bohemian Biergarten",
  LatLng: [40.0187011, -105.2792224]
},

{
  name: "The Mountain Sun",
  LatLng: [40.019139, -105.275275]
},

{
  name: "License No. 1",
  LatLng: [40.019416, -105.2794457]
},

{
  name: "Black Cat Bistro",
  LatLng: [40.01786,-105.278416]
},
{
  name: "Oak at 14th",
  LatLng: [40.018242, -105.277137]
},

{
  name: "Sushi Zanmai",
  LatLng: [40.019244,-105.279846]
},

{
  name: "Boulder Theater",
  LatLng: [40.019152, -105.277475]
}
];


function Model() {
  this.markers = [];
  this.filtered = [];
}


var fourSquare = function(marker) {
  // auth
  var urlBase = "https://api.foursquare.com/v2/venues/";
  var latLng = "search?ll=" + marker.latLng; // latlng format
  var searchTxt = "search?query=" + marker.name + "&near=Boulder,CO";
  var CLIENT_ID = "&client_id=YXBLYUHB43G3YFFFK23AAOO3EXF5KOENLRI5KFLOAE5U3W4E";
  var CLIENT_SECRET = "&client_secret=VOZ5OM12A1RN5BAFHQOUXN1ZTBSTBZ4V5TWAUIDG2G5MZILH";
  var version = "&v=20150406";
  var authString = CLIENT_ID + CLIENT_SECRET + version;
  var url = urlBase + searchTxt + authString;

  var category = "foo";

  $.getJSON(url, function(data){
    venues = data.response.venues;
    category = venues[0].categories[0].name;
    console.log(category);
  })
  .error(function(e) {
    console.log("Foursquare Data Could Not Be Loaded");
  });

  return category;
};


function initializeMap() {
  var myCenter = new google.maps.LatLng(initialPlaces[0].LatLng[0], initialPlaces[0].LatLng[1]);

  var mapProp = {
    center: myCenter,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

  infowindow = new google.maps.InfoWindow({
    content: this.infoWindowContent
  });
}

var Marker = function(data) {

  var self = this;

  self.name = data.name;
  self.text = data.txt;
  self.myLatLng  = new google.maps.LatLng(data.LatLng[0], data.LatLng[1]);
  self.fourSquareCat = "";

  self.infoContent = '<strong>' + self.name + "<p>" + self.text + "</p></strong>" +
  '<img src="https://maps.googleapis.com/maps/api/streetview?size=120x80&location=' +
  self.myLatLng + '">';

  self.marker = new google.maps.Marker({
    position: self.myLatLng,
    title: self.name
  });

  google.maps.event.addListener(self.marker, 'click', function() {
    infowindow.setContent(self.infoContent);
    console.log("marker event listen: " + self.name);
    infowindow.open(map, self.marker);
  });
};


function setAllMap(markers, map) {
  for (var i = 0; i < markers.length; i++){
    markers[i].marker.setMap(map);
  }
}

var ViewModel = function() {

  var self = this;
  google.maps.event.addDomListener(window, 'load', initializeMap()); 

  self.myModel = ko.observable(new Model());
  self.searchString = ko.observable("");
  self.currentPlace = ko.observable("");

  // load all places into ko array

  initialPlaces.forEach(function(placeItem) {
    self.myModel().markers.push(new Marker(placeItem));
  });

  self.currentPlace = ko.observable(self.myModel().markers[0]);
  console.log(self.currentPlace().name);

  // computed list for list view
  self.myModel().filtered = ko.computed(function() {
    // clear and remove markers
    self.results =  ko.observableArray([]);
    setAllMap(self.results(), null);
    self.results.removeAll();

    // set search string to regex
    var re = new RegExp(self.searchString(), "i");

    // push matching Markers to results
    for (var i = 0; i < self.myModel().markers.length; i++) {
      if ( re.test(self.myModel().markers[i].name) ) {
        self.results.push(self.myModel().markers[i] );
      }
    }

    // add filtered map markers
    setAllMap(self.results(), map);
    return self.results();
  });

  self.doSomething = function(place) {
    self.currentPlace(place);
    console.log("Curent: " + self.currentPlace().name);
    infowindow.setContent(place.infoContent);
    infowindow.open(map, place.marker);
  };

};

var map;
var infowindow;
ko.applyBindings(new ViewModel());

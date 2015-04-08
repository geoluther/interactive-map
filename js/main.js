
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
    category = data.response.venues[0].categories[0].name;
    console.log(category);
  })
  .error(function(e) {
    console.log("Foursquare Data Could Not Be Loaded");
  });

  return category;
};


function initialize() {

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
  self.myLatLng  = new google.maps.LatLng(data.LatLng[0], data.LatLng[1]);
  //console.log("latlng: " + self.myLatLng);
  //self.fourSquareCat = fourSquare(self);
  //console.log("callback from fourSquare: " + self.fourSquareCat);

  self.infoContent = '<strong>' + data.name + fourSquare(self) + '</strong><br>' +
  '<img src="https://maps.googleapis.com/maps/api/streetview?size=120x80&location=' +
  self.myLatLng + '">';

  self.marker = new google.maps.Marker({
    position: self.myLatLng,
    title: self.name
  });

  //console.log(self.infoContent);

  google.maps.event.addListener(self.marker, 'click', function() {
    infowindow.setContent(self.infoContent);
    console.log("marker event listen: " + self.name);
    infowindow.open(map, self.marker);
  });

}

Marker.prototype.setFourSquareCat = function(data) {
    var category = data.response.venues[0].categories[0].name;
    self.fourSquareCat = category;
    console.log(category);
}


function setAllMap(markers, map) {
  for (var i = 0; i < markers.length; i++){
    markers[i].marker.setMap(map);
  }
}

var ViewModel = function() {

  var self = this;

  google.maps.event.addDomListener(window, 'load', initialize());

  self.placeList = ko.observableArray([]);
  self.filteredPlaces = ko.observableArray([]);
  self.searchString = ko.observable("");
  self.results =  ko.observableArray([]);

  // load all places into ko array
  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new Marker(placeItem));
  });

  self.currentPlace = ko.observable(self.placeList()[0]);
  //console.log(self.currentPlace().name);

  // computed list for list view
  self.filteredPlaces = ko.computed(function() {

    // clear and remove markers
    setAllMap(self.results(), null)
    self.results.removeAll();

    // set search string to regex
    var re = new RegExp(self.searchString(), "i");

   // push matching Markers to results
   for (var i = 0; i < self.placeList().length; i++) {
    if ( re.test(self.placeList()[i].name) ) {
      self.results.push(self.placeList()[i] );
    }
  }

  // add filtered map markers
  setAllMap(self.results(), map);
  //console.log(self.results());
  return self.results();

  });


  self.doSomething = function(place) {
    self.currentPlace(place);
    //console.log("Name: " + place.name);
    console.log("Curent: " + self.currentPlace().name);
    map.panTo(place.myLatLng);
    infowindow.setContent(place.infoContent);
    infowindow.open(map, place.marker);
  };

};

var map;
var infowindow;
ko.applyBindings(new ViewModel());

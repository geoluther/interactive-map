
var initialPlaces = [
{
  name: "Bohemian Biergarten",
  LatLng: [40.0187011, -105.2792224]
},

{
  name: "Mountain Sun",
  LatLng: [40.0189209,-105.2748623]
},

{
  name: "License #1",
  LatLng: [40.019416, -105.2794457]
},

{
  name: "The Black Cat Bistro",
  LatLng: [40.01786,-105.278416]
},

{
  name: "Boulder Theater",
  LatLng: [40.019059,-105.277234]
}
];

var map;
var markers = [];

function initialize(currentPlace) {

  var myCenter = new google.maps.LatLng(currentPlace.lat, currentPlace.lng);

  var mapProp = {
    center: myCenter,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

}

function Marker(data) {

  this.myLatLng  = new google.maps.LatLng(data.lat, data.lng);

  var marker = new google.maps.Marker({
    position: this.myLatLng,
    map: map,
    title: data.name,
  });
}

function Location(data) {

  this.name = data.name;
  this.lat = data.LatLng[0];
  this.lng = data.LatLng[1];

}

var ViewModel = function() {

  var self = this;

  self.placeList = ko.observableArray([]);
  self.placeListOb = ko.observableArray([]);
  self.searchString = ko.observable("");
  self.markers = ko.observableArray([]);

  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new Location(placeItem));
  });

  // set map center to first item in places
  // change when new item clicked ??
  self.currentPlace = ko.observable(self.placeList()[0]);
  console.log(self.currentPlace().name);

  self.placeListOb = ko.computed(function() {
    this.results =  [];
    var re = new RegExp(self.searchString(), "i");
      //console.log(re);
      for (var i = 0; i < self.placeList().length; i++) {
        if ( re.test(self.placeList()[i].name) ) {
          self.results.push(self.placeList()[i] );
        }
        
        self.markers = [];
        this.results.forEach( function(loc) {
          self.markers.push(new Marker(loc));
        });

        console.log( this.results);
      }
      return this.results;
    }, self);



  self.doSomething = function(place) {
    self.currentPlace(place);
    console.log("Name: " + place.name);
    console.log("Curent: " + self.currentPlace().name);
  };

google.maps.event.addDomListener(window, 'load', initialize(self.currentPlace()));

};


// from https://developers.google.com/maps/documentation/javascript/examples/marker-remove
// Add a marker to the map and push to the array.

function addMarker(location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

ko.applyBindings(new ViewModel());



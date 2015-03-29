
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
  name: "License #1",
  LatLng: [40.019416, -105.2794457]
},

{
  name: "The Black Cat Bistro",
  LatLng: [40.01786,-105.278416]
},
{
  name: "Oak at 14th",
  LatLng: [40.018214, -105.276970]
},

{
  name: "Boulder Theater",
  LatLng: [40.019059,-105.277234]
}
];

var map;

function initialize() {

  var myCenter = new google.maps.LatLng(initialPlaces[0].LatLng[0], initialPlaces[0].LatLng[1]);

  var mapProp = {
    center: myCenter,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

}

function Marker(data) {

  this.name = data.name;
  this.lat = data.lat;
  this.lng = data.lng;

  this.myLatLng  = new google.maps.LatLng(this.lat, this.lng);

  var marker = new google.maps.Marker({
    position: this.myLatLng,
    title: this.name,
  });

}

function Location(data) {

  this.name = data.name;
  this.lat = data.LatLng[0];
  this.lng = data.LatLng[1];

  this.myLatLng  = new google.maps.LatLng(this.lat, this.lng);

  this.marker = new google.maps.Marker({
    position: this.myLatLng,
    title: this.name,
  });

}

function setAllMap(locations, map) {
    for (var i = 0; i < locations.length; i++){
        locations[i].marker.setMap(map);
    }
}

var ViewModel = function() {

  google.maps.event.addDomListener(window, 'load', initialize());

  var self = this;

  self.placeList = ko.observableArray([]);
  self.placeListOb = ko.observableArray([]);
  self.searchString = ko.observable("");
  self.results =  ko.observableArray([]);

  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new Location(placeItem));
  });

  self.currentPlace = ko.observable(self.placeList()[0]);
  console.log(self.currentPlace().name);

  // computed list for list view
  self.placeListOb = ko.computed(function() {

    // reset markers and clear objects
    setAllMap(self.results(), null)
    self.results.removeAll();

    // push matching locations to results
    var re = new RegExp(self.searchString(), "i");
      for (var i = 0; i < self.placeList().length; i++) {
        if ( re.test(self.placeList()[i].name) ) {
          self.results.push(self.placeList()[i] );
        }
      }

      // add filtered map markers
      setAllMap(self.results(), map)
      console.log(self.results() );

      return self.results();
    }, self);

  self.doSomething = function(place) {
    self.currentPlace(place);
    console.log("Name: " + place.name);
    console.log("Curent: " + self.currentPlace().name);
  };

};


ko.applyBindings(new ViewModel());



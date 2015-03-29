
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

  // console.log(marker)
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

  self.placeListOb = ko.computed(function() {

    // reset markers
     for (var i = 0; i < self.results().length; i++){
        console.log(this.results()[i]);
        self.results()[i].marker.setMap(null);
      }

    // clear results array
    self.results.removeAll();

    var re = new RegExp(self.searchString(), "i");
      //console.log(re);
      for (var i = 0; i < self.placeList().length; i++) {
        if ( re.test(self.placeList()[i].name) ) {
          self.results.push(self.placeList()[i] );
        }
      }

      for (var i = 0; i < self.results().length; i++){
        console.log(this.results()[i]);
        self.results()[i].marker.setMap(map);
      }

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




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

function initialize(currentPlace) {

  var myCenter = ko.observable(new google.maps.LatLng(currentPlace.lat, currentPlace.lng));

  var mapProp = {
    center: myCenter(),
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

}

var addMarkers = function(items) {
  for (var i = 0; i < items.length; i++) {
    var name = items[i].name;
    var lat =  items[i].lat;
    var lng =  items[i].lng;
    console.log("marker loop name: " + name);
    var myLatLng  = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: name,
    });
  }
}

var Marker = function(item) {
    var name = item.name;
    var lat =  items.lat;
    var lng =  items.lng;

    var myLatLng  = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: name,
    });
  }

var Location = function(data) {
  this.name = data.name;
  this.lat = data.LatLng[0];
  this.lng = data.LatLng[1];
};

var ViewModel =  function() {

  var self = this;

  self.placeList = ko.observableArray([]);
  self.placeListOb = ko.observableArray([]);
  self.searchString = ko.observable("");

  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new Location(placeItem) );
  });

  self.currentPlace = ko.observable(self.placeList()[0]);
  console.log(self.currentPlace().name);

  self.placeListOb = ko.computed(function() {
    this.results =  [];
    var re = new RegExp(self.searchString(), "i");
      //console.log(re);
      for (var i = 0; i < self.placeList().length; i++) {
        if ( re.test(self.placeList()[i].name) ) {
          this.results.push(self.placeList()[i]);
        }
        console.log( this.results );
      }
      return this.results;
    }, this);


  this.doSomething = function(place) {
    self.currentPlace(place);
    console.log("Name: " + place.name);
    console.log("Curent: " + self.currentPlace().name);
  };

  
  google.maps.event.addDomListener(window, 'load', initialize(self.currentPlace() ));
  addMarkers(self.placeListOb());
};


ko.applyBindings(new ViewModel());



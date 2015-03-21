
var myCenter = new google.maps.LatLng(48.1484973,11.5727348);

function initialize() {
  var mapProp = {
    center: myCenter,
    zoom: 5,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  var marker = new google.maps.Marker({
    position: myCenter,
  });

  marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);


var initialPlaces = [
{
  name: "Bohemian Biergarten",
  LatLng: [48.1484973, 11.5727348]
},

{
  name: "Lazy Dog",
  LatLng: [48.1484973, 11.5727348]
},

{
  name: "License #1",
  LatLng: [48.1484973, 11.5727348]
},

{
  name: "The Sundown Saloon",
  LatLng: [48.1484973, 11.5727348]
},

{
  name: "Boulder Theater",
  LatLng: [48.1484973, 11.5727348]
}
];


var Location = function(data) {
  this.name = data.name;
  this.lat = data.LatLng[0];
  this.lng = data.LatLng[1];
};


var ViewModel =  function() {

  var self = this;

  this.placeList = ko.observableArray([]);

  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new Location(placeItem) );
  });

  this.doSomething = function(place){
    console.log(place.name);
  }



};

ko.applyBindings(new ViewModel());




var myCenter = new google.maps.LatLng(40.019059,-105.277234);

function initialize() {
  var mapProp = {
    center: myCenter,
    zoom: 16,
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
  LatLng: [40.0187011,-105.2792224]
},

{
  name: "Mountain Sun",
  LatLng: [40.019059,-105.277234]
},

{
  name: "License #1",
  LatLng: [40.019416,-105.2794457]
},

{
  name: "The Black Cat Bistro",
  LatLng: [40.0178096,-105.2789281]
},

{
  name: "Boulder Theater",
  LatLng: [40.019059,-105.277234]
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
  this.searchString = ko.observable("");

  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new Location(placeItem) );
  });

  this.doSomething = function(place){
    console.log(place.name);
  }

};

ko.applyBindings(new ViewModel());



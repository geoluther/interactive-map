


function initialize(currentPlace) {

  var myCenter = new google.maps.LatLng(currentPlace.lat, currentPlace.lng);

  var mapProp = {
    center: myCenter,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);

  for (var i = 0; i < initialPlaces.length; i++) {

    var name = initialPlaces[i].name;
    var loc =  initialPlaces[i].LatLng;
    var myLatLng  = new google.maps.LatLng(loc[0], loc[1]);

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: name,
    });
  }
}


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
    LatLng: [40.018012,-105.2781439]
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

  this.currentPlace = ko.observable(this.placeList()[0]);

  console.log(this.currentPlace().name);

  this.fliteredItems = ko.computed(function() {
        var re = new RegExp(this.searchString(), "i");
        console.log(re);
    }, this);

  this.doSomething = function(place) {
    self.currentPlace(place);
    console.log("Name: " + place.name);
    console.log("Curent: " + self.currentPlace().name);

  }

  google.maps.event.addDomListener(window, 'load', initialize(this.currentPlace()) );

};

ko.applyBindings(new ViewModel());



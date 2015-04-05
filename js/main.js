
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
var infowindow;

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

  self.infoWindowContent = data.name + '<img src="https://placeimg.com/120/80/any">';
  self.infoContent = data.name + '<br><img src="https://maps.googleapis.com/maps/api/streetview?size=120x80&location=' + data.LatLng[0] + ',' + data.LatLng[1] + '"">';

  self.marker = new google.maps.Marker({
    position: self.myLatLng,
    title: self.name
  });

  console.log(self.infoWindowContent);

  google.maps.event.addListener(self.marker, 'click', function() {
    infowindow.setContent(self.infoContent);
    infowindow.open(map, self.marker);
  });

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
  self.placeListOb = ko.observableArray([]);
  self.searchString = ko.observable("");
  self.results =  ko.observableArray([]);

  // load all places into ko array
  initialPlaces.forEach(function(placeItem) {
    self.placeList.push(new Marker(placeItem));
  });

  self.currentPlace = ko.observable(self.placeList()[0]);
  console.log(self.currentPlace().name);

  // computed list for list view
  self.placeListOb = ko.computed(function() {

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
    console.log(self.results());
    return self.results();
  }, self);


  self.doSomething = function(place) {
    self.currentPlace(place);
    console.log("Name: " + place.name);
    console.log("Curent: " + self.currentPlace().name);
    map.panTo(place.myLatLng);
    infowindow.setContent(place.infoContent);
    infowindow.open(map, place.marker);
  };

};

ko.applyBindings(new ViewModel());

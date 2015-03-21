
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


var model = [
  {
    name: "My Favorite Restaurant",
    LatLng: ["48.1484973", "11.5727348"]
  },

  {
    name: "My Other Favorite Restaurant",
    LatLng: ["49.1484973", "11.5727348"]
  },

  {
    name: "Boulder Theater",
    LatLng: ["40.0191931", "-105.2772349"]

  }
];

var Location = function() {

};
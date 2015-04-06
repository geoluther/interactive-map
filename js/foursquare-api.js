// foursquare.js

var myCenter=new google.maps.LatLng(51.508742,-0.120850);

  function initialize() {
    var mapProp = {
      center:myCenter,
      zoom:5,
      mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

    var marker=new google.maps.Marker({
      position:myCenter,
    });

    marker.setMap(map);

    var infowindow = new google.maps.InfoWindow({
      content:"Hello World!"
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }

var fourSquare = function() {
	// auth
	var urlBase = "https://api.foursquare.com/v2/venues/";
	var search = "search?ll=40.7,-74"; // latlng format
	var search2 = "search?query=MountainSun&near=Boulder,CO";
	var CLIENT_ID = "&client_id=YXBLYUHB43G3YFFFK23AAOO3EXF5KOENLRI5KFLOAE5U3W4E";
	var CLIENT_SECRET = "&client_secret=VOZ5OM12A1RN5BAFHQOUXN1ZTBSTBZ4V5TWAUIDG2G5MZILH";
	var version = "&v=20150406";
	var authString = CLIENT_ID + CLIENT_SECRET + version; 
	
	// fill in these vars
	var url = urlBase + search2 + authString;

	$.getJSON(url, function(data) {
		console.log(data);
		//console.log(data.meta.code);
		//console.log(data.response.venues[0].name);
		
		for (var i = 0;	i < data.response.venues.length ; i++) {
			var name = data.response.venues[i].name;
			var url = data.response.venues[i].url;
			var listItem = "<a href=" + url + "><li>" + name + "</li></a>";
			if (!url) {
				listItem = "<li>" + name + "</li>";
			}
			// console.log(url);
			$('#foursquare').append(listItem);
		}
	});

	var VENUE_ID = "479b612df964a520694d1fe3";
	var tipURL = "https://api.foursquare.com/v2/venues/" + VENUE_ID + "/tips?sort=recent" + authString;

	$.getJSON(tipURL + authString, function(data){
		console.log(data);
		var tipText = "<h4><em>" + data.response.tips.items[3].text + "</em></h4>";
		$('#tip').append(tipText);
	});
};

$(function() {
    console.log( "document ready!" );
  	google.maps.event.addDomListener(window, 'load', initialize);
    fourSquare();
});
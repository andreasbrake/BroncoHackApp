
function initialize() {
	var latitude
	var longitude

	var map_canvas = document.getElementById('map_canvas');

	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(initPosition, noPosition);
	}

	function noPosition(){
		alert("Current Location not available");
		var mapOptions = {
			center: new google.maps.LatLng(37.616494, -121.856501),
			zoom: 9,
			mapTypeId: google.maps.MapTypeId.HYBRID
		}
		var map = new google.maps.Map(map_canvas,mapOptions);
	}


	function initPosition(position){
		latitude = position.coords.latitude
		longitude = position.coords.longitude
		console.log(latitude)
		var mapOptions = {
			center: new google.maps.LatLng(latitude,longitude),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.HYBRID
		}

		

		var map = new google.maps.Map(map_canvas,mapOptions);
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
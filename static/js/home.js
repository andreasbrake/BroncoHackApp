
function initialize() {
	var latitude
	var longitude

	var map_canvas1 = document.getElementById('map_canvas');
	var map_canvas2 = document.getElementById('reportMap_canvas');

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
		var map = new google.maps.Map(map_canvas1,mapOptions);
		var reportMap = new google.maps.Map(map_canvas2,mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(37.616494, -121.856501),
			map: reportMap,
			draggable:true,
			title: 'Report Location'
		});
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

		var map = new google.maps.Map(map_canvas1,mapOptions);
		var reportMap = new google.maps.Map(map_canvas2,mapOptions);
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(latitude,longitude),
			map: reportMap,
			draggable:true,
			title: 'Report Location'
		});
	}
}


google.maps.event.addDomListener(window, 'load', initialize);
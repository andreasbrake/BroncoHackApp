var entries
var marker
var pins

var gen_map_canvas
var report_canvas

$(document).ready(function(){
	entries = getEntries().entries
	alert(entries)
})
google.maps.event.addDomListener(window, 'load', initMaps);
function initMaps(){
	gen_map_canvas = document.getElementById('map_canvas');
	report_canvas = document.getElementById('reportMap_canvas');

	initialize(gen_map_canvas,false)
}
function initReports(){
	initialize(report_canvas,true)
}
function initialize(map_canvas,report) {
	var latitude
	var longitude

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
		savePosition(latitude,longitude)

		if(report){
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(37.616494, -121.856501),
				map: map,
				draggable:true,
				title: 'Report Location'
			});
			google.maps.event.addListener(marker,'dragend',function(event) {
				savePosition(this.position.lat(),this.position.lng())
				alert('Drag end');
			});
		}
		else{
			addAllPins(map)
		}
	}


	function initPosition(position){
		latitude = position.coords.latitude
		longitude = position.coords.longitude
		var mapOptions = {
			center: new google.maps.LatLng(latitude,longitude),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.HYBRID
		}

		var mapOptions2 = {
			center: new google.maps.LatLng(latitude,longitude),
			zoom: 17,
			mapTypeId: google.maps.MapTypeId.HYBRID
		}

		var map = new google.maps.Map(map_canvas,mapOptions);

		savePosition(latitude,longitude)

		if(report){
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude,longitude),
				map: map,
				draggable:true,
				title: 'Report Location'
			});
			google.maps.event.addListener(marker,'dragend',function(event) {
				savePosition(this.position.lat(),this.position.lng())
			});
		}
		else{
			addAllPins(map)
		}
	}
}

function savePosition(lat,long){
	document.getElementById("location").value= lat + ',' + long
}

	google.maps.event.addDomListener(window, 'load', initialize);
})


function addAllPins(map){
	pins = []
		for(var i = 0; i < entries.length ; i++){
			if(entries[i].status != 'resolved' ||  Date.now() - entries[i].date < 15778500000)
				var cur = entries[i];
				var temp = new google.maps.Marker({
						position: new google.maps.LatLng(cur.location[0],cur.location[1]),
						map: map,
						title: cur.reportType
					})
					temp.setValues({reportType: cur.reportType, 
						reportCount: cur.reportCount,
						status: cur.status,
						images: cur.images,
						description: cur.description,
						datetime: cur.datetime});
					google.maps.event.addListener(temp, 'click', function() {
						document.getElementById("type").innerHTML = temp.get("reportType")
						document.getElementById("count").innerHTML = temp.get("reportCount")
						document.getElementById("descr").innerHTML = temp.get("description")
						document.getElementById("date").innerHTML = temp.get("datetime")
						document.getElementById("pic").src = temp.get("images")
					});
				pins.push(
					temp
				)	
		}
	}
}
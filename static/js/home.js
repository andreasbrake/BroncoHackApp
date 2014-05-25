var entries
var marker
var pins

var latitude
var longitude

var gen_map_canvas
var report_canvas

$(document).ready(function(){
	entries = getEntries().entries
	console.log('home.js not necissarily broken')
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

function useCurrentLocation(){
	if(document.getElementById("locationCheckbox")!=null){
		console.log(latitude)
		savePosition(latitude,longitude)
	}
}

function addAllPins(map){
	for(var i = 0; i < entries.length ; i++){
		if(entries[i].status != 'resolved' ||  Date.now() - entries[i].date < 15778500000){
			var cur = entries[i];
			var icon
			switch(cur.reportType){
				case "police" : icon = "/img/police2.png"; break;
				case "earthquakes" : icon = "/img/earthquakes1.png"; break;
				default : icon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
			}
			console.log(icon)
			var temp = new google.maps.Marker({
					position: new google.maps.LatLng(cur.location[0],cur.location[1]),
					map: map,
					icon: icon,
					title: cur.reportType
				})
			if (cur.reportType != "police"){
				temp.setZIndex(-1);
			}
			setupMarkerMeta(temp,cur)
		}
	}
}

function setupMarkerMeta(pin,data){
	pin.setValues({
		reportType: data.reportType, 
		reportCount: data.reportCount,
		status: data.status,
		images: data.images,
		description: data.description,
		datetime: data.datetime});
	google.maps.event.addListener(pin, 'click', function() {
		expandPinInfo()
		changeData(pin)
	});
}
function expandPinInfo(){
	$('#map_canvas').css("width","88%")
	$('#pin_info').css("right","-5%")
}
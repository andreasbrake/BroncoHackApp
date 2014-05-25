var entries
var marker
var pins

$(document).ready(function(){
	entries = getEntries().entries
	alert(entries)

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
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(37.616494, -121.856501),
				map: reportMap,
				draggable:true,
				title: 'Report Location'
			});
			savePosition(latitude,longitude)
			addAllPins(map)
			google.maps.event.addListener(marker,'dragend',function(event) {
				savePosition(this.position.lat(),this.position.lng())
				alert('Drag end');
			});
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

			var map = new google.maps.Map(map_canvas1,mapOptions);
			var reportMap = new google.maps.Map(map_canvas2,mapOptions2);
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude,longitude),
				map: reportMap,
				draggable:true,
				title: 'Report Location'
			});
			savePosition(latitude,longitude)
			addAllPins(map)
			google.maps.event.addListener(marker,'dragend',function(event) {
				savePosition(this.position.lat(),this.position.lng())
			});
		}
	}

	function savePosition(lat,long){
		document.getElementById("location").value= lat + ',' + long
	}

	function addAllPins(map){

		pins = []
		for(var i = 0; i < entries.length ; i++){
			console.log(entries[i].location[0])
			if(entries[i].status != 'resolved' ||  Date.now() - entries[i].date < 15778500000)
				var cur = entries[i];
				var temp = new google.maps.Marker({
						position: new google.maps.LatLng(cur.location[0],cur.location[1]),
						map: map,
						title: cur.reportType
					})
					temp.metadata = {reportType: cur.reportType, 
						reportCount: cur.reportCount,
						status: cur.status,
						images: cur.images,
						description: cur.description,
						datetime: cur.datetime}
				pins.push(
					temp
				)	
		}
	}
	google.maps.event.addDomListener(window, 'load', initialize);
})


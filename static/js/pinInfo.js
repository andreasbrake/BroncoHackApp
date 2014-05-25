var type = ""
var address = ""
var count = 0
var descriptions = []
var dates = []
var images = []
var currIndex = 0

function changeData(pin){
	var geocoder = new google.maps.Geocoder();

	type = pin.get("reportType")
	count = pin.get("reportCount")
	descriptions = pin.get("description")
	dates = pin.get("datetime")
	images = pin.get("images")

	geocoder.geocode({'latLng': pin.position}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			address=results[0].formatted_address;
			renderData(0)
		} else {
			alert("Geocoder failed due to: " + status);
		}
	});
	
}
function getNext(){
	if(currIndex < count - 1)
		renderData(currIndex + 1)
}
function getPrevious(){
	if(currIndex > 0)
		renderData(currIndex - 1)
}
function renderData(index){
	document.getElementById("type").innerHTML = type
	document.getElementById("address").innerHTML = address.substring(0,address.length-5)
	document.getElementById("count").innerHTML = count
	document.getElementById("descr").innerHTML = descriptions[index]
	var date = new Date(dates[index])
	document.getElementById("date").innerHTML = date.toLocaleDateString() + " " +  date.toLocaleTimeString()
	document.getElementById("pic").src = "/img/user_uploads/" + images[index]

	currIndex = index
}
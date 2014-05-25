var type = ""
var status = ""
var address = ""
var count = 0
var descriptions = []
var dates = []
var images = []
var currIndex = 0

var currPin = {}

function changeData(pin){
	var geocoder = new google.maps.Geocoder();

	type = pin.get("reportType")
	status = pin.get("status")
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
	document.getElementById("status").innerHTML = status
	document.getElementById("address").innerHTML = address.substring(0,address.length-5)
	document.getElementById("count").innerHTML = count
	document.getElementById("descr").innerHTML = descriptions[index]
	var date = new Date(dates[index])
	document.getElementById("date").innerHTML = date.toLocaleDateString() + " " +  date.toLocaleTimeString()
	document.getElementById("pic").src = "/img/user_uploads/" + images[index]
	loadStatusDropdown()

	currIndex = index

}
function loadStatusDropdown(){
	var permission = getPermission()
	var div = document.getElementById('changeStatus');

	if(permission != "0"){
		div.innerHTML = "<br><h>Choose new Status</h>"+
			"<form action='/map' method='POST'>"+
				"<input type='hidden' name='images' value='" + images + "'></input>" +
				"<select name='newStatus'required>"+
					"<option value='unresolved'>Unresolved</option>"+
					"<option value='inProgress'>In Progress</option>"+
					"<option value='resolved'>Resolved</option>"+
					"<option value='spam'>Spam</option>"+
				"</select>"+
				"<input type='submit' value'change status'></input>"
			"</form>"
	}
}
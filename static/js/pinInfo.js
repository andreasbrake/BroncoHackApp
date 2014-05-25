var type = ""
var count = 0
var descriptions = []
var dates = []
var images = []
var currIndex = 0

function changeData(pin){
	type = pin.get("reportType")
	count = pin.get("reportCount")
	descriptions = pin.get("description")
	dates = pin.get("datetime")
	images = pin.get("images")

	renderData(0)
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
	document.getElementById("count").innerHTML = count
	document.getElementById("descr").innerHTML = descriptions[index]
	var date = new Date(dates[index])
	document.getElementById("date").innerHTML = date.toLocaleDateString()
	document.getElementById("pic").src = images[index]

	currIndex = index
}
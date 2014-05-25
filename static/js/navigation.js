$(document).ready(function(){
	console.log('ready')

	$('#report-tab').click(function(){
		$('#report').css("left","0%")
		$('#map_canvas').css("left","200%")
	})
	$('#map-tab').click(function(){
		$('#report').css("left","-200%")
		$('#map_canvas').css("left","0%")
	})
})
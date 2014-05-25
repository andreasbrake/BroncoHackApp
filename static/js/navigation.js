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
	$('#locationCheckbox').change(function(){
		var currHeight = $('#reportMap_canvas').css('height')

		console.log(currHeight)
		if(currHeight == '0px')
			$('#reportMap_canvas').css('height','400px')
		else
			$('#reportMap_canvas').css('height','0px')	
	})

})
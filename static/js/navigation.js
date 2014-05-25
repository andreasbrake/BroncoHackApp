$(document).ready(function(){
	console.log('ready')
	var loaded = false;

	$('#report-tab').click(function(){
		$('.backpane').css("left","15%")
		$('#report').css("left","15%")
		$('#map').css("left","200%")
	})
	$('#map-tab').click(function(){
		$('.backpane').css("left","-200%")
		$('#report').css("left","-200%")
		$('#map').css("left","5%")
	})
	$('#locationCheckbox').change(function(){
		var currHeight = $('#reportMap_canvas').css('height')

		console.log(currHeight)
		if(currHeight == '0px'){
			$('.location').css('height','50%')
			$('#reportMap_canvas').css('height','85%')
		}
		else{
			$('.location').css('height','5%')
			$('#reportMap_canvas').css('height','0px')	
		}

		if(!loaded){
			setTimeout(function(e){
				initReports()
				loaded = true;
			},200)
		}
		
	})

})
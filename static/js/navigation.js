$(document).ready(function(){
	console.log('ready')
	var loaded = false;
	loadHeader()

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

		if(currHeight == '0px'){
			$('.location').css('height','auto')
			$('#reportMap_canvas').css('height','50%')
			$('#reportMap_canvas').css('min-height','280px')
		}
		else{
			$('.location').css('height','5%')
			$('#reportMap_canvas').css('height','0px')	
			$('#reportMap_canvas').css('min-height','0px')

		}

		if(!loaded){
			setTimeout(function(e){
				initReports()
				loaded = true;
			},200)
		}
	})
	$('#info_back').click(function(){
		getPrevious()
	})
	$('#info_next').click(function(){
		getNext()
	})
	$('#login-button').click(function(){
		$('#login-form').css('top','0px')
	})
	$('.mask').click(function(){
		$('#login-form').css('top','-200%')
	})
	$('#login-cancel').click(function(){
		$('#login-form').css('top','-200%')
	})
	$('#logout-button').click(function(){
		window.location = '/logout'
	})
	$('#info_close').click(function(){
		$('#map_canvas').css("width","100%")
		$("#pin_info").css("left","180%")
		$("#pin_info").css("right","-100%")
		$("#pin_info").css("width","-20%")
	})

	function loadHeader(){
		var username = getUser()
		var div = document.getElementById('login');

		if(username == "" ){
			if($(window).width() >= 500)
				div.innerHTML = "<button id='login-button'> login </button><br><h>you aren't logged in</h>"
			else
				div.innerHTML = "<h>you aren't logged in</h><button id='login-button'> login </button>"
		}
		else{
			if($(window).width() >= 500)	
				div.innerHTML = "<button id='logout-button'> logout </button><br><h>welcome, " + username + " </h>"
			else
				div.innerHTML = "<h>welcome, " + username + " </h><button id='logout-button'> logout </button>"
		}
	}
})
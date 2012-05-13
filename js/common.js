$(document).ready (function(){
	
	var dw = $(document).outerWidth();
	
	
	function resizeInput () {
		if (dw > 960) {
			dw = $('.b-contactsContainer').outerWidth();
			$('.b-contacts__input').css('width', dw-170);
		}
		else {
			$('.b-contacts__input').css('width', dw-118);
		}
		
	}
	
	resizeInput();
	
	
});

$(window).resize(function(){
		resizeInput();
	})

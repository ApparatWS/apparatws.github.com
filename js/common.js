$(document).ready (function(){

	function resizeInput () {
		var dw = $(document).outerWidth();
		if (dw > 960) {
			dw = $('.b-contactsContainer').outerWidth();
			$('.b-contacts__input').css('width', dw-170);
		}
		else {
			$('.b-contacts__input').css('width', dw-118);
		}
	}
	
	$(window).resize(function(){
		resizeInput();
	});
	
	function showPage(){
		var page = $('.b-mainNav__list').find('.m-active_item').data('page');
		if (page == 'about') $('.b-aboutContainer').show()
		else if (page == 'faq') $('.b-faqContainer').show()
		else if (page == 'contact') {$('.b-contactsContainer').show(); resizeInput();}
		else if (page == 'service') $('.b-serviceCheckContainer').show();
		}
	showPage();
	
	$('.b-mainNav-list_item').on('click', function(){
		$(this).siblings().removeClass('m-active_item').end().addClass('m-active_item');
		$('.m-mainContent_containers').hide();
		showPage();
	});
	
	$('.b-faqContainer__link').on('click', function(){
		$(this).next().next().slideToggle();
		return false;
	});
	
});



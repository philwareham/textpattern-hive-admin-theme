$(function() {
	// The element.
	var $ui = $('.txp-search');
	
	// On focus and on click, display the dropdown and change the arrow image.
	$ui.find('[type="search"]').bind('focus click', function() {
		$ui.find('[type="search"]')
			.addClass('active')
			.andSelf()
			.find('.txp-search-dropdown')
			.show();
	});
	
	// On mouse-leave, hide the dropdown and change the arrow image.
	$ui.bind('mouseleave', function() {
		$ui.find('[type="search"]')
			.removeClass('active')
			.andSelf()
			.find('.txp-search-dropdown')
			.hide();
	});
	
	// Select all checkboxes
	$ui.find('.txp-search-dropdown').find('label[for="search-all"]').prev().bind('click', function() {
		$(this).parent().siblings().find(':checkbox')
			.attr('checked', this.checked)
			.attr('disabled', this.checked);
	});
});

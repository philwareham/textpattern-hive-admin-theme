$(function() {
	var $ui = $('.txp-search');

	// On focus and on click, display the search options and change the arrow image.
	$ui.find('[type="search"]').bind('focus click', function()
	{
		$ui.find('[type="search"]')
			.addClass('active')
			.addBack()
			.find('.txp-dropdown')
			.show();
	});

	// On mouse-leave, hide the search options and change the arrow image.
	$ui.bind('mouseleave', function()
	{
		$ui.find('[type="search"]')
			.removeClass('active')
			.addBack()
			.find('.txp-dropdown')
			.hide();
	});
});
$(function() {
	var $ui = $('.txp-search');

	// On focus or on click, display the search options and change the arrow image.
	$ui.find('[type="search"]').on('focus click', function()
	{
		$ui.find('[type="search"]')
			.addClass('active')
			.addBack()
			.find('.txp-dropdown')
			.show();
	});

	// On mouse-leave, hide the search options and change the arrow image.
	$ui.on('mouseleave', function()
	{
		$ui.find('[type="search"]')
			.removeClass('active')
			.addBack()
			.find('.txp-dropdown')
			.hide();
	});
});
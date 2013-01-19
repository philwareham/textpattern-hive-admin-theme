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



$(function()
{
	var $ui = $('.txp-search');

	$ui.find('.txp-search-criteria').on('click', function()
	{
		$ui.find('.txp-search-dropdown')
	}

	// Amended search version using jQuery UI
	$(".txp-search-criteria")
		.click(function ()
		{
			var menu = $(this).find('.txp-search-dropdown').next().next().show().position({
				my: "left top",
				at: "left bottom",
				of: this
			});

			$(document).one( "click", function ()
			{
				menu.hide();
			});

			return false;
		})
		.parent()
		.next()
		.hide()
		.menu();

});

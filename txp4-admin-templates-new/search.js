$(function()
{
	var $ui = $('.txp-search');
	var searchmenu = $ui.find('ul');

	$ui.find('.txp-search-criteria').on('click', function()
	{
		searchmenu.show();

		$(document).one("click", function()
		{
			searchmenu.hide();
		});

		return false;
	})

	searchmenu.hide();
});

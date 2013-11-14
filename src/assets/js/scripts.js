(function ()
{
    'use strict';

	// External links open new window (target="_blank" replacement)
	$('a[rel="external"]').on('click.hiveExternalLink', function (e)
	{
		e.preventDefault();
		window.open($(this).attr('href'));
	});
}());

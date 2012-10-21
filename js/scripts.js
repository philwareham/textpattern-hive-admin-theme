jQuery(function () {


	// To make select navigation menu work (via TinyNav)
	$('.untinynav').tinyNav({
		active: 'selected'
	});


	// External links open new window (target="_blank" replacement)
	$('[rel="external"]').click( function() {
		window.open( $(this).attr('href') );
		return false;
	});


});
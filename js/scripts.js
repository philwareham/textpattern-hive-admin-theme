jQuery(function () {


    // To make select navigation menu work
    $('#txp-nav-select select').change(function() {
        window.location = $(this).find('option:selected').val();
    });


    // External links open new window (target="_blank" replacement)
    $('[rel="external"]').click( function() {
        window.open( $(this).attr('href') );
        return false;
    });


    // Remove hardcoded align="center" from tables (hopefully this will be removed from HTML eventually)
    $('table#image-thumbnail').attr('align','left');


});
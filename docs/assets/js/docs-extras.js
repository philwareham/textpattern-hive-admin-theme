(function()
{
    'use strict';

    // Switch between Dark Mode/Light Mode manually.

    var bodyClass = document.querySelector('body'),
        lightSwitch = document.getElementById('lightswitch');

    lightSwitch.addEventListener('click', function(e)
    {
        if (bodyClass.classList.contains('darkmode')) {
            bodyClass.classList.remove('darkmode');
            localStorage.setItem('prefers-color-scheme', 'light');
        } else {
            bodyClass.classList.add('darkmode');
            localStorage.setItem('prefers-color-scheme', 'dark');
        }

        e.preventDefault();
    });

    // ScrollSpy.

    var spy = new ScrollSpy('main', {
        nav: '.design-patterns--menu ol > li > a',
        className: 'is-inview'
    });

    var subSpy = new ScrollSpy('main', {
    	nav: '.design-patterns--menu ol > li > ol > li > a',
    	className: 'is-inview'
    });

})();

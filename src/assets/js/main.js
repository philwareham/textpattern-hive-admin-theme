(function()
{
    'use strict';

    // Auto-growing textareas, via 'Autosize'.
    // More info - https://github.com/jackmoore/autosize.

    var fields = document.querySelectorAll('textarea:not(.code)');

    if (fields.length) {
        autosize(fields);
    }

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

})();

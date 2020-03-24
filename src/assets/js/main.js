(function()
{
    'use strict';

    // Switch between Dark Mode/Light Mode manually.

    var bodyClass = document.body.classList,
        lightSwitch = document.getElementById('lightswitch');

    if (null !== lightSwitch) {
        lightSwitch.addEventListener('click', function(e)
        {
            if (bodyClass.contains('darkmode')) {
                bodyClass.remove('darkmode');
                localStorage.setItem('prefers-color-scheme', 'light');
            } else {
                bodyClass.add('darkmode');
                localStorage.setItem('prefers-color-scheme', 'dark');
            }

            e.preventDefault();
        });
    }

})();

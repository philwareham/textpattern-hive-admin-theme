(function()
{
    'use strict';

    var bodyClass = document.querySelector('body'),
        isDark = window.matchMedia('screen and (prefers-color-scheme: dark)');

    // Check localStorage for Dark Mode/Light Mode preference.

    if (localStorage.getItem('prefers-color-scheme') === 'dark') {
        bodyClass.classList.add('darkmode');
    }

    // Detect and change Dark Mode/Light Mode (but only if no localStorage preference).

    function toggleDarkMode(isDark)
    {
        if (localStorage.getItem('prefers-color-scheme') === null) {
            if (isDark.matches) {
                bodyClass.classList.add('darkmode');
            } else {
                if (bodyClass.classList.contains('darkmode')) {
                    bodyClass.classList.remove('darkmode');
                }
            }
        }
    }

    toggleDarkMode(isDark);
    isDark.addListener(toggleDarkMode);

})();

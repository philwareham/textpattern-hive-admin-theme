(function()
{
    'use strict';

    // Auto-growing textareas, via 'Autosize'.
    // More info - https://github.com/jackmoore/autosize.

    var fields = document.querySelectorAll('textarea:not(.code)');

    if (fields.length) {
        autosize(fields);
    }

})();

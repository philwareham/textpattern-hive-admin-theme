$(function ()
{
    'use strict';
    autosize($('textarea:not(.code)'));
});

const DARK = '(prefers-color-scheme: dark)'
const LIGHT = '(prefers-color-scheme: light)'

function changeWebsiteTheme(scheme) {
   // 'dark' or 'light' string is in scheme here
   // so the website theme can be updated
}

function detectColorScheme() {
    if (!window.matchMedia) {
        return
    }

    function listener({matches, media}) {
        if (!matches) { // Not matching anymore = not interesting
            return
        }
        if (media === DARK) {
            changeWebsiteTheme('dark')
        } else if (media === LIGHT) {
            changeWebsiteTheme('light')
        }
    }

    const mqDark = window.matchMedia(DARK)
    mqDark.addListener(listener)
    const mqLight = window.matchMedia(LIGHT)
    mqLight.addListener(listener)
}

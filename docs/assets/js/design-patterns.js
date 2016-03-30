// This example file is used to demonstrate all available jQuery UI components
// on the design patterns page.

$(function ()
{
    // Spoof RTL on English language `label` tags.
    // This isn't needed when viewing in proper RTL languages.

    $('[dir="rtl"] label').attr('dir', 'rtl');

    // jQuery UI interactions.

    // Draggable.

    $('.jquery-ui-draggable').draggable({
        cursor: 'move'
    });

    // Resizable.

    $('.jquery-ui-resizable').resizable({
        minWidth: 200
    });

    // Selectable.

    $('.jquery-ui-selectable').selectable();

    // Sortable.

    $('.jquery-ui-sortable').sortable({
        placeholder: 'ui-sortable-placeholder',
        cursor: 'ns-resize'
    }).disableSelection();

    // jQuery UI widgets.

    // Accordion.

    $('.jquery-ui-accordion').accordion({
        header: 'h3'
    });

    // Accordion RTL.
    // Flip positioning of accordion state icons when in RTL langauges.

    $('[dir="rtl"] .jquery-ui-accordion').accordion({
        icons: {
            'header': 'ui-icon-triangle-1-w',
            'activeHeader': 'ui-icon-triangle-1-s'
        }
    });

    // Autocomplete.

    var countryList = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic', 'Congo, Republic of the', 'Costa Rica', 'Cote d’Ivoire', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Greenland', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, North', 'Korea, South', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Mongolia', 'Morocco', 'Monaco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Samoa', 'San Marino', ' Sao Tome', 'Saudi Arabia', 'Senegal', 'Serbia and Montenegro', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'];
    $('#autocomplete-country').autocomplete({
        source: countryList
    });

    // Button.

    $('.jquery-ui-button').button();

    // Icon button.

    $('.jquery-ui-button-icon-only').button({
        icons: {
            primary: 'ui-icon-locked'
        },
        text: false
    });
    $('.jquery-ui-button-icon-left').button({
        icons: {
            primary: 'ui-icon-locked'
        }
    });
    $('.jquery-ui-button-icon-right').button({
        icons: {
            secondary: 'ui-icon-gear'
        }
    });
    $('.jquery-ui-button-icon-two').button({
        icons: {
            primary: 'ui-icon-locked',
            secondary: 'ui-icon-disk'
        }
    });
    $('.jquery-ui-button-icon-two-only').button({
        icons: {
            primary: 'ui-icon-locked',
            secondary: 'ui-icon-disk'
        },
        text: false
    });

    // Split button.

    $('#split-rerun-example')
        .button()
        .click(function ()
        {
            alert('Running the last action');
        })
        .next()
        .button({
            text: false,
            icons: {
                primary: 'ui-icon-triangle-1-s'
            }
        })
        .click(function ()
        {
            var menu = $(this).parent().next().show().position({
                my: 'left top',
                at: 'left bottom',
                of: this
            });
            $(document).one('click', function ()
            {
                menu.hide();
            });
            return false;
        })
        .parent()
        .buttonset()
        .next()
        .hide()
        .menu();

    // Split button search example.

    var search = $('.txp-search');

    search.find('.txp-search-button').button({
        text: false,
        icons: {
            primary: 'ui-icon-search'
        }
    })
    .click(function ()
    {
        alert('Running the last action');
    });

    search.find('.txp-search-options').button({
        text: false,
        icons: {
            primary: 'ui-icon-triangle-1-s'
        }
    })
    .click(function (e)
    {
        var menu = search.find('.txp-dropdown').toggle().position({
            my: 'right top',
            at: 'right bottom',
            of: this
        });
        $(document).one('click blur', function ()
        {
            menu.hide();
        });
        return false;
    });

    search.find('.txp-search-buttons').buttonset();

    search.find('.txp-dropdown').hide().menu().click(function(e) {
        e.stopPropagation();
    });

    // Checkboxradio.

    $('.jquery-ui-checkboxradio-checkbox input').checkboxradio({
        //icon: false
    });

    $('.jquery-ui-checkboxradio-radio input').checkboxradio();

    // Controlgroup.

    $('.jquery-ui-controlgroup').controlgroup();

    $('.jquery-ui-controlgroup-vertical').controlgroup({
        direction: 'vertical'
    });

    // Datepicker.

    $('.jquery-ui-datepicker').datepicker().children().show();

    // Dialog (basic).

    $('#jquery-ui-dialog').dialog({
        autoOpen: false
    });

    // Dialog (modal) link.

    $('#jquery-ui-dialog-link').click(function ()
    {
        $('#jquery-ui-dialog').dialog('open');
        return false;
    });

    // Dialog (modal).

    $('#jquery-ui-dialog-modal').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        buttons: {
            Cancel: function ()
            {
                $(this).dialog('close');
            },
            Ok: function ()
            {
                $(this).dialog('close');
            }
        }
    });

    // Dialog (modal) link.

    $('#jquery-ui-dialog-modal-link').click(function ()
    {
        $('#jquery-ui-dialog-modal').dialog('open');
        return false;
    });

    // Menu.

    $('.jquery-ui-menu').menu({
        position: {
            at: 'right top-1'
        }
    });

    // Menu RTL.
    // Flip positioning of submenus when in RTL langauges.

    $('[dir="rtl"] .jquery-ui-menu').menu({
        position: {
            my: 'right top',
            at: 'left top-1'
        },
        icons: {
            submenu: 'ui-icon-caret-1-w'
        }
    });

    // Progressbar.

    $('.jquery-ui-progressbar').progressbar({
        value: 37
    });

    // Progressbar (indeterminate).

    $('.jquery-ui-progressbar2').progressbar({
        value: false
    });

    $('.jquery-ui-progressbar-animate').click(function (event)
    {
        var randNum = Math.random() * 90;
        $('.jquery-ui-progressbar div').animate({
            width: randNum + '%'
        });
        event.preventDefault();
    });

    // Selectmenu.

    $('.jquery-ui-selectmenu').selectmenu();

    // Selectmenu RTL.
    // Flip positioning of selectmenu dropdowns when in RTL langauges.

    $('[dir="rtl"] .jquery-ui-selectmenu').selectmenu({
        position: {
            my: 'left top',
            at: 'right bottom'
        }
    });

    // Slider - horizontal.

    $('.jquery-ui-slider-horizontal').slider({
        range: true,
        values: [17, 67]
    });

    // Slider - vertical.

    $('.jquery-ui-slider-vertical > span').each(function ()
    {
        var value = parseInt($(this).text());
        $(this).empty().slider({
            value: value,
            range: 'min',
            animate: true,
            orientation: 'vertical'
        });
    });

    // Spinner.

    $('#jquery-ui-spinner').spinner({
        spin: function (event, ui)
        {
            if (ui.value > 10)
            {
                $(this).spinner('value', -10);
                return false;
            }
            else if (ui.value < -10)
            {
                $(this).spinner('value', 10);
                return false;
            }
        }
    });

    // Tabs.

    $('.jquery-ui-tabs').tabs();

    // Vertical tabs on preferences panel.

    var prefsGroup = $('#prefs_form');

    prefsGroup.tabs().removeClass('ui-widget ui-widget-content ui-corner-all').addClass('ui-tabs-vertical');
    prefsGroup.find('.switcher-list').removeClass('ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
    prefsGroup.find('.switcher-list li').removeClass('ui-state-default ui-corner-top');
    prefsGroup.find('.txp-prefs-group').removeClass('ui-widget-content ui-corner-bottom');

    // Tooltips.

    $('.jquery-ui-tooltip').tooltip();

});

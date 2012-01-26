<?php

if (!defined('txpinterface')) die('txpinterface is undefined.');

theme::based_on('classic');

class hive_theme extends classic_theme

{

    function html_head()
    {
        $out[] = '<link href="'.$this->url.'css/textpattern.css" rel="stylesheet" type="text/css"/>';
        $out[] = '<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1"/>';
        $out[] = '<script type="text/javascript" src="'.$this->url.'js/jquery.formalize.min.js"></script>';
        $out[] = '<!--[if lt IE 9]><script type="text/javascript" src="'.$this->url.'js/selectivizr.min.js"></script><![endif]-->';
        $out[] = '<script type="text/javascript" src="'.$this->url.'js/scripts.js"></script>';

        return join(n, $out);
    }

    function header()
    {
        global $txp_user;
        $out[] = '<div id="txp-head">';
        $out[] = '<h1><a href="'.hu.'" title="'.gTxt('tab_view_site').'" rel="external">'.$GLOBALS["prefs"]["sitename"].'</a></h1>';
        if ($txp_user)
        {
            $out[] = '<p id="txp-logout"><a href="index.php?logout=1" onclick="return verify(\''.gTxt('are_you_sure').'\')">'.gTxt('logout').'</a></p>';
            $out[] = '<div id="txp-nav">';
            $out[] = '<ul class="data-dropdown">';
            foreach ($this->menu as $tab)
            {
                $class = ($tab['active']) ? ' active' : ' inactive';
                $out[] = "<li class='dropdown{$class}'><a class='dropdown-toggle' href='#'>{$tab['label']}</a>";
                if (!empty($tab['items']))
                {
                    $out[] = '<ul class="dropdown-menu">';
                    foreach ($tab['items'] as $item)
                    {
                        $class = ($item['active']) ? 'active' : 'inactive';
                        $out[] = "<li class='{$class}'><a href='?event={$item['event']}'>{$item['label']}</a></li>";
                    }
                    $out[] = '</ul>';
                }
                $out[] = '</li>';
            }
            $out[] = '</ul>';
            $out[] = '</div>';
            $out[] = '<select id="txp-nav-select">';
            foreach ($this->menu as $tab)
            {
                $out[] = "<optgroup label='{$tab['label']}'>";
                if (!empty($tab['items']))
                {
                    foreach ($tab['items'] as $item)
                    {
                        $select = ($item['active']) ? ' selected="selected"' : '';
                        $out[] = "<option value='?event={$item['event']}'{$select}>{$item['label']}</option>";
                    }
                }
                $out[] = '</optgroup>';
            }
            $out[] = '<optgroup label="Content">';
            $out[] = '</select>';
        }
        $out[] = '</div>';
        $out[] = '<p id="messagepane">'.$this->announce($this->message).'</p>';
        return join(n, $out);
    }

    function footer()
    {
        $out[] = '<div id="txp-foot">';
        $out[] = '<p class="pagejump"><a href="#">&#8593; Back to top</a></p>';
        $out[] = '<p><a href="http://textpattern.com" title="Go to the Textpattern website" rel="external">Textpattern CMS</a> (v'.txp_version.')</p>';
        $out[] = '</div>';
        return join(n, $out);
    }

    function manifest()
    {
        global $prefs;
        return array(
            'author'      => 'Phil Wareham',
            'author_uri'  => 'http://twitter.com/philwareham',
            'version'     => '2.0a1',
            'description' => 'Textpattern Hive Theme',
            'help'        => 'http://textgarden.org/administration-themes/261/hive',
        );
    }

}

?>

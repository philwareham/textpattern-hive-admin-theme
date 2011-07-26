<?php

if (!defined('txpinterface')) die('txpinterface is undefined.');

theme::based_on('classic');

class hive_theme extends classic_theme

{

    function html_head()
    {
        $out[] = '<link href="'.$this->url.'textpattern.css" rel="stylesheet" type="text/css"/>';
        $out[] = '<meta name="viewport" content="width=device-width, target-densitydpi=160dpi, initial-scale=1">';
        $out[] = '<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Cousine">';
        $out[] = '<!--[if (gte IE 6)&(lte IE 8)]><script type="text/javascript" src="'.$this->url.'selectivizr.min.js"></script><![endif]-->';
        return join(n, $out);
    }

    function header()
    {
        global $txp_user;
        $out[] = '<div id="txp-head" class="clearfix">';
        $out[] = '<p id="mothership"><a href="http://textpattern.com" target="_blank">Textpattern</a></p>'; // Textpattern logo - delete this whole line if not required
        $out[] = '<h1><a href="'.hu.'" title="'.gTxt('tab_view_site').'" target="_blank">'.$GLOBALS["prefs"]["sitename"].'</a></h1>';
        if ($txp_user)
        {
            $out[] = '<ul id="txp-nav" class="clearfix">';
            foreach ($this->menu as $tab)
            {
                $class = ($tab['active']) ? 'active' : 'inactive';
                $out[] = "<li class='primary'><a class='primary-link' href='#'>{$tab['label']}</a>";
                if (!empty($tab['items']))
                {
                    $out[] = '<ul class="dropdown">';
                    foreach ($tab['items'] as $item)
                    {
                        $class = ($item['active']) ? 'active' : 'inactive';
                        $out[] = "<li class='{$class}'><a href='?event={$item['event']}'>{$item['label']}</a></li>";
                    }
                    $out[] = '</ul>';
                }
                $out[] = '</li>';
            }
            $out[] = '<li id="touch-menu-close"><a href="#">Close menu</a></li>';
            $out[] = '<li id="txp-logout" class="primary"><a class="primary-link" href="index.php?logout=1" onclick="return verify(\''.gTxt('are_you_sure').'\')">'.gTxt('logout').'</a></li>';
            $out[] = '</ul>';
        }
        $out[] = '</div>';
        $out[] = '<div id="txp-body">';
        $out[] = '<p id="messagepane">'.$this->announce($this->message).'</p>';
        $out[] = '<div id="txp-content">';
        return join(n, $out);
    }

    function footer()
    {
        $out[] = '</div>';
        $out[] = '</div>';
        return join(n, $out);
    }

    function manifest()
    {
        global $prefs;
        return array(
            'author'      => 'Phil Wareham',
            'author_uri'  => 'http://twitter.com/philwareham',
            'version'     => '1.3',
            'description' => 'Textpattern Hive Theme',
            'help'        => 'http://textgarden.org/administration-themes/261/hive',
        );
    }

}

?>

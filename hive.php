<?php

if (!defined('txpinterface')) die('txpinterface is undefined.');

class hive_theme extends theme

{

    function html_head()
    {
        $out[] = '<link href="'.$this->url.'css/textpattern.css" rel="stylesheet" type="text/css" />';
        $out[] = '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />';
        $out[] = '<meta name="apple-mobile-web-app-capable" content="yes" />';
        $out[] = '<meta name="generator" content="Textpattern CMS" />';
        $out[] = '<script type="text/javascript" src="'.$this->url.'js/modernizr.js"></script>';
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
                $out[] = "<li class='dropdown{$class}'><a class='dropdown-toggle' href='?event={$tab['event']}'>{$tab['label']}</a>";
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
            $out[] = '<div id="txp-nav-select">';
            $out[] = '<select>';
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
            $out[] = '</select>';
            $out[] = '</div>';
        }
        $out[] = '</div>';
        $out[] = '<div id="messagepane">'.$this->announce($this->message).'</div>';
        return join(n, $out);
    }

    function footer()
    {
        $out[] = '<div id="txp-foot">';
        $out[] = '<p class="mothership"><a href="http://textpattern.com" title="Go to the Textpattern website" rel="external">Textpattern CMS</a> (v'.txp_version.')</p>';
        $out[] = '<p class="pagejump"><a href="#">&#8593; Back to top</a></p>';
        $out[] = '</div>';
        return join(n, $out);
    }

	function announce($thing, $modal = false)
	{
		return $this->_announce($thing, false, $modal);
	}

	function announce_async($thing, $modal = false)
	{
		return $this->_announce($thing, true, $modal);
	}

	/* private */
	function _announce($thing, $async, $modal)
	{
		// $thing[0]: message text
		// $thing[1]: message type, defaults to "success" unless empty or a different flag is set

		if ($thing === '') return '';

		if (!is_array($thing) || !isset($thing[1]))	{
			$thing = array($thing, 0);
		}

		switch ($thing[1]) {
			case E_ERROR:
				$class = 'error';
				break;
			case E_WARNING:
				$class = 'warning';
				break;
			default:
				$class = 'success';
				break;
		}

		if ($modal) {
			$html = ''; // TODO: Say what?
			$js = 'window.alert("'.escape_js(strip_tags($thing[0])).'")';
		} else {
			$html = "<span id='message' class='$class'>".gTxt($thing[0]).'</span>';
			// Try to inject $html into the message pane no matter when _announce()'s output is printed
			$js = escape_js($html);
			$js = <<< EOS
		        $(document).ready( function(){
			        $("#messagepane").html("{$js}");
					$('#messagepane #message.error').fadeOut(800).fadeIn(800);
					$('#messagepane #message.warning').fadeOut(800).fadeIn(800);
				});
EOS;
		}
		if ($async) {
			return $js;
		} else {
			return script_js(str_replace('</', '<\/', $js), $html);
		}

	}

	function manifest()
    {
        global $prefs;
        return array(
            'author'      => 'Phil Wareham',
            'author_uri'  => 'http://twitter.com/philwareham',
            'version'     => '2.0a2',
            'description' => 'Textpattern Hive Theme',
            'help'        => 'http://textgarden.org/administration-themes/261/hive',
        );
    }

}

?>

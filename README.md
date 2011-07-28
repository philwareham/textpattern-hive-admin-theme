# Hive admin-side theme for Textpattern CMS

You are free to modify this theme, reuse code herein, and distribute all it's
supporting files - go wild! Please note that I've had to be a bit more 'creative' than
I'd usually like with the CSS, mainly because the core still has quite a bit of inline
CSS that needs to be disabled, hence the liberal use of '!important' on attributes.


## Installation instructions

1. Upload the directory 'hive' into your Textpattern installation -> theme directory.
2. Log in to your Textpattern admin area. Navigate to admin -> preferences -> advanced.
3. Select 'Hive' from the 'Admin-side theme' dropdown list. Save the preferences.
4. Log out and then log in again - you should now be using the Hive theme.
5. You can also install the theme easily using the 'smd_admin_themes' plugin.


## Usage instructions

If you want to remove the Textpattern logo branding and link from the header, simply
delete line 23 of 'hive.php'.

Within the 'custom.css' file you can choose between any of the supplied colourschemes,
simply amend the URL in line 7 to whichever colour option you desire.

Also within the 'custom.css' file, there are options to hide certain sections/fields
from displaying in the admin pages. To use any of the options uncomment their lines
(remove the /* and */ from the line of CSS you want to activate).

For example, to completely hide the keywords field from your admin-side, find this
line in the 'custom.css' file:

    /* #write-comments{display:none !important;} */

and change to:

    #write-comments{display:none !important;}


### One last thing...

In this theme, the 3 preview tabs on article write/article edit forms have been removed
to save screen estate. They were arguable pretty useless anyway so they were dropped,
we have never used them in all our time with Textpattern. If you really do want to
enable these tabs again then comment out the following line ~934 of the
theme's 'textpattern.css' file (you'll have to add some custom styling to them though):

    #article-tabs{display:none;}
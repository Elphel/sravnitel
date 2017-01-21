 
=== Plugin Name ===
Contributors: okdzhimiev
Donate link: -
Tags: images, posts, plugin, page, before after slider, visual composer, slider, shortcode, zoom, pan, drag
Requires at least: 4.5.5
Tested up to: 4.7.1
Stable tag: 1.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Before-After overlayed image comparison plugin with: slider, zoom, 2+ images.

== Description ==

Sravnitel is a WordPress plugin by Elphel Inc. based on a jQuery plugin *jquery.sravnitel.js*.

**Features**

* Compare 2+ images 
* Zoom and pan
* Initial zoom and offset

**Notes**

* No mobile support - touch/pinch

**Quick examples**

* Fit image into the view window, w/o titles:
  `[sravnitel images="ID0,ID1,ID2" width=640 height=480]`
* Fit image into the view window,  with titles:
  `[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true]`
* Also fit image, with titles: 
  `[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true zoom=0]`
* Zoom 30%, with titles, x=0 and y=0 in the center of the view window: 
  `[sravnitel images='ID0,ID1,ID2' width=640 height=480 showtitles=true zoom=0.3 center_x=0 center_y=0]`

**Shortcode Parameters**

| Parameter    | Type  | Default | Required? | Description
| :----------- | :---: | :-----: | :-------: | :----
| `id`         | int   |  0      | -         | wrapper's &lt;div&gt; element id 
| `images`     | str   |         | yes       | list of images ids (attachment_id), comma separated
| `showtitles` | bool  |  false  | -         | show/hide titles
| `width`      | int   |  530    | -         | view window width px
| `height`     | int   |  300    | -         | view window height px
| `index_l`    | int   |  0      | -         | init, left image - is the index of the images array, starting from 0
| `index_r`    | int   |  1      | -         | init, right image - is the index of the images array, starting from 0
| `zoom`       | float |  0      | -         | init, zoom, 0 - fit to view window, 1.0 - 100%
| `center_x`   | int   |  0      | -         | init, x coordinate of the original image to be placed in the center of the view window 
| `center_y`   | int   |  0      | -         | init, y coordinate of the original image to be placed in the center of the view window

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/sravnitel` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= How is it implemented? =

Same as Twenty20 plugin - stacks two selected images on top of each other. As the slider moves the compared images are displayed on the opposite sides of the divider.

Image titles are taken from description or title (if description is empty) of the attached image.

= How to find the ID of the attached image? =

It's an integer number. Insert an image into a post and look for "wp-image-NN". Or find the permalink of the attachment. Type in NNs into the plugin's shortcode.

= Examples =

* Fit image into the view window, w/o titles:
  `[sravnitel images="ID0,ID1,ID2" width=640 height=480]`
* Fit image into the view window,  with titles:
  `[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true]`
* Also fit image, with titles: 
  `[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true zoom=0]`
* Zoom 30%, with titles, x=0 and y=0 in the center of the view window: 
  `[sravnitel images='ID0,ID1,ID2' width=640 height=480 showtitles=true zoom=0.3 center_x=0 center_y=0]`

= Shortcode Parameters =

| Parameter    | Type  | Default | Required? | Description
| :----------- | :---: | :-----: | :-------: | :----
| `id`         | int   |  0      | -         | wrapper's &lt;div&gt; element id 
| `images`     | str   |         | yes       | list of images ids (attachment_id), comma separated
| `showtitles` | bool  |  false  | -         | show/hide titles
| `width`      | int   |  530    | -         | view window width px
| `height`     | int   |  300    | -         | view window height px
| `index_l`    | int   |  0      | -         | init, left image - is the index of the images array, starting from 0
| `index_r`    | int   |  1      | -         | init, right image - is the index of the images array, starting from 0
| `zoom`       | float |  0      | -         | init, zoom, 0 - fit to view window, 1.0 - 100%
| `center_x`   | int   |  0      | -         | init, x coordinate of the original image to be placed in the center of the view window 
| `center_y`   | int   |  0      | -         | init, y coordinate of the original image to be placed in the center of the view window
  
== Screenshots ==

1. Working plugin
1. Shortcode
1. Description field in the attachment details

== Changelog ==

= 1.0 =
* Initial release.

== Upgrade Notice ==

= 1.0 =
* Initial release.

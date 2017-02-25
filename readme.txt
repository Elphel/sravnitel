 
=== Plugin Name ===
Contributors: okdzhimiev
Tags: images, posts, plugin, page, before after slider, visual composer, slider, shortcode, zoom, pan, drag, pinch to zoom, compare images
Requires at least: 4.5.5
Tested up to: 4.7.2
Stable tag: 1.3
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Before-After overlayed image comparison plugin with: slider, zoom, 2+ images.

== Description ==

Sravnitel is a WordPress plugin by Elphel Inc. based on a jQuery plugin *jquery.sravnitel.js*.

**Features**

* Compare 2+ images 
* Zoom and pan
* Initial zoom and offset
* Touch events: click, drag, pinch to zoom

**Tips**

* Click on the view area to quickly switch between left and right image
* Click on the zoom info in the top right to zoom-to-fit the view area
* To place several instances of the plugin assign unique ids: [sravnitel id='test1' ...], [sravnitel id='test2' ...]

**Working demo**

[Elphel's Blog: Lapped MDCT-based image conditioning with optical aberrations correction, color conversion, edge emphasis and noise reduction](http://blog.elphel.com/2017/01/lapped-mdct-based-image-conditioning-with-optical-aberrations-correction-color-conversion-edge-emphasis-and-noise-reduction/)

**Quick examples**

* Fit image into the view window, w/o titles:
`[sravnitel images="ID0,ID1,ID2" width=640 height=480]`
* Fit image into the view window,  with titles and toggle button:
`[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true showtoggle=true]`
* Also fit image, with titles:
`[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true zoom=0]`
* Zoom 30%, with titles, x=0 and y=0 in the center of the view window:
`[sravnitel images='ID0,ID1,ID2' width=640 height=480 showtitles=true zoom=0.3 center_x=0 center_y=0]`

**Shortcode Parameters**

* **id**         - int   - 0      - wrapper's &lt;div&gt; element id
* **images**     - str   - ''     - (required) list of images ids (attachment_id), comma separated
* **width**      - int   - 530    - view window width px
* **height**     - int   - 300    - view window height px
* **showtitles** - bool  - false  - show/hide titles
* **showtoggle** - bool  - false  - show/hide button - switch between left and right image
* **index_l**    - int   - 0      - init, left image - is the index of the images array, starting from 0
* **index_r**    - int   - 1      - init, right image - is the index of the images array, starting from 0
* **zoom**       - float - 0      - init, zoom, 0 - fit to view window, 1.0 - 100%
* **center_x**   - int   - 0      - init, x coordinate of the original image to be placed in the center of the view window 
* **center_y**   - int   - 0      - init, y coordinate of the original image to be placed in the center of the view window

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/sravnitel` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress.

== Frequently Asked Questions ==

= How is it implemented? =

Same as Twenty20 plugin - stacks two selected images so they are displayed as if one is lying on top of another. As the slider moves the compared images are displayed on the opposite sides of the divider.

Image titles are taken from description or title (if description is empty) of the attached image.

= How to find the ID of the attached image? =

It's an integer number. Insert an image into a post and look for "wp-image-NN". Or find the permalink of the attachment. Type in NNs into the plugin's shortcode.

= Examples =

* Fit image into the view window, w/o titles:
`[sravnitel id="test" images="ID0,ID1,ID2" width=640 height=480]`
* Fit image into the view window,  with titles and toggle button:
`[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true showtoggle=true]`
* Also fit image, with titles:
`[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true zoom=0]`
* Zoom 30%, with titles, x=0 and y=0 in the center of the view window:
`[sravnitel images='ID0,ID1,ID2' width=640 height=480 showtitles=true zoom=0.3 center_x=0 center_y=0]`

= Shortcode Parameters =

* **id**         - int   - 0      - wrapper's &lt;div&gt; element id
* **images**     - str   - ''     - (required) list of images ids (attachment_id), comma separated
* **width**      - int   - 530    - view window width px
* **height**     - int   - 300    - view window height px
* **showtitles** - bool  - false  - show/hide titles
* **showtoggle** - bool  - false  - show/hide button - switch between left and right image
* **index_l**    - int   - 0      - init, left image - is the index of the images array, starting from 0
* **index_r**    - int   - 1      - init, right image - is the index of the images array, starting from 0
* **zoom**       - float - 0      - init, zoom, 0 - fit to view window, 1.0 - 100%
* **center_x**   - int   - 0      - init, x coordinate of the original image to be placed in the center of the view window 
* **center_y**   - int   - 0      - init, y coordinate of the original image to be placed in the center of the view window
  
== Screenshots ==

1. Working plugin
1. Shortcode
1. Description field in the attachment details

== Changelog ==

= 1.3 =
* Allow more than one instance on the page
* Set title table margin to 0px
* Fixed [... showtitles=false ...] showing titles
* Added delayed images place updating due to drag event lagging.

= 1.2 = 
* Fixed view size when titles are disabled (showtitles=false)
* Fixed divider containment area - offset() instead of position()

= 1.1 = 
* Fixed coordinates not rounding while dragging
* Added single touch events by enabling 'jquery-touch-punch' in enqueue.php
* Added multi touch - zoom by pinching (tested on Android)
* Added a toggle button - to switch between images (hidden by default)
* Changed handle look

= 1.0 =
* Initial release.

== Upgrade Notice ==

= 1.3 =
* Allow more than one instance on a page, improved divider dragging

= 1.2 = 
* Fixed view size when titles are disabled (showtitles=false)
* Fixed divider containment area

= 1.1 =
* This version adds single (dragging) and multi (pinch to zoom) touch mobile support.

= 1.0 =
* Initial release.

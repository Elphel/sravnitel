# Sravnitel

Before-After overlayed image comparison plugin for jQuery and WordPress.

**Published on Wordpress.org**

* [Sravnitel](https://wordpress.org/plugins/sravnitel/)

**Features**

* Compare 2+ images 
* Zoom and pan
* Initial zoom and offset
* Touch events: click, drag, pinch to zoom

**Notes**

* Click on the view area to quickly switch between left and right image
* Click on the zoom info in the top right to zoom-to-fit the view area
* Mousewheel to zoom - 5% steps

![sravnitel ui](https://github.com/Elphel/sravnitel/blob/master/screenshot-1.png)

**Working example**

[Elphel's Blog: Lapped MDCT-based image conditioning with optical aberrations correction, color conversion, edge emphasis and noise reduction](http://blog.elphel.com/2017/01/lapped-mdct-based-image-conditioning-with-optical-aberrations-correction-color-conversion-edge-emphasis-and-noise-reduction/ "Elphel's blog")

MDCT stands for [Modified Discrete Cosine Transform](https://en.wikipedia.org/wiki/Modified_discrete_cosine_transform)

##WordPress plugin
see **readme.txt**

### Usage example
`[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true]`

##jQuery plugin

###Dependencies
* jquery
* jquery-ui-draggable
* jquery-ui-touch-punch

### Usage example

*index.html*:

    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <script src="js/jquery-3.1.1.js"></script>
      <script src="js/jquery-ui-1.12.1/jquery-ui.js"></script>
      <script src="js/jquery.sravnitel.js"></script>
      <script src="js/index.js"></script>
    </head>
    <body>
    </body>
    </html>

*index.js*:

    $(function(){
      init();
    });

    function init(){
      var vw = $("<div>",{id:"s1"}).css({
        background: "white",
        position:"relative",
        top:"300px",
        left:"300px"
    });
    $("body").append(vw);
  
    vw.sravnitel({
      images:[
        "image_1.jpeg",
        "image_2.jpeg",
        "image_3.jpeg",
        "image_4.jpeg",
        "image_5.jpeg",
      ],
      titles:[
        "image 1",
        "image 2",
        "image 3",
        "image 4"
      ],showtitles:true,showtoggle:true,width:800,height:600});
    }

### Parameters

| Parameter    | Type  | Default | Required? | Description
| :----------- | :---: | :-----: | :-------: | :----
| `images`     | array(str)   |         | yes       | list of images urls
| `titles`     | array(str)   |         | -       | list of images titles
| `width`      | int   |  300    | -         | view window width px
| `height`     | int   |  200    | -         | view window height px
| `showtitles` | bool  |  false  | -         | show/hide titles
| `showtoggle` | bool  |  false  | -         | show/hide button - switch between left and right image
| `index_l`    | int   |  0      | -         | init, left image - is the index of the images array, starting from 0
| `index_r`    | int   |  1      | -         | init, right image - is the index of the images array, starting from 0
| `zoom`       | float |  0      | -         | init, zoom, 0 - fit to view window, 1.0 - 100%
| `center_x`   | int   |  0      | -         | init, x coordinate of the original image to be placed in the center of the view window 
| `center_y`   | int   |  0      | -         | init, y coordinate of the original image to be placed in the center of the view window

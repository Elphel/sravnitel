# Sravnitel

Before-After overlayed image comparison plugin for jQuery and WordPress.

**Features**

* Compare 2+ images 
* Zoom and pan
* Initial zoom and offset

**Notes**

* No mobile support - touch/pinch

##WordPress plugin
see **readme.txt**

### Usage example
`[sravnitel images="ID0,ID1,ID2" width=640 height=480 showtitles=true]`

##jQuery plugin

###Dependencies
* jquery
* jquery-ui-draggable

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
      ],showtitles:true,width:800,height:600}); 
    }

### Parameters

**Shortcode Parameters**

| Parameter    | Type  | Default | Required? | Description
| :----------- | :---: | :-----: | :-------: | :----
| `images`     | array(str)   |         | yes       | list of images urls
| `titles`     | array(str)   |         | -       | list of images titles
| `showtitles` | bool  |  false  | -         | show/hide titles
| `width`      | int   |  300    | -         | view window width px
| `height`     | int   |  200    | -         | view window height px
| `index_l`    | int   |  0      | -         | init, left image - is the index of the images array, starting from 0
| `index_r`    | int   |  1      | -         | init, right image - is the index of the images array, starting from 0
| `zoom`       | float |  0      | -         | init, zoom, 0 - fit to view window, 1.0 - 100%
| `center_x`   | int   |  0      | -         | init, x coordinate of the original image to be placed in the center of the view window 
| `center_y`   | int   |  0      | -         | init, y coordinate of the original image to be placed in the center of the view window
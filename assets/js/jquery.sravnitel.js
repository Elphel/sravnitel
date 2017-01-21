/** 
 * @file jquery.sravnitel.js
 * @brief jquery plugin for comparing multiple images
 * @copyright Copyright (C) 2017 Elphel Inc.
 * @author Oleg Dzhimiev <oleg@elphel.com>
 *
 * @licstart  The following is the entire license notice for the 
 * JavaScript code in this page.
 *
 *   The JavaScript code in this page is free software: you can
 *   redistribute it and/or modify it under the terms of the GNU
 *   General Public License (GNU GPL) as published by the Free Software
 *   Foundation, either version 3 of the License, or (at your option)
 *   any later version.  The code is distributed WITHOUT ANY WARRANTY;
 *   without even the implied warranty of MERCHANTABILITY or FITNESS
 *   FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 *   As additional permission under GNU GPL version 3 section 7, you
 *   may distribute non-source (e.g., minimized or compacted) forms of
 *   that code without the copy of the GNU GPL normally required by
 *   section 4, provided you include this license notice and a URL
 *   through which recipients can access the Corresponding Source.
 *
 *  @licend  The above is the entire license notice
 *  for the JavaScript code in this page.
 */

(function ( $ ) {
  
  // http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices
  // init_touch();
  
  // https://gist.github.com/leolux/c794fc63d9c362013448
  var SRAVNITEL = function(element,options){
    var elem = $(element);
    var obj = this;
    
    var defaults = {
      // urls, comma separated
      images:[],
      // image titles in the same order as url
      titles:[],
      // show or hide titles
      showtitles: false,
      // view window width
      width:300,
      // view window height
      height:200,
      // init, left image - is the index of the images array, starting from 0
      index_l: 0,
      // init, right image - is the index of the images array, starting from 0
      index_r: 1,
      // init, zoom==0 - fit image, zoom==1.0 - 100%
      zoom: 0,
      // init, x coordinate of the original image to be placed in the center of the view window
      center_x: 0,
      // init, y coordinate of the original image to be placed in the center of the view window
      center_y: 0
    };
    
    var settings = $.extend(defaults,options);
    
    var images = [];
    
    var tmpimg;
    
    var divider_line_width = 2;
    var divider_handle_size = 30;
    
    var x0,y0;
    
    var tmp_display_window;
    //index: 0 - left, 1 - right
    
    //create display windows
    for(var i=0;i<2;i++){
      tmp_display_window = $("<div>",{
        id:   "display_window_"+i,
        class:"display_window"
      }).css({
        position:"absolute",
        left: (settings.width/2)*i+"px",
        width: settings.width/2+"px",
        height: settings.height+"px",
        overflow: "hidden"        
      });
      
      tmp_display_window.attr("index",i);
      
      elem.append(tmp_display_window);
    }
    
    var tmp_display_titles = $("<div>",{
        id: "display_titles",
        class:"titles"
      }).css({
        position:"absolute",
        width: settings.width+"px",
        top: settings.height+"px",
        left: "0px",
        overflow: "hidden"
      });
          
    elem.append(tmp_display_titles);
      
    if (settings.showtitles==false){
      //console.log("titles hidden");
      $(".titles").css({
        display:"none"
      });
    }
    
    var tmp_title;
    
    if (settings.images.length>0){
      
      var tmp_table = $("<table>").css({
        width: "100%",
        border: "1px solid rgba(200,200,200,0.5)",
        "text-align": "center"
      });
      
      $("#display_titles").append(tmp_table);
      
      tmp_table.append(
        $("<tr>").append(
          $("<th>",{title:"left image"}).html("left&nbsp;")
        ).append(
          $("<th>",{title:"right image"}).html("right&nbsp;")
        ).append(
          $("<th>",{title:"left image"}).css({"text-align":"left","padding-left":"10px"}).html("title")
        )
      );
      
      for(var i=0;i<settings.images.length;i++){
        if (settings.titles[i] != undefined ){ 
          tmp_title = settings.titles[i];
        }else{
          var tmp_ind = settings.images[i].lastIndexOf("/");
          tmp_title = settings.images[i].substring(tmp_ind+1);
        }
        
        tmp_row = $("<tr>");
        
        for(var j=0;j<2;j++){
          
          tmp_div = $("<div>",{class:"selector_"+j}).css({
            width:"15px",
            height:"15px",
            border: "1px solid rgba(100,100,100,0.5)",
            padding: "1px",
            cursor:"pointer"
          }).append($("<div>").css({
            width:"15px",
            height:"15px",
            background:"rgba(100,200,100,1)"
            })
          );
          
          //tmp_div.attr("mysrc",settings.images[i]);
          tmp_div.attr("index",i);
          tmp_div.attr("side",j);
          
          tmp_div.on("click",function(){
            var tmp_index = $(this).attr("index");
            var tmp_side = $(this).attr("side");
            //console.log(settings.images[tmp_index]);
            $(".selector_"+tmp_side).find("div").hide();
            $(this).find("div").show();
            $("#display_window_"+tmp_side+" .zoomable").attr("src",settings.images[tmp_index]).attr("index",tmp_index);
            reset_selection();
          });
          
          tmp_row.append($("<td>",{align:"center"}).append(tmp_div));
          
        }

        tmp_row.append($("<td>").css({"text-align":"left","padding-left":"10px"}).html(tmp_title));
        tmp_table.append(tmp_row);
 
      }
      
    }
    
    elem.css({
      width: settings.width+"px",
      height: (settings.height+$("#display_titles").height())+"px"
    });
    
    for(var i=0;i<settings.images.length;i++){
      //initial zoom?!
      tmpimg = $("<img>",{
        id:"image_"+i, 
        src: settings.images[i],
        class: "zoomable"
      }).css({
        position: "absolute",
        width: settings.width+"px"
        //height: settings.height+"px"
      });
      tmpimg.attr("index",i);
      
      images[i] = tmpimg;
      
      //images[i].draggable();
    }
    
    
    if (images.length==1){
      
      image_l = images[0];
      image_r = images[0].clone();
      $(".selector_0")[0].click();
      
      $(".selector_1")[0].click();
      image_r.draggable();
      
    }else if(images.length>=2){
      image_l = images[settings.index_l];
      image_r = images[settings.index_r];
      $(".selector_0")[settings.index_l].click();
      $(".selector_1")[settings.index_r].click();
      image_r.css({
        left: -settings.width/2+"px"
      });
    }
    
        
    $(".display_window").each(function(){
      
      var index = $(this).attr("index");
      
      if (index==0) $(this).append(image_l);
      else          $(this).append(image_r);
      
      var tmp_elem = $(this).find(".zoomable");
      tmp_elem.draggable({
        start:function(e){
          x0 = e.pageX;
          y0 = e.pageY;
        },
        drag:function(e){
          xc = e.pageX;
          yc = e.pageY;
          sync_images(xc-x0,yc-y0);
          x0 = xc;
          y0 = yc;
        }
      });
      
      tmp_elem.on("click",function(){
        var tmp_index = $(this).parent().attr("index");
        if (tmp_index==0){
          //show right
          place_divider(divider_line_width/2);
          tmp_index = 1;
        }else{
          place_divider(settings.width-divider_line_width-1);
          tmp_index = 0;
        }
        
        var sindex = $("#display_window_"+tmp_index+" .zoomable").attr("index");
        set_selection(sindex);
      });
    });
    
    var zoom_info = $("<div>",{id:"zoom_info"}).css({
      position:"absolute",
      top:"0px",
      right:"0px"
    });
    
    zoom_info.on("click",function(){
      set_zoom(0,0,settings.width);
    });
    
    elem.append(zoom_info);
    
    
    $(images[0]).on("load",function(){
      //place_names($(this).height());
      //set zoom here:
      if (settings.zoom!=0){
        
        i_width = settings.zoom*$("#display_window_0 .zoomable")[0].naturalWidth;
        i_height = settings.zoom*$("#display_window_0 .zoomable")[0].naturalHeight;
        i_left = -settings.zoom*settings.center_x+settings.width/2;
        i_top = -settings.zoom*settings.center_y+settings.height/2;
        
        //console.log(i_top+" "+i_left+" : "+i_width);
        
        //disable initial zoom
        settings.zoom = 0;
        
        set_zoom(i_top,i_left,i_width);
      }
      
      update_zoom_info();
    });
    
    init_divider();
    init_zoom();
    
    $(window).resize(function(){
      $("#sravnitel_divider").draggable({
        containment:update_divider_containment()
      });
    });
    
    //end-of-program
        
    function place_divider(x){
      $("#sravnitel_divider").css({
        left: (x-divider_line_width/2)+"px"
      });
      update_display_windows();
    }
    
    function init_divider(){
      
      var divider = $("<div>",{id:"sravnitel_divider"}).css({
        position:"absolute",
        top:"0px"
      });
      
      var tmp_divider_line;
      tmp_divider_line = $("<div>",{id:"divider_line",class:"divider"}).css({
          position:"absolute",
          top:"0px",
          background:"rgba(0,0,0,0.5)",
          border: "1px solid gray",
          width:divider_line_width+"px",
          height:(settings.height-2)+"px",
          cursor:"ew-resize"
      });
      divider.append(tmp_divider_line);
      
      var display_divider_handle = $("<div>",{id:"divider_handle",class:"divider_handle"}).css({
        position:"absolute",
        top: (settings.height/2-divider_handle_size/2)+"px",
        "background-size": divider_handle_size+"px",
        width: divider_handle_size+"px",
        height: divider_handle_size+"px",
        left: -(divider_handle_size/2-divider_line_width)+"px",
        cursor:"ew-resize",
        "text-align":"center"
      });

      divider.append(display_divider_handle);
      
      elem.append(divider);
      
      place_divider(settings.width/2);
            
      var tmp_containment = update_divider_containment();
      
      $("#sravnitel_divider").draggable({
        axis:"x",
        //containment:"parent",
        containment:tmp_containment,
        start:function(){
          reset_selection();
        },
        drag:function(){
          $(this).off("mouseout");
          update_display_windows();
        },
        stop:function(){
          $(this).on("mouseout",function(){
            $(".divider").css({
              background:"rgba(0,0,0,0.5)"
            });
          });
        }
      });
    }
    
    function reset_selection(){
      //console.log("reset selection");
      $(".titles tr td").css({
        background:"white"
      });
    }
    
    function set_selection(index){
      reset_selection();
      var rows = $(".titles tr");
      //console.log("index is "+index+" length is "+rows.length);
      $(rows[parseInt(index)+1]).find("td").css({
        background:"rgba(200,200,200,0.5)"
      });
    }
    
    function update_divider_containment(){
      x1 = $("#sravnitel_divider").parent().position().left;
      y1 = $("#sravnitel_divider").parent().position().top;
      //console.log($("#sravnitel_divider").parent());
      x2 = x1+$("#sravnitel_divider").parent().width()-divider_line_width-2;
      y2 = y1+settings.height;
      return [x1,y1,x2,y2];
    }
    
    function init_zoom(){
      
      //console.log("init zoom");
      
      $(".display_window").on("mousewheel wheel",function(e){

        // dm = e.originalEvent.deltaMode;
        
        var i = parseInt($(this).attr("index"));
        
        dx = e.originalEvent.deltaX;
        dy = e.originalEvent.deltaY;
        x = e.originalEvent.pageX-$(this).offset().left+i*($(this).position().left);
        y = e.originalEvent.pageY-$(this).offset().top;

        // console.log("["+x+":"+y+"]: "+dx+" "+dy);
        
        // need only left to set initial zoom
        $("#display_window_0 .zoomable").each(function(){
          zoom(this,x,y,dy);
        });
        
        e.preventDefault();
        e.stopPropagation();
        return false;
        
      });
      
    }
        
    function zoom(elem,x,y,dy){
            
      old_pos = $(elem).position();
      old_x = x-old_pos.left;
      old_y = y-old_pos.top;
      
      //console.log(x+" "+y+" "+old_x+" "+old_y);
      
      old_width = $(elem).width();
      old_height = $(elem).height();
      
      old_zoom = get_zoom();
      
      old_zoom_rounded = Math.round(old_zoom*100)/100;
      old_zoom_rounded = Math.floor(old_zoom_rounded*20)/20;
      
      if (dy>0){
        new_zoom = old_zoom_rounded - 0.05;
      }else{
        new_zoom = old_zoom_rounded + 0.05;
      }
      
      if (new_zoom==0) new_zoom = 0.05;
      
      new_width = new_zoom * old_width / old_zoom;
      
      k = new_width/old_width;
      
      new_x = x-k*old_x;
      new_y = y-k*old_y;
      
      set_zoom(new_y,new_x,new_width);
      
    }
  
    function set_zoom(top,left,width){
            
      $(".display_window").each(function(){
        var tmp_elem = $(this).find(".zoomable");
        tmp_elem.css({
          top: top+"px",
          left: left-$(this).position().left+"px",
          width: width+"px"
        });
      });
      update_zoom_info();
      
    }
  
    function update_zoom_info(){
      var z = get_zoom();
      z = Math.round(z*100);
      z = z+" %";
      
      var el = $("<div>",{title:"zoom, click to fit image"}).css({
        color:"white",
        padding: "3px 6px",
        background: "rgba(100,100,100,0.5)",
        cursor: "pointer",
      }).html(z);
      
      $("#zoom_info").html(el);
      
    }

    function get_zoom(){
      return $("#display_window_0 .zoomable").width()/$("#display_window_0 .zoomable")[0].naturalWidth;
    }
  
    function update_display_windows(){
      $("#display_window_0").css({
        width: $("#sravnitel_divider").position().left+"px"
      });
      
      oldleft = $("#display_window_1").position().left;
      newleft = $("#sravnitel_divider").position().left;
      
      deltaleft = newleft - oldleft;
      
      $("#display_window_1").css("left", "+="+deltaleft);
      $("#display_window_1").css("width","-="+deltaleft);
      $("#display_window_1 .zoomable").css("left", "-="+deltaleft);
    }
  
    function sync_images(dx,dy){
      //dx,dy;
      $(".display_window").each(function(){
        var tmp_elem = $(this).find(".zoomable");
        tmp_elem.css("left","+="+dx);
        tmp_elem.css("top","+="+dy);
      });
    }
  
  };
  
  $.fn.sravnitel = function(options){
    var element = $(this);
        
    // Return early if this element already has a plugin instance
    if (element.data('sravnitel')) return element.data('sravnitel');
    
    var sravnitel = new SRAVNITEL(this,options);
    element.data('sravnitel',sravnitel);
    
    var res = new Object();
    res.cnv = element;
    res.data = sravnitel;
    
    return res;
  };
  
}(jQuery));

function touchHandler(event) {
  var touch = event.changedTouches[0];

  var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup"
  }[event.type], true, true, window, 1,
    touch.screenX, touch.screenY,
    touch.clientX, touch.clientY, false,
    false, false, false, 0, null
  );

  touch.target.dispatchEvent(simulatedEvent);
  event.preventDefault();
  
}

function init_touch(element) {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
}
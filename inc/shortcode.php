<?php
/**
 * @file shortcode.php
 * @brief shortcodes
 * @copyright Copyright (C) 2017 Elphel Inc.
 * @author Oleg Dzhimiev <oleg@elphel.com>
 *
 * @par <b>License</b>:
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

function sravnitel_init(){
  function sravnitel_shortcode($atts,$content=null,$tag=''){
  
    // from the: https://developer.wordpress.org/plugins/shortcodes/shortcodes-with-parameters/
    
    // normalize attribute keys, lowercase
    $atts = array_change_key_case((array)$atts, CASE_LOWER);
  
    // override default attributes with user attributes
    
    $defaults = Array(
      'id' => 0,
      'images' => '',
      'showtitles' => false,
      'width' => 530,
      'height' => 300,
      'index_l' => 0,
      'index_r' => 1,
      'zoom' => 0,
      'center_x' => 0,
      'center_y' => 0
    );
    
    $sravnitel_atts = shortcode_atts($defaults, $atts, $tag);
  
    $images = explode(",",$sravnitel_atts['images']);
  
    $titles = Array();
  
    $images_urls = Array();
  
    $content = "";
  
    foreach($images as $img){
      $img = intval(trim($img));
      array_push($images_urls,wp_get_attachment_url($img));
      
      $img_info= wp_get_attachment($img);
      
      if (trim($img_info['description'])==""){
        array_push($titles,$img_info['title']);
      }else{
        array_push($titles,$img_info['description']);
      }
      
    }
  
    //echo "<p>testing defaults: {$sravnitel_atts['index_l']}</p>";
  
    $id_str = "sravnitel_{$sravnitel_atts['id']}";
    $images_str = "[\"".implode("\",\"",$images_urls)."\"]";
    $titles_str = "[\"".implode("\",\"",$titles)."\"]";
    
    if (!$sravnitel_atts['showtitles']){
      $showtitles_str = "false";
    }else{
      $showtitles_str = "true";
    }
    
    $content = "<b>$titles_str</b>";
    
    $content = <<<TXT
<div id="$id_str" style="position:relative;" class="sravnitel"></div>
<script>
  jQuery(window).load(function(){
    jQuery("#$id_str").sravnitel({
      images: $images_str,
      titles: $titles_str,
      showtitles: $showtitles_str,
      width: {$sravnitel_atts['width']},
      height: {$sravnitel_atts['height']},
      index_l: {$sravnitel_atts['index_l']},
      index_r: {$sravnitel_atts['index_r']},
      zoom: {$sravnitel_atts['zoom']},
      center_x: {$sravnitel_atts['center_x']},
      center_y: {$sravnitel_atts['center_y']},
    });
  });
</script>
TXT;

    return $content;
  }
  
  add_shortcode('sravnitel',sravnitel_shortcode);
  
  function wp_get_attachment( $attachment_id ) {
  
    $attachment = get_post( $attachment_id );
    
    return array(
      'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
      'caption' => $attachment->post_excerpt,
      'description' => $attachment->post_content,
      'href' => get_permalink( $attachment->ID ),
      'src' => $attachment->guid,
      'title' => $attachment->post_title
    );
    
  }
  
}

?>
<?php
/**
 * @file enqueue.php
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

function sravnitel_enqueue_script($hook){

  wp_enqueue_style( 'sravnitel-style', SRAVNITEL_URL.'/assets/css/sravnitel.css');
  wp_enqueue_script( 'sravnitel', SRAVNITEL_URL.'/assets/js/jquery.sravnitel.js', array('jquery-ui-draggable','jquery-touch-punch'));

}

add_action( 'wp_enqueue_scripts', 'sravnitel_enqueue_script');

?>

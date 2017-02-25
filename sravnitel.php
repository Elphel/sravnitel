<?php
/**
 * @package Sravnitel
 * @version 1.3
 * @file sravnitel.php
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
/*
Plugin Name: Sravnitel
Plugin URI: http://wordpress.org/plugins/sravnitel/
Description: Before-After overlayed image comparison plugin with: slider, zoom, 2+ images.
Author: Elphel Inc.
Version: 1.3
Author URI: http://www3.elphel.com
*/

defined('ABSPATH') or die('No script kiddies please!');

define('SRAVNITEL_URL',plugins_url('', __FILE__ ));

add_action( 'init', 'sravnitel_init' );

include_once('inc/enqueue.php');
include_once('inc/shortcode.php');

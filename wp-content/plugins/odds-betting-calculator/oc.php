<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.linkedin.com/in/abdulwahabpk/
 * @since             0.0.1
 * @package           Oc
 *
 * @wordpress-plugin
 * Plugin Name:       Odds Comparison
 * Plugin URI:        https://github.com/awwm/ocp
 * Description:       An odds comparison plugin that will display odds from different selected bookmakers.
 * Version:           0.0.1
 * Author:            Abdul Wahab
 * Author URI:        https://www.linkedin.com/in/abdulwahabpk/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       ocbc
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'OC_VERSION', '0.0.1' );

function ocbc_block_init() {
	register_block_type( __DIR__ . '/build/betting-cal-block' );
	register_block_type( __DIR__ . '/build/odds-comp-block' );
}
add_action( 'init', 'ocbc_block_init' );

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
 * @since             1.0.0
 * @package           Oc
 *
 * @wordpress-plugin
 * Plugin Name:       Odds Comparison
 * Plugin URI:        https://github.com/awwm/ocp
 * Description:       An odds comparison plugin that will display odds from different selected bookmakers.
 * Version:           1.0.0
 * Author:            Abdul Wahab
 * Author URI:        https://www.linkedin.com/in/abdulwahabpk/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       oc
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
define( 'OC_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-oc-activator.php
 */
function activate_oc() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-oc-activator.php';
	Oc_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-oc-deactivator.php
 */
function deactivate_oc() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-oc-deactivator.php';
	Oc_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_oc' );
register_deactivation_hook( __FILE__, 'deactivate_oc' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-oc.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_oc() {

	$plugin = new Oc();
	$plugin->run();

}
run_oc();

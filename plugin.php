<?php
/**
 * Plugin Name: Custom Guten Blocks
 * Description: <strong><a href="https://webackstop.com">Custom Guten Blocks</a></strong> is a Collection of Gutenberg Blocks.
 * Author: Zakaria Binsaifullah
 * Author URI: https://webackstop.com/
 * Text Domain: custom-guten-blocks
 * Version: 2.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/*
* Root Function for Blocks Registration
* */
function wgb_register_block( $block, $options=array() ){
    return register_block_type(
        'wgb-blocks/' . $block,
        array_merge(
            array(
                'editor_script' => 'wgb-editor-script',
                'editor_style'  => 'wgb-editor-style',
                'style'         => 'wgb-front-style',
                'script'        => 'wgb-front-script',
            ),
            $options
        )
    );
}
/*
 * Gutenberg Blocks Registration
 * */
function wgb_blocks_init(){

    // editor script 
    wp_register_script(
        'wgb-editor-script',
        plugins_url('dist/editor.js', __FILE__),
        array('wp-blocks','wp-i18n', 'wp-element', 'wp-components', 'wp-blob', 'wp-data', 'wp-html-entities', 'lodash', 'wp-block-editor','wp-date')
    );

    // front script 
    wp_register_script(
        'wgb-front-script',
        plugins_url('dist/front.js', __FILE__)
    );

    // editor style 
    wp_register_style(
        'wgb-editor-style',
        plugins_url('dist/editor.css', __FILE__),
        array('wp-edit-blocks')   
    );

    // front style 
    wp_register_style(
        'wgb-front-style',
        plugins_url('dist/front.css', __FILE__)
    );

    // single block registration
    wgb_register_block('hero-section');
    wgb_register_block('about-section');

}
add_action( 'init', 'wgb_blocks_init' );

/**
 * External Assets
*/
function wgb_enqueue_blocks_assets(){
    wp_enqueue_style( 'block-bootstrap', plugins_url( 'inc/css/bootstrap.min.css', __FILE__ ) );
}
add_action( 'enqueue_block_assets', 'wgb_enqueue_blocks_assets' );

/*
 * New Category
 * */

function wgb_blocks_new_cat( $categories ){
	return array_merge(
		$categories,
		array(
			array(
				'title' => __( 'Custom Blocks', 'custom-guten-blocks' ),
				'slug'  => 'custom-blocks'
			)
		)
	);
}
add_filter( 'block_categories', 'wgb_blocks_new_cat' );

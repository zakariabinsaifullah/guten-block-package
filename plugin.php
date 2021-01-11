<?php
/**
 * Plugin Name: Webackstop Guten Blocks
 * Description: <strong><a href="https://webackstop.com">Webackstop Guten Blocks</a></strong> is an awesome package for start developing Gutenberg Blocks easily.
 * Author: Zakaria Binsaifullah
 * Author URI: https://webackstop.com/
 * Text Domain: webackstop-guten-blocks
 * Version: 1.0.0
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
        array('wp-blocks','wp-i18n', 'wp-element')
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
    wgb_register_block('first-block');

}
add_action( 'init', 'wgb_blocks_init' );

/*
 * New Category
 * */

function wgb_blocks_new_cat( $categories ){
	return array_merge(
		$categories,
		array(
			array(
				'title' => __( 'Webackstop Blocks', 'webackstop-guten-blocks' ),
				'slug'  => 'webackstop-blocks'
			)
		)
	);
}
add_filter( 'block_categories', 'wgb_blocks_new_cat' );


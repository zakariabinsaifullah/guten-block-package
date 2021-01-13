import './editor.scss'
import edit from './edit'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

registerBlockType('wgb-blocks/post-grid', {
    title: __( 'Post Grid' ),
    description: __( 'Display Post in grid view' ),
    category: 'webackstop-blocks', // new category 
    icon: 'grid-view', // dashicon 
    keywords: [ 'post grid view', 'post grid' ], 
    edit: edit,
    save: () => {
        return null;
    }
})

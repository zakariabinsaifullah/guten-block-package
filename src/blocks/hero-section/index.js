import './editor.scss'
import edit from './edit'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

registerBlockType('wgb-blocks/hero-section', {
    title: __( 'Hero Section' ),
    description: __( 'Hero Section for Landing Page' ),
    category: 'webackstop-blocks', // new category 
    icon: 'grid-view', // dashicon 
    keywords: [ 'Hero Section', 'Hero Area' ],
    edit: edit,
    save: () => {
        return(
            <div>Save function</div>
        )
    }
})

import './editor.scss'
import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

registerBlockType('wgb-blocks/first-block', {
    title: __( 'First Block' ),
    description: __( 'First Block Created by Guten Blocks Package' ),
    category: 'webackstop-blocks', // new category 
    icon: 'universal-access-alt', // dashicon 
    keywords: [ 'first block' ], 
    edit: ({ className }) => {
        return (
            <div className={ className} >
                <h3>Gutenberg Blocks Development Package</h3>
                <a href="https://webackstop.com">-By Webackstop</a>
            </div>
        );
    },
    save: ({ className }) => {
        return (
            <div className={ className} >
                <h3>Gutenberg Blocks Development Package</h3>
                <a href="https://webackstop.com">-By Webackstop</a>
            </div>
        );
    }
})

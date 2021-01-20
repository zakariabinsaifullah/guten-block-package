import { RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import './editor.scss';


const attributes = {
    serviceTitle: {
        type: 'string',
        default: 'Our Service'
    }, 
    serviceDesc: {
        type: 'string',
        default: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna'
    },
    url: {
        type: 'string', 
        default: ''
    },
    id: {
        type: 'number'
    },
    alt: {
        type: 'string', 
        default: 'Service Image'
    },
    sectionPadding: {
        type: 'object',
        default: {
            top: '70px',
            left: '15px',
            right: '15px',
            bottom: '70px',
        }
    },
    sectionBg: {
        type: 'string',
        default: '#0e9b75'
    },
    boxShadow: {
        type: 'boolean',
        default: true
    }, 
    boxRightWidth: {
        type: 'number',
        default: 20
    },
    boxBottomWidth: {
        type: 'number',
        default: 20
    },
    borderColor: {
        type: 'string',
        default: '#f0a83c'
    },
    imagePosition: {
        type: 'boolean',
        default: false
    }
}

registerBlockType('wgb-blocks/hero-section', {
    title: __( 'Hero Section' ),
    description: __( 'Hero Section for Landing Page' ),
    category: 'custom-blocks', // new category 
    icon: 'grid-view', // dashicon 
    keywords: [ 'Hero Section', 'Hero Area' ],
    edit: edit,
    attributes,
    save: ({ attributes }) => {
        const { className, serviceTitle, serviceDesc, url, alt, sectionPadding, sectionBg, boxShadow, boxRightWidth, boxBottomWidth, borderColor, imagePosition } = attributes;
        return(
            <div 
                className={`main-banner ${className}`} 
                style={{
                    paddingTop: sectionPadding.top,
                    paddingBottom: sectionPadding.bottom,
                    paddingLeft: sectionPadding.left,
                    paddingRight: sectionPadding.right,
                    backgroundColor: sectionBg
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            {
                                imagePosition ?
                                <div className="m-banner-img">
                                    {
                                        url &&
                                        <>
                                            {
                                                (boxShadow === true) ? 
                                                <>
                                                    <img src={url} alt={alt} style={{ boxShadow: `${boxRightWidth}px ${boxBottomWidth}px 0`, color: borderColor }} />
                                                </>
                                                : 
                                                <>
                                                    <img src={url} alt={alt} />
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                                :
                                <div className="m-banner-content">
                                    <RichText.Content
                                        tagName="h1"
                                        className={ className }
                                        value={ serviceTitle }
                                    />
                                    <RichText.Content
                                        tagName="p"
                                        className={ className }
                                        value={ serviceDesc }
                                    />
                                </div>
                            }
                        </div>
                        <div className="col-md-6">
                        {
                                imagePosition ?
                                <div className="m-banner-content">
                                    <RichText.Content
                                        tagName="h1"
                                        className={ className }
                                        value={ serviceTitle }
                                    />
                                    <RichText.Content
                                        tagName="p"
                                        className={ className }
                                        value={ serviceDesc }
                                    />
                                </div>
                                : 
                                <div className="m-banner-img">
                                    {
                                        url &&
                                        <>
                                            {
                                                (boxShadow === true) ? 
                                                <>
                                                    <img src={url} alt={alt} style={{ boxShadow: `${boxRightWidth}px ${boxBottomWidth}px 0`, color: borderColor }} />
                                                </>
                                                : 
                                                <>
                                                    <img src={url} alt={alt} />
                                                </>
                                            }
                                        </>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})

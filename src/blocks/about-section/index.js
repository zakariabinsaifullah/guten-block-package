import { RichText } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import edit from './edit';
import './editor.scss';


const attributes = {
    serviceTitle: {
        type: 'string',
        default: 'About Us'
    }, 
    serviceDesc: {
        type: 'string',
        default: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam nemo consectetur consequatur omnis maxime perferendis. Vitae sequi, totam temporibus id dolore excepturi libero quia repellendus molestias expedita reprehenderit ducimus similique corporis assumenda laudantium beatae, eveniet ab minus explicabo? Labore rerum aliquam dolor quidem earum minus quam ipsum nisi error possimus!'
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
    btnLabel: {
        type: 'string',
        default: 'READ MORE'
    },
    bntMinWidth: {
        type: 'number',
        default: 250
    },
    btnLink: {
        type: 'string',
        default: '#'
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

registerBlockType('wgb-blocks/about-section', {
    title: __( 'About Section' ),
    description: __( 'About Section for Landing Page' ),
    category: 'custom-blocks', // new category 
    icon: 'grid-view', // dashicon 
    keywords: [ 'About Section', 'About Area' ],
    edit: edit,
    attributes,
    save: ({ attributes }) => {
        const { className, serviceTitle, serviceDesc, url, alt, sectionPadding, boxShadow, boxRightWidth, boxBottomWidth, borderColor, imagePosition, btnLabel, btnLink, bntMinWidth } = attributes;
        return(
            <div 
                className={`aboutUs ${className}`} 
                id="about"
                style={{
                    paddingTop: sectionPadding.top,
                    paddingBottom: sectionPadding.bottom,
                    paddingLeft: sectionPadding.left,
                    paddingRight: sectionPadding.right,
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            {
                                imagePosition ?
                                <div className="aboutImgdiv">
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
                                <div className={className}>
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
                                    <a 
                                        href={ btnLink } 
                                        rel="nofollow noopener" 
                                        className={ `btn btn-warning d-block mt-3 px-5 text-white about-section-btn`}
                                        style={{
                                            minWidth: bntMinWidth
                                        }}
                                    >
                                        <RichText.Content
                                            tagName="span"
                                            value={ btnLabel }
                                        />
                                    </a>
                                </div>
                            }
                        </div>
                        <div className="col-md-6 m-auto">
                        {
                                imagePosition ?
                                <div className={className}>
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
                                    <a 
                                        href={ btnLink } 
                                        rel="nofollow noopener" 
                                        className={ `btn btn-warning d-block mt-3 px-5 text-white about-section-btn`}
                                        style={{
                                            minWidth: bntMinWidth
                                        }}
                                    >
                                        <RichText.Content
                                            tagName="span"
                                            value={ btnLabel }
                                        />
                                    </a>
                                </div>
                                : 
                                <div className="aboutImgdiv">
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

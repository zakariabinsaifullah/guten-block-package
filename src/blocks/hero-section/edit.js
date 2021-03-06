import { Component } from '@wordpress/element'
import { withSelect } from "@wordpress/data"
import { __ } from '@wordpress/i18n'
import { decodeEntities } from '@wordpress/html-entities'
import { removep } from '@wordpress/autop';
import ReactHtmlParser from "react-html-parser";
import { PanelColorSettings, InspectorControls, BlockControls, RichText, MediaPlaceholder, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { ColorPalette, PanelBody, ToggleControl, RangeControl, Toolbar, IconButton, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { set } from 'lodash';

const colors = [
    { 
        name: 'Green', 
        color: '#0e9b75'
    },
    { 
        name: 'Red', 
        color: '#ff0000'
    },
    { 
        name: 'Black', 
        color: '#000000'
    },
    { 
        name: 'White', 
        color: '#ffffff'
    },
    { 
        name: 'Orange', 
        color: '#f0a83c'
    },
];

class HeroSection extends Component {
    render() {
        const { className, attributes, setAttributes } = this.props;
        const { serviceTitle, serviceDesc, url, id, alt, sectionPadding, sectionBg, boxShadow, boxRightWidth, boxBottomWidth, borderColor, imagePosition } = attributes; 
        return (
            <div>
                <InspectorControls>        
                    <PanelBody 
                        title={__("Section Settings")}
                        initialOpen= { true }
                    >
                        <BoxControl
                            label={ __( 'Section Padding' ) }
                            values={ sectionPadding }
                            onChange={ ( newVlaue ) => { setAttributes( {
                                sectionPadding: {
                                    ...newVlaue.sectionPadding,
                                    top: newVlaue.top,
                                    left: newVlaue.left,
                                    right: newVlaue.right,
                                    bottom: newVlaue.bottom,
                                }

                            } ) } }
                        />
                        <ColorPalette
                            colors={ colors }
                            onChange={ ( sectionBg ) => setAttributes( { sectionBg } ) }
                            value={ sectionBg }
                        />
                    </PanelBody>
                    <PanelBody
                        title={__("Image Settings")}
                        initialOpen= { false }
                    >
                        <ToggleControl
                            label={ __( "Enable Border Box" ) }
                            checked={ boxShadow }
                            onChange={ () => setAttributes({ boxShadow: ! boxShadow }) }
                        />
                        {
                            boxShadow &&
                            <>
                                <RangeControl
                                    label={ __( 'Box Right Width' ) }
                                    value={ boxRightWidth }
                                    onChange={ ( boxRightWidth ) => setAttributes( { boxRightWidth } ) }
                                    min={ 0 }
                                    max={ 50 }
                                />
                                <RangeControl
                                    label={ __( 'Box Bottom Width' ) }
                                    value={ boxBottomWidth }
                                    onChange={ ( boxBottomWidth ) => setAttributes( { boxBottomWidth } ) }
                                    min={ 0 }
                                    max={ 50 }
                                />
                                <ColorPalette
                                    colors={ colors }
                                    onChange={ ( borderColor ) => setAttributes( { borderColor } ) }
                                    value={ borderColor }
                                />
                            </>
                        }

                    </PanelBody>
                    <PanelBody
                        title={__("Image Position")}
                        initialOpen= { false }
                    >
                        <ToggleControl
                            label={ __( "Show Image at Left Side" ) }
                            checked={ imagePosition }
                            onChange={ () => setAttributes({ imagePosition: ! imagePosition }) }
                        />
                    </PanelBody>
                </InspectorControls>
                <BlockControls>
                    {
                    url &&
                        <Toolbar>
                            <MediaUploadCheck>
                                <MediaUpload
                                    onSelect={ media => setAttributes({ 
                                        url:media.url, 
                                        id: media.id,
                                        alt: media.alt
                                    })}
                                    allowedTypes={["image"]}
                                    value={id}
                                    render={({ open }) => {
                                        return (
                                            <IconButton
                                                className="components-icon-button components-toolbar__control"
                                                label={__(
                                                    "Edit Image"
                                                )}
                                                onClick={open}
                                                icon="edit"
                                            />
                                        );
                                    }}
                                />
                            </MediaUploadCheck>
                            <IconButton
                                className="components-icon-button components-toolbar__control"
                                label={__(
                                    "Delete Image"
                                )}
                                onClick={ () => setAttributes({ url:'', id: null, alt: '' }) }
                                icon="trash"
                            />
                        </Toolbar>
                    }
                </BlockControls>
                <div className="main-banner" style={{
					paddingTop: sectionPadding.top,
					paddingBottom: sectionPadding.bottom,
					paddingLeft: sectionPadding.left,
                    paddingRight: sectionPadding.right,
                    backgroundColor: sectionBg
				}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                {
                                    imagePosition ? 
                                    <div className="m-banner-img">
                                        {
                                            url ? (
                                                <>
                                                    {
                                                        boxShadow ? (
                                                            <>
                                                                <img src={url} alt={alt} style={{ boxShadow: `${boxRightWidth}px ${boxBottomWidth}px 0`, color: borderColor }} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <img src={url} alt={alt} />
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <MediaPlaceholder
                                                    icon="format-image"
                                                    onSelect={ media => setAttributes({ 
                                                        url:media.url, 
                                                        id: media.id,
                                                        alt: media.alt
                                                    })}
                                                    onFilesPreUpload={ media => setAttributes({ 
                                                        url:media.url, 
                                                        id: media.id,
                                                        alt: media.alt
                                                    })}
                                                    onSelectURL={ url => setAttributes({ url })}
                                                    allowedTypes={["image"]}
                                                />
                                            )
                                        }
                                    </div>
                                    :
                                    <div className="m-banner-content">
                                        <RichText
                                            tagName="h1"
                                            className={ className }
                                            value={ serviceTitle }
                                            onChange={ ( serviceTitle ) => setAttributes( { serviceTitle } ) }
                                        />
                                        <RichText
                                            tagName="p"
                                            className={ className }
                                            value={ serviceDesc }
                                            onChange={ ( serviceDesc ) => setAttributes( { serviceDesc } ) }
                                        />
                                    </div>
                                }
                            </div>
                            <div className="col-md-6">
                                {
                                    imagePosition ?
                                    <div className="m-banner-content">
                                        <RichText
                                            tagName="h1"
                                            className={ className }
                                            value={ serviceTitle }
                                            onChange={ ( serviceTitle ) => setAttributes( { serviceTitle } ) }
                                        />
                                        <RichText
                                            tagName="p"
                                            className={ className }
                                            value={ serviceDesc }
                                            onChange={ ( serviceDesc ) => setAttributes( { serviceDesc } ) }
                                        />
                                    </div>
                                    :
                                    <div className="m-banner-img">
                                        {
                                            url ? (
                                                <>
                                                    {
                                                        boxShadow ? (
                                                            <>
                                                                <img src={url} alt={alt} style={{ boxShadow: `${boxRightWidth}px ${boxBottomWidth}px 0`, color: borderColor }} />
                                                            </>
                                                        ) : (
                                                            <>
                                                                <img src={url} alt={alt} />
                                                            </>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <MediaPlaceholder
                                                    icon="format-image"
                                                    onSelect={ media => setAttributes({ 
                                                        url:media.url, 
                                                        id: media.id,
                                                        alt: media.alt
                                                    })}
                                                    onFilesPreUpload={ media => setAttributes({ 
                                                        url:media.url, 
                                                        id: media.id,
                                                        alt: media.alt
                                                    })}
                                                    onSelectURL={ url => setAttributes({ url })}
                                                    allowedTypes={["image"]}
                                                />
                                            )
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HeroSection;
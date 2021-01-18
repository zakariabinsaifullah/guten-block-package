import { Component } from '@wordpress/element'
import { withSelect } from "@wordpress/data"
import { __ } from '@wordpress/i18n'
import { decodeEntities } from '@wordpress/html-entities'
import { removep } from '@wordpress/autop';
import ReactHtmlParser from "react-html-parser";
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';

class HeroSection extends Component {
    render() {
        const { className, attributes, setAttributes } = this.props;
        const { } = attributes; 
        // console.log( this.props);
        return (
            <div>
                <InspectorControls>        
                     
                </InspectorControls>
                <div class="main-banner">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="m-banner-content">
                                    <h1>our Service </h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="m-banner-img">
                                    <img src="https://vanill.digitalanalyticslab.ovh/wp-content/themes/bando/assets/src/img/banner-img.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HeroSection;
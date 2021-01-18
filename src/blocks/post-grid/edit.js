import { Component } from '@wordpress/element'
import { withSelect } from "@wordpress/data"
import { __ } from '@wordpress/i18n'
import { decodeEntities } from '@wordpress/html-entities'
import { removep } from '@wordpress/autop';
import ReactHtmlParser from "react-html-parser";
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';

class LastPostGrid extends Component {
    render() {
        const { posts, className, attributes, setAttributes } = this.props;
        const { featuredImage, postTitle, postCat, postMeta, postExcerpt, numberOfPosts } = attributes; 
        // console.log( this.props);
        return (
            <div>
                <InspectorControls>        
                    <PanelBody 
                        title={__("Post Elements Display")}
                        initialOpen= { false }
                    >
                        <ToggleControl
                            label={ __("Display Featured Image") }
                            checked={ featuredImage }
                            onChange={ () => setAttributes( { featuredImage: !featuredImage } ) }
                        />
                        <ToggleControl
                            label={ __("Display Title") }
                            checked={ postTitle }
                            onChange={ () => setAttributes( { postTitle: !postTitle } ) }
                        />
                        <ToggleControl
                            label={ __("Display Category") }
                            checked={ postCat }
                            onChange={ () => setAttributes( { postCat: !postCat } ) }
                        />
                        <ToggleControl
                            label={ __("Display Meta") }
                            checked={ postMeta }
                            onChange={ () => setAttributes( { postMeta: !postMeta } ) }
                        />
                        <ToggleControl
                            label={ __("Display Excerpt") }
                            checked={ postExcerpt }
                            onChange={ () => setAttributes( { postExcerpt: !postExcerpt } ) }
                        />
                    </PanelBody> 
                    <PanelBody title={__("Posts Sorting and Filter")}>
                        <RangeControl
                            label={__("Number of Posts")}
                            value={numberOfPosts}
                            onChange={ (numberOfPosts) => setAttributes({numberOfPosts}) }
                            min={1}
                            max={10}
                        />
                    </PanelBody> 
                </InspectorControls>
                {posts && posts.length > 0 ? (
                    <div className={`wgb_post_grid_container ${className}`}>
                        {posts.map(post => (
                            <div key={post.id} className={`wgb_pg_single_post`}>
                                {
                                    post._embedded['wp:featuredmedia'] && featuredImage &&
                                    <div className={`wgb_pg_featured_img`}>
                                        <a href={post.link}><img src={post._embedded['wp:featuredmedia'][0].source_url} /></a>
                                    </div>
                                }
                                {
                                    post._embedded['wp:term'] && postCat &&
                                    <div className={`wgb_post_cat`}>
                                        <span>{ post._embedded['wp:term'][0][0].name }</span>
                                    </div>
                                }
                                {
                                    post.title && postTitle &&
                                    <a
                                        // target="_blank"
                                        rel="noopener noreferrer"
                                        href={post.link}
                                    >
                                        <h1 className={`wgb_post_title`}>
                                            { decodeEntities( post.title.rendered ) }
                                        </h1>
                                    </a>
                                }
                                {
                                    postMeta && 
                                    <div className={`wgb_post_meta`}>
                                        {
                                            post._embedded['author'] &&
                                            <li><span class="dashicons dashicons-admin-users"></span> { post._embedded['author'][0].name } </li>
                                        }
                                        {
                                            post.date &&
                                            <li><span class="dashicons dashicons-calendar-alt"></span> { post.date.slice(0,10) }</li>
                                        }
                                    </div>
                                }
                                <div className={`wgb_post_content`}>
                                    {
                                        post.excerpt && postExcerpt &&
                                        decodeEntities( ReactHtmlParser (removep( post.excerpt.rendered )) )
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        {" "}
                        {posts
                            ? __("No Posts Found")
                            : __("Loading...")}{" "}
                    </div>
                )}
            </div>
        )
    }
}
export default withSelect((select, props) => {
    const { attributes } = props;
    const { numberOfPosts } = attributes;
    let query = numberOfPosts;
    return {
        posts: select("core").getEntityRecords("postType", "post", { _embed:true ,per_page: query })
    };
})(LastPostGrid);
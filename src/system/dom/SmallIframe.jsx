"use strict";
import React from 'react';

export default class Iframe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            url: props.url,
            closeCallback:()=>{},
        };
    }
    render() {
        let dom = null;
        if(this.state.visible) {
            // dom = <div className="iframe-manager small-iframe" style={{zIndex:999}}>
            dom = <div className="iframe-manager small-iframe">
                <iframe width="100%" height="100%" src={this.state.url}></iframe>
            </div>
        } else {
            dom = <div className="iframe-manager" style={{zIndex:-999}}></div>;
        }
        return dom;
    }
}
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
            dom = <div className="iframe-manager" style={{zIndex:999}}>
                <iframe width="100%" height="100%" src={this.state.url}></iframe>
                {this.state.closeCallback ?
                    <div className="iframe-manager-close" onClick={this.state.closeCallback}>Lancer le jeu</div> : null}
            </div>
        } else {
            dom = <div className="iframe-manager" style={{zIndex:-999}}></div>;
        }
        return dom;
    }
}
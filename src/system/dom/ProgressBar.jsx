"use strict";
import React from 'react';
import MyMath from 'system/utils/Math';

export default class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const width = { width: MyMath.calculatesPercent(this.props.current, this.props.max) };
        const className = `progress-bar ${this.props.class}`;
        const scale = this.props.scale || 1;
        const progressStyle= {
            height: 12 * scale,
            marginBottom: 8 * scale
        };
        return(
            <div>
                <span>{this.props.name}</span>
                <div className="progress" style={progressStyle}>
                    <div id="gabator-panel-stats-health" className={className}
                         role="progressbar" style={width}></div>
                </div>
            </div>
        );
    }
}
"use strict";
import PropTypes from "prop-types";
import React from "react";
import Flexbox from "flexbox-react";

export class Quest extends React.Component {

    constructor(props) {
        super(props);
        this.starUrl = `${window.assets_path}/files/modal/item/star.png`;
        this.starDisabledUrl = `${window.assets_path}/files/modal/item/star_disabled.png`;
        this.state = {
            finish: false,
            enabled: true
        }
    }

    static propTypes = {
        text: PropTypes.string.isRequired
    }

    getKey() {
        return this.props.name;
    }

    setFinish(finish = true) {
        this.setState({finish})
    }

    toggle(enabled) {
        this.setState({enabled})
    }

    render() {
        const imgUrl = this.state.finish ? this.starUrl : this.starDisabledUrl;
        const spanStyle = this.state.finish ?
            {paddingLeft: 7, fontStyle: 'italic'} :
            {paddingLeft: 7, fontStyle: 'normal'};
        return this.state.enabled ?
            (
                <Flexbox flexDirection="row" alignItems="center">
                    <Flexbox flex="32px 0">
                        <img src={imgUrl} style={{width: 32, height: 32}}/>
                    </Flexbox>
                    <span style={spanStyle}>{this.props.text}</span>
                </Flexbox>
            ) :
            <div></div>;
    }
}

export default class Quests extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quests: []
        }
    }

    static propTypes = {
        scale: PropTypes.number.isRequired
    }

    build(quest) {
        this.state.quests.push(quest);
        this.setState({'quests': this.state.quests});
        return this.state.quests.length - 1;
    }

    get(key) {
        if (this.refs[`quest-${key}`]) {
            return this.refs[`quest-${key}`];
        }
        return null;
    }

    render() {
        const titleStyle = {
            fontSize: 18 * this.props.scale,
            marginBottom: 15 * this.props.scale,
            marginTop: 15 * this.props.scale
        };
        const paddingStyle = {
            paddingLeft: 15 * this.props.scale,
            paddingRight: 15 * this.props.scale,
            paddingBottom: 5 * this.props.scale
        };
        const quests = this.state.quests.map((quest) => {
            return <Quest ref={'quest-' + quest.key} key={'quest-' + quest.key} text={quest.name}/>;
        });
        return quests.length > 0 ? (
            <div id="gabator-panel-stats" style={paddingStyle}>
                <h4 style={titleStyle}>Objectifs</h4>
                {quests}
            </div>
        ) : <div></div>;
    }
}
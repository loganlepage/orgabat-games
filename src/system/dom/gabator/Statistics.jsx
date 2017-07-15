"use strict";
import React from "react";
import MyMath from "system/utils/Math";
import PropTypes from "prop-types";

class ProgressBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const width = {width: MyMath.calculatesPercent(this.props.current, this.props.max)};
        const className = `progress-bar ${this.props.class}`;
        const progressStyle = {
            height: 12 * this.props.scale,
            marginBottom: 8 * this.props.scale
        };
        return (
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

export default class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            health: props.stats.health.default,
            organization: props.stats.organization.default,
            enterprise: props.stats.enterprise.default,
        };
        this.health = props.stats.health.default;
        this.organization = props.stats.organization.default;
        this.enterprise = props.stats.enterprise.default;
        this.healthMax = props.stats.health.max;
        this.organizationMax = props.stats.organization.max;
        this.enterpriseMax = props.stats.enterprise.max;
    }

    static get statValueType() {
        return {'max': PropTypes.number.isRequired, 'default': PropTypes.number.isRequired};
    }

    static propTypes = {
        stats: PropTypes.shape({
            health: PropTypes.shape(Statistics.statValueType).isRequired,
            organization: PropTypes.shape(Statistics.statValueType).isRequired,
            enterprise: PropTypes.shape(Statistics.statValueType).isRequired,
        }).isRequired,
        scale: PropTypes.number.isRequired
    }

    changeValues(stats = {}) {
        this.health = stats.health !== undefined ? stats.health : this.health;
        this.organization = stats.organization !== undefined ? stats.organization : this.organization;
        this.enterprise = stats.enterprise !== undefined ? stats.enterprise : this.enterprise;
        this.setState(stats);
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
        let healthBar, organizationBar, entrepriseBar = null;
        if (this.healthMax > 0) {
            healthBar = <ProgressBar name="Santé" class="progress-bar-success" 
            scale={this.props.scale} current={this.state.health} max={this.healthMax}/>;
        }
        if (this.organizationMax > 0) {
            organizationBar = <ProgressBar name="Organisation" class="progress-bar-info" 
            scale={this.props.scale} current={this.state.organization} max={this.organizationMax}/>;
        }
        if (this.enterpriseMax > 0) {
            entrepriseBar = <ProgressBar name="Notoriété de l'entreprise" class="progress-bar-warning" 
            scale={this.props.scale} current={this.state.enterprise} max={this.enterpriseMax}/>;
        }
        return (
            <div id="gabator-panel-stats" style={paddingStyle}>
                <h4 style={titleStyle}>Statistiques</h4>
                {healthBar}
                {organizationBar}
                {entrepriseBar}
            </div>
        );
    }
}
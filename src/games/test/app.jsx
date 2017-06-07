'use strict';
import 'pixi';
import 'p2';
import 'babel-polyfill';
import Game from './components/game';
import Gabator from './components/gabator';
import React from 'react';
import ReactDOM from 'react-dom';
import Type from 'system/utils/Type';
import {Canvas} from './components/game';

class Warning extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div id="orientationWarning" className="container">
            <h1 className="centered">Tournez votre appareil à l'horizontal</h1>
        </div>;
    }
}

class Content extends React.Component {
    constructor(props) {
        super(props);
    }
    static get GABATOR_PERCENT_WIDTH() {return 22}
    static get GABATOR_MAX_WIDTH() {return 300}
    render() {
        const gabatorTmpWidth = this.props.width * Content.GABATOR_PERCENT_WIDTH * 0.01;
        const gabatorWidth = gabatorTmpWidth < Content.GABATOR_MAX_WIDTH ? gabatorTmpWidth : Content.GABATOR_MAX_WIDTH;
        return <div id="game" className="container">
            <Game width={this.props.width - gabatorWidth} height={this.props.height} ref="game" />
            <Gabator width={gabatorWidth} maxWidth={Content.GABATOR_MAX_WIDTH} ref="gabator"/>
        </div>;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.isVertical = false;
        this.state = {
            width: this.isVertical ? window.innerHeight : window.innerWidth,
            height: this.isVertical ? window.innerWidth : window.innerHeight
        };
    }

    componentWillMount() {
        window.isMobile = Type.isMobile();
        if(window.isMobile) {
            this.isVertical = !(window.orientation == 90 || window.orientation == -90);
            window.addEventListener('orientationchange', () => {
                this.isVertical = !(window.orientation == 90 || window.orientation == -90);
            }, false);
            window.addEventListener("resize", () => {
                this.setState({width: window.innerWidth, height: window.innerHeight});
            }, false);
        } else
            this.isVertical = false;
    }
    componentDidMount() { this.bootGame(); }
    componentDidUpdate() { this.bootGame(); }
    bootGame() {
        if(!this.isVertical
            && Type.isExist(this.refs['content'])
            && Type.isExist(this.refs['content'].refs['game'])
            && !Type.isInstanceOf(this.refs['content'].refs['game'].game, Canvas))
            this.refs['content'].refs['game'].bootGame();
    }
    render() {
        return <div className="container">
            {
                this.isVertical
                ? <Warning />
                : <Content ref="content" width={this.state.width} height={this.state.height}/>
            }
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
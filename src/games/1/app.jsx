'use strict';
import 'pixi'
import 'p2'
import Game from './components/game';
import Gabator from './components/gabator';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<div id="game">
            <Game width={window.innerWidth - 250} height='100%' />
            <Gabator width={250} height='100%'/>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
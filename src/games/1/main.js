'use strict';
import 'pixi'
import 'p2'
import {CANVAS} from 'phaser';
import Game from './components/game';
import Gabator from './components/gabator';

/** Init the game canvas */
const game = new Game(window.innerWidth - 250, '100%', CANVAS, "game-canvas");
game.start();

/** Init the gabator canvas */
const gabator = new Gabator(250, '100%', CANVAS, "gabator-canvas");
gabator.start();

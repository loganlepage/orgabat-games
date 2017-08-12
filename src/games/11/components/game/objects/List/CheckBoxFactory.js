import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import ElementSprite from "./ElementSprite";

export default class ElementListFactory extends GameFactory {

    game;

    constructor(game, x, y, element) {
        super(game);

        this.game = game;
        this.element = element;

        

    }

}
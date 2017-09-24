import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Response from "./Response";

export default class ResponseFactory extends GameFactory {

    game;
    number = 0;
    coordonates = [];

    constructor(game, items) {
        super(game);

        let width = this.game.width;
        let height = this.game.height;

        let itemsNumber = 0;

        for (let item in items) {
            itemsNumber++;
        };

        this.number = itemsNumber;

        let yValue = (height / itemsNumber)/2;
        let x = game.world.centerX - 500 * game.SCALE;

        for (let i = 0; i < itemsNumber; i++) {
            let y = i * (2 * yValue) + yValue;
            this.coordonates.push({x,y});
        }

        let count = 0;

        for (let item in items) {
            this.add(
                (new Response(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    items[item]
                ))
            );
            count++;
        }

    }

}
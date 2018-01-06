import GameFactory from "system/phaser/GameFactory";
import Response from "./Response";
import Phaser from "phaser";

export default class ResponseFactory extends GameFactory {
    coordonates = [];

    constructor(game, items) {
        super(game);

        let width = this.game.width;
        let height = this.game.height;

        let itemsNumber = 0;

        for (let item in items) {
            itemsNumber++;
        }

        this.number = itemsNumber;

        let xValue = (width / itemsNumber)/2;
        let y = this.game.world.centerY + (this.game.world.centerY / 3.2 * this.game.SCALE);

        for (let i = 0; i < itemsNumber; i++) {
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        let count = 0;

        for (let item in items) {
            this.add(
                (new Response(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    items[item].key,
                    items[item].file,
                    items[item].position
                )).sprite
            );
            count++;
        }
    }
}
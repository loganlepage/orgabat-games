import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Image from './Image';

export default class ImageFactory extends GameFactory {

    coordonates = [];

    constructor(game, responses) {
        super(game);
        this.game = game;

        let responsesNumber = 0;

        for (let item in responses) {
            responsesNumber++;
        };

        // Coordonates
        let y = this.game.world.centerY + 300 * this.game.SCALE;
        let xValue = (this.game.width / responsesNumber)/2;

        this.coordonates = [];

        for (let i = 0; i < responsesNumber; i++) {
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        // Responses
        let count = 0;
        for (let response in responses) {
            this.add(
                (new Image(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    responses[response].key,
                    responses[response].correct,
                    responses[response].responses,
                )).sprite
            );
            count++;
        }

    }

}
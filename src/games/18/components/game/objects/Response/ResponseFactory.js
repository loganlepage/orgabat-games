import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Response from "./Response";

export default class ResponseFactory extends GameFactory {

    game;
    coordonates = [];

    constructor(game, responses) {
        super(game);
        this.game = game;

        // Game data
        let width = this.game.width;
        let height = this.game.height;

        let responsesNumber = 0;

        for (let item in responses) {
            responsesNumber++;
        };

        // Coordonates
        let xValue = (width / responsesNumber)/2;
        let y = this.game.world.centerY - 175 * this.game.SCALE;

        this.coordonates = [];

        for (let i = 0; i < responsesNumber; i++) {
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        // this.shuffle(this.coordonates);

        let count = 0;
        // Responses creation
        for (let item in responses) {
            this.add(
                (new Response(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    responses[item].key,
                    responses[item].match,
                )).sprite
            );
            count++;
        }
        
    }

    shuffle (array) {
        let i = 0,
        j = 0,
        temp = null

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

}
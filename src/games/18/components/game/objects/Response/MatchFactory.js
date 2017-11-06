import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Match from "./Match";

export default class ResponseFactory extends GameFactory {

    game;
    coordonates = [];

    constructor(game, match) {
        super(game);
        this.game = game;

        // Game data
        let width = this.game.width;
        let height = this.game.height;

        let matchNumber = 0;

        for (let item in match) {
            matchNumber++;
        };

        // Coordonates
        let xValue = (width / matchNumber)/2;
        let y = this.game.world.centerY + 175 * this.game.SCALE;

        this.coordonates = [];

        for (let i = 0; i < matchNumber; i++) {
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        this.shuffle(this.coordonates);

        let count = 0;
        // Responses creation
        for (let item in match) {
            this.add(
                (new Match(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    match[item].key,
                    match[item].match,
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
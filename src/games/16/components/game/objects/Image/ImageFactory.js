import GameFactory from "system/phaser/GameFactory";
import Image from "./Image";
import Phaser from "phaser";

export default class ImageFactory extends GameFactory {

    coordonates = [];

    constructor(game, repo, responses) {
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
        let y = this.game.world.centerY;
        // let yValue = (height / responsesNumber)/2;
        let xValue = (width / responsesNumber)/2;

        this.coordonates = [];

        for (let i = 0; i < responsesNumber; i++) {
            // let y = i * (2 * yValue) + yValue;
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        // Images
        let count = 0;
        for (let response in responses) {
            this.add(
                (new Image(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    repo,
                    responses[response].key,
                    responses[response].correct,
                    responses[response].point,
                )).sprite
            );
            count++;
        }

    }

}
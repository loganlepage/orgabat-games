import GameFactory from "system/phaser/GameFactory";
import Response from "./Response";
import Phaser from "phaser";

export default class ResponseFactory extends GameFactory {

    coordonates = [];

    constructor(game, repo, responses, xMargin) {
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
        let x = this.game.world.centerX - xMargin;
        let yValue = (height / responsesNumber)/2;

        this.coordonates = [];

        for (let i = 0; i < responsesNumber; i++) {
            let y = i * (2 * yValue) + yValue;
            this.coordonates.push({x,y});
        }

        // Responses
        let count = 0;
        for (let response in responses) {
            this.add(
                (new Response(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    repo,
                    responses[response].key,
                    responses[response].isUsed,
                    responses[response].point,
                )).sprite
            );
            count++;
        }

    }

}
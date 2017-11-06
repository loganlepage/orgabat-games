import GameFactory from "system/phaser/GameFactory";
import Question from "./Question";
import Phaser from "phaser";

export default class QuestionFactory extends GameFactory {

    coordonates = [];

    constructor(game, responses, xMargin) {
        super(game);
        this.game = game;

        // Game data
        let width = this.game.width;
        let height = this.game.height - 300 * this.game.SCALE;

        let responsesNumber = 0;

        for (let item in responses) {
            responsesNumber++;
        };

        // Coordonates
        let x = this.game.world.centerX + xMargin;
        let yValue = (height / responsesNumber)/2;

        this.coordonates = [];

        for (let i = 0; i < responsesNumber; i++) {
            let y = i * (2 * yValue) + yValue + 150 * this.game.SCALE;
            this.coordonates.push({x,y});
        }

        // Responses
        let count = 0;
        for (let response in responses) {
            this.add(
                (new Question(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    responses[response].title,
                    responses[response].correct,
                    responses[response].point
                )).text
            );
            count++;
        }

    }

}
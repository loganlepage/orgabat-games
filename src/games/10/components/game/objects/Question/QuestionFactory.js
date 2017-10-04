import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Question from "./Question";
import Graphic from "../Graphic/Graphic"

export default class QuestionFactory extends GameFactory {

    game;

    constructor(game, questions) {
        super(game);

        let x = 50 * this.game.SCALE;
        let y = 25 * this.game.SCALE;

        for (let question in questions) {
            // this.graphic = new Graphic(this.game, x - 10, y - 5, 100, 30);
            this.add(new Question(
                this.game,
                x,
                y,
                questions[question].questionTitle,
                questions[question].questionAnswers,
                questions[question].questionSolutions)
            );
            // this.graphic.graphic.graphicsData[0].shape.width = this.children[question].title.width + 20;
            console.log(questions[question].questionAnswers.length);
            console.log(y);
            y += 50 * this.game.SCALE + 35 * questions[question].questionAnswers.length * this.game.SCALE;
            // if (questions[question].questionAnswers.length == 2) {
            //     y += 100 * this.game.SCALE;
            // } else {
            //     y += 150 * this.game.SCALE;
            // }

        }

    }

}
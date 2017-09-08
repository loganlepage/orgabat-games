import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Question from "./Question";
import Graphic from "../Graphic/Graphic"

export default class QuestionFactory extends GameFactory {

    game;

    constructor(game, questions) {
        super(game);

        let x = 50;
        let y = 50;

        for (let question in questions) {
            this.graphic = new Graphic(this.game, x - 10, y - 5, 100, 30);
            this.add(new Question(
                this.game,
                x,
                y,
                questions[question].questionTitle,
                questions[question].questionAnswers,
                questions[question].questionSolutions)
            );
            console.log(questions[question].questionAnswers.length);
            this.graphic.graphic.graphicsData[0].shape.width = this.children[question].title.width + 20;
            if (questions[question].questionAnswers.length == 2) {
                y += 80;
            } else {
                y += 110;
            }

        }

    }

}
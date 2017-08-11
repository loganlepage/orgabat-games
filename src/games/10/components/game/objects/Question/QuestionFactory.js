import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Question from "./Question";

export default class QuestionFactory extends GameFactory {

    game;

    constructor(game, questions) {
        super(game);

        let x = 50;
        let y = 50;

        for (let question in questions) {
            this.add(new Question(
                    this.game,
                    x,
                    y,
                    questions[question].questionTitle,
                    questions[question].questionAnswers,
                    questions[question].questionSolutions)
            );
            y += 100;
        }

    }

}
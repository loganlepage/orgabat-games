import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Question from "./Question";
import Graphic from "../Graphic/Graphic"

export default class QuestionFactory extends GameFactory {

    game;

    constructor(game, questions) {
        super(game);

        let x = 50 * this.game.SCALE;
        // let y = 20 * this.game.SCALE;

        let tmpY = 0;

        for (let question in questions) {
            tmpY += 50 * this.game.SCALE + 30 * questions[question].questionAnswers.length * this.game.SCALE;
        }

        let y = this.game.world.centerY - tmpY / 2;

        for (let question in questions) {
            this.add(new Question(
                this.game,
                x,
                y,
                questions[question].questionTitle,
                questions[question].questionAnswers,
                questions[question].questionSolutions)
            );
            // this.graphic = new Graphic(this.game, x - 10, y - 4, this.children[question].title.width + 20, this.children[question].title.height + 6);
            // this.game.layer.zDepth0.addChild(this.graphic.graphic);
            // this.graphic.graphic.graphicsData[0].shape.width = this.children[question].title.width + 20;
            // this.graphic.graphic.graphicsData[0].shape.height = this.children[question].title.height + 20;
            y += 50 * this.game.SCALE + 30 * questions[question].questionAnswers.length * this.game.SCALE;
            // if (questions[question].questionAnswers.length == 2) {
            //     y += 100 * this.game.SCALE;
            // } else {
            //     y += 150 * this.game.SCALE;
            // }

        }

    }

}
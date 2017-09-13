import GameFactory from "system/phaser/GameFactory";
import Step from "./Step";
import Phaser from "phaser";

export default class StepFactory extends GameFactory {

    //relative to the parent
    // static get X_BEGIN_AT() { return -690; }

    constructor(game, steps) {
        super(game);
        let x = 40 * this.game.SCALE,
            y = 90 * this.game.SCALE
        for (let name in steps) {
            this.add(
                (new Step(
                    this.game,
                    steps[name].good,
                    steps[name].title,
                    x,
                    y
                ))
            );
            y += 40 * this.game.SCALE;
        }
    }

}
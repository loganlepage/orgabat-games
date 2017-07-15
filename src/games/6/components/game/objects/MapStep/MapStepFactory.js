import GameFactory from "system/phaser/GameFactory";
import MapStep from "./MapStep";
import Phaser from "phaser";

export default class MapStepFactory extends GameFactory {

    constructor(game, mapSteps) {
        super(game);
        for (let name in mapSteps) {
            this.add(
                (new MapStep(
                    this.game,
                    mapSteps[name].good,
                    mapSteps[name].key,
                    mapSteps[name].validated,
                    mapSteps[name].position,
                    mapSteps[name].x,
                    mapSteps[name].y
                ))
            );
        }
    }

}
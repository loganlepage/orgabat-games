import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Response from "./Response";

export default class ResponseFactory extends GameFactory {

    game;

    constructor(game, responses) {
        super(game);
        this.game = game;

        // Responses creation
        for (let item in responses) {
            this.add(
                (new Response(
                    this.game,
                    responses[item].key,
                    responses[item].x,
                    responses[item].y
                )).sprite
            );
        }
        
    }

}
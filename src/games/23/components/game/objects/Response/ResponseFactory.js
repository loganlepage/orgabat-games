import GameFactory from "system/phaser/GameFactory";
import Response from "./Response";
import Phaser from "phaser";

export default class ResponseFactory extends GameFactory {

    coordonates = [];

    constructor(game, items, repo) {
        super(game);
        // Positions
        for (let item in items) {
            this.add(
                (new Response(
                    this.game,
                    items[item].x,
                    items[item].y,
                    repo + "/" + items[item].key,
                )).sprite
            );
            count++;
        }

    }

}
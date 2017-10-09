import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Response from "./Response";
import Match from "./Match";

export default class ResponseFactory extends GameFactory {

    game;
    coordonates = [];

    constructor(game, responses, match) {
        super(game);
        this.game = game;

        this.createElements(responses, "Response", -175);
        // this.createElements(match, "Match", 175);
        this.createElements(match, "Response", 175);
        
    }

    createElements(elements, object, yValue){
        // Game data
        let width = this.game.width;
        let height = this.game.height;

        let elementsNumber = 0;

        for (let item in elements) {
            elementsNumber++;
        };

        // Coordonates
        let xValue = (width / elementsNumber)/2;
        let y = this.game.world.centerY + yValue * this.game.SCALE;

        this.coordonates = [];

        for (let i = 0; i < elementsNumber; i++) {
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        let count = 0;
        if (object == "Response") {
            // Responses creation
            for (let item in elements) {
                this.add(
                    (new Response(
                        this.game,
                        this.coordonates[count].x,
                        this.coordonates[count].y,
                        elements[item].key,
                        elements[item].match,
                    )).sprite
                );
                count++;
            }
        }
        // } else if (object == "Match") {
        //     // Match creation
        //     for (let item in elements) {
        //         this.add(
        //             (new Match(
        //                 this.game,
        //                 this.coordonates[count].x,
        //                 this.coordonates[count].y,
        //                 elements[item].key,
        //             )).sprite
        //         );
        //         count++;
        //     }
        // }
    }

}
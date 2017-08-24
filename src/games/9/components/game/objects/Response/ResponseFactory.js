import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Response from "./Response";

export default class ResponseFactory extends GameFactory {

    game;
    number = 0;
    coordonates = [];

    constructor(game, items) {
        super(game);
        // this.game = game;

        let width = this.game.width;
        let height = this.game.height;

        let itemsNumber = 0;

        for (let item in items) {
            itemsNumber++;
        };

        this.number = itemsNumber;

        let xValue = (width / itemsNumber)/2;
        let y = 220;

        for (let i = 0; i < itemsNumber; i++) {
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        let count = 0;
        // console.log("Factory:");
        for (let item in items) {
            this.add(
                (new Response(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    items[item].key,
                    items[item].file
                )).sprite
            );
            count++;
        }
        // console.log(this.children);

    }

    // destroy() {
    //     console.log("Destroy");
    //     this.children.forEach((item) => {
    //         console.log(item.obj.key);
    //         item.destroy();
    //         // console.log(item);
    //     });
    // }

}
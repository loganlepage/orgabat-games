import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Response from "./Response";

export default class ResponseFactory extends GameFactory {

    game;
    number = 0;
    coordonates = [];

    constructor(game, items) {
        super(game);

        // Window dimensions
        let width = this.game.width,
            height = this.game.height;

        // Number of items
        let itemsNumber = 0;
        for (let item in items) {
            itemsNumber++;
        };

        // Item dimensions and number for the grid (12 items => 4x3, 16 items => 4x4, etc)
        // let itemsWidth = 100,
        //     itemsHeight = 75,
        //     itemsNumberX = 2,
        //     itemsNumberY = itemsNumber/2;

        let itemsWidth = 120 * this.game.SCALE,
            itemsHeight = 120 * this.game.SCALE,
            itemsNumberX = 2,
            itemsNumberY = itemsNumber/2;

        // Margin between items
        let marginX = 150 * this.game.SCALE,
            marginY = 75 * this.game.SCALE;

        // Margin around the grid
        let bigWidthMargin = (3 * width / 4) - itemsWidth - marginX/2,
            bigHeightMargin = (height - itemsNumberY*itemsHeight - (itemsNumberY-1)*marginY) / 2;

        let countX = 0;

        // Creation of coordonates
        for (let x = (bigWidthMargin + (itemsWidth / 2)); countX < itemsNumberX; x += (itemsWidth + marginX)) {
            countX++;
            let countY = 0;
            for (let y = (bigHeightMargin + (itemsHeight / 2)); countY < itemsNumberY; y += (itemsHeight + marginY)) {
                countY++;
                this.coordonates.push({x,y});
            }
        }

        let count = 0;
        for (let item in items) {
            this.add(
                (new Response(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    items[item]
                )).sprite
            );
            count++;
        }

    }

    destroy(){
        while(this.children[0]){
            this.children[0].obj.destroy();
        }
        // this.forEach((item) => {
        //     console.log(item.obj.item.title);
        //     item.destroy();
        // });
    }

}






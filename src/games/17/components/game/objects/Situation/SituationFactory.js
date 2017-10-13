import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Situation from "./Situation";

export default class SituationFactory extends GameFactory {

    game;
    coordonates = [];

    constructor(game, situation) {
        super(game);
        this.game = game;

        // Game data
        let width = this.game.width;
        let height = this.game.height;

        // let itemsNumber = 0;

        // for (let item in situation) {
        //     itemsNumber++;
        // };

        // let itemWidth = 188; // scale to 0.4
        // let itemHeight = 188;

        // let itemsNumberY = 2;
        // let itemNumberX = Math.round(itemsNumber / itemsNumberY);

        // let marginX = 80 * this.game.SCALE;
        // let marginY = 80 * this.game.SCALE;

        // let bigWidthMargin = (width - itemNumberX*itemWidth - (itemNumberX-1)*marginX) / 2;
        // let bigHeightMargin = (height - itemsNumberY*itemHeight - (itemsNumberY-1)*marginY) / 2;

        // let countX = 0;
        // for (let x = (bigWidthMargin + (itemWidth / 2)); countX < itemNumberX; x += (itemWidth + marginX)) {
        //     countX++;
        //     let countY = 0;
        //     for (let y = (bigHeightMargin + (itemHeight / 2)); countY < itemsNumberY; y += (itemHeight + marginY)) {
        //         countY++;
        //         this.coordonates.push({x,y});
        //     }
        // }

        // Coordonates
        let itemsNumber = 0;

        for (let item in situation) {
            itemsNumber++;
        };

        // Coordonates
        let xValue = (width / itemsNumber)/2;
        let y = this.game.world.centerY;

        this.coordonates = [];

        for (let i = 0; i < itemsNumber; i++) {
            let x = i * (2 * xValue) + xValue;
            this.coordonates.push({x,y});
        }

        // Situations creation
        let count = 0;
        for (let item in situation) {
            this.add(
                (new Situation(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    situation[item].title,
                    situation[item].image,
                    situation[item].responses,
                )).sprite
            );
            count++;
        }
        
    }

}
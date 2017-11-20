import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Item from "./Item";

export default class ItemFactory extends GameFactory {

    game;
    coordonates = [];

    constructor(game, items) {
        super(game);

        this.game = game;

        // Window dimensions
        let width = this.game.width,
            height = this.game.height;

        // Number of items
        let itemsNumber = 0;
        for (let item in items) {
            itemsNumber++;
        };

        // Item dimensions and number for the grid (12 items => 4x3, 16 items => 4x4, etc)
        let itemsWidth = 90,
            itemsHeight = 45,
            itemsNumberX = 3,
            itemsNumberY = itemsNumber/3;

        // Margin between items
        let marginX = 70 * this.game.SCALE,
            marginY = 70 * this.game.SCALE;

        // Margin around the grid
        let bigWidthMargin = (this.game.world.centerX / 2) - itemsWidth - marginX - itemsWidth/2,
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

        // Creation of items
        for (let name in items) {
            if (items[name].quantity > 0) {
                this.add(
                    (new Item(
                        this.game,
                        this.coordonates[count].x,
                        this.coordonates[count].y,
                        items[name].key,
                        items[name].mistakes,
                        items[name].quantity,
                        items[name].dimensions,
                        items[name].note,
                        items[name].name,
                    )).sprite
                );
                count++;
            } else {
                this.add(
                    (new Item(
                        this.game,
                        0,
                        0,
                        items[name].key,
                        items[name].mistakes,
                        items[name].quantity,
                        items[name].dimensions,
                        items[name].note,
                        items[name].name
                    )).sprite
                );
            }
        }

    }

}
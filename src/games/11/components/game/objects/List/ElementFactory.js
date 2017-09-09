import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Element from "./Element";

export default class ElementFactory extends GameFactory {

    game;

    texts = [];

    constructor(game, items, states) {
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

        // Item dimensions and number for the grid
        let itemsWidth = 15, // Useless here
            itemsHeight = 20,
            itemsNumberX = 1,
            itemsNumberY = itemsNumber;

        // Margin between items
        let marginX = 25 * this.game.SCALE,
            marginY = 25 * this.game.SCALE;

        // Margin around the grid
        let bigWidthMargin = this.game.world.centerX, // X position
            bigHeightMargin = (height - itemsNumberY*itemsHeight - (itemsNumberY-1)*marginY) / 2;

        // Creation of coordonates
        let countX = 0,
            coordonates = [];
        for (let x = bigWidthMargin; countX < itemsNumberX; x += (itemsWidth + marginX)) {
            countX++;
            let countY = 0;
            for (let y = (bigHeightMargin + (itemsHeight / 2)); countY < itemsNumberY; y += (itemsHeight + marginY)) {
                countY++;
                coordonates.push({x,y});
            }
        }

        let count = 0;

        // Creation of titles
        let mediumFont = 20 * this.game.SCALE;

        let itemName = this.game.add.text(
                coordonates[count].x, 
                coordonates[count].y - 40 * this.game.SCALE, 
                "Nom:", 
                {fill: '#000000', fontSize: mediumFont});
        this.game.layer.zDepth0.addChild(itemName);
        this.texts.push(itemName);

        let itemState = this.game.add.text(
                coordonates[count].x + (300 * this.game.SCALE), 
                coordonates[count].y - 40 * this.game.SCALE, 
                "État:", 
                {fill: '#000000', fontSize: mediumFont});
        this.game.layer.zDepth0.addChild(itemState);
        this.texts.push(itemState);

        // Creation of items list
        for (let name in items) {
            this.add(
                (new Element(
                    this.game,
                    coordonates[count].x,
                    coordonates[count].y,
                    items[name].key,
                    items[name].name,
                    items[name].correctAnswers,
                    states
                ))
            );
            count++;
        }

    }

}
import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Element from "./Element";

export default class ElementFactory extends GameFactory {

    game;

    texts = [];

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

        // Item dimensions and number for the grid
        let itemsWidth = 15,
            itemsHeight =15,
            itemsNumberX = 1,
            itemsNumberY = itemsNumber;

        // Margin between items
        let marginX = 25 * this.game.SCALE,
            marginY = 25 * this.game.SCALE;

        // Margin around the grid
        let bigWidthMargin = width - 525,
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

        let name = this.game.add.text(
                coordonates[count].x, 
                coordonates[count].y - 30, 
                "Nom   Problème:", 
                {fill: '#000000', fontSize: mediumFont});
        this.texts.push(name);

        let dimensionIssue = this.game.add.text(
                coordonates[count].x + 150, 
                coordonates[count].y - 30, 
                "Dimensions", 
                {fill: '#000000', fontSize: mediumFont});
        this.texts.push(dimensionIssue);

        let defectivIssue = this.game.add.text(
                coordonates[count].x + 250, 
                coordonates[count].y - 30, 
                "Défectueux", 
                {fill: '#000000', fontSize: mediumFont});
        this.texts.push(defectivIssue);

        let quantityIssue = this.game.add.text(
                coordonates[count].x + 350, 
                coordonates[count].y - 30, 
                "Quantité", 
                {fill: '#000000', fontSize: mediumFont});
        this.texts.push(quantityIssue);

        let deliveryIssue = this.game.add.text(
                coordonates[count].x + 450, 
                coordonates[count].y - 30, 
                "Non livré", 
                {fill: '#000000', fontSize: mediumFont});
        this.texts.push(deliveryIssue);

        // Creation of items list
        for (let name in items) {
            this.add(
                (new Element(
                    this.game,
                    coordonates[count].x,
                    coordonates[count].y,
                    items[name].key,
                    items[name].name,
                    items[name].mistakes,
                    items[name].quantity,
                    items[name].dimensions,
                    items[name].note
                ))
            );
            count++;
        }

    }

}
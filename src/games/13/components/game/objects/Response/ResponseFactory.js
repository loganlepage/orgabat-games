import GameFactory from "system/phaser/GameFactory";
import Phaser from "phaser";

import Response from "./Response";

export default class ResponseFactory extends GameFactory {

    game;
    number = 0;
    coordonates = [];

    constructor(game, items) {
        super(game);

        // Black background
        this.blackBackground = this.game.add.graphics(0,0);

        this.blackBackground.lineStyle(0, "balck", 0);
        this.blackBackground.beginFill("black", 0.5);
        this.blackBackground.drawRect(0, 0, this.game.width, this.game.height);
        this.blackBackground.inputEnabled = true;
        this.blackBackground.input.useHandCursor = true;

        this.add(this.blackBackground);

        // Coordonates
        let width = this.game.width;
        let height = this.game.height;

        // let cardsWidth = 200 * this.game.SCALE;
        // let cardsHeight = 300 * this.game.SCALE; // scale 0.525

        // let cardsWidth = 290 * this.game.SCALE;
        // let cardsHeight = 420 * this.game.SCALE;

        let cardsWidth = 250 * this.game.SCALE;
        let cardsHeight = 360 * this.game.SCALE; // scale 0.45 * this.game.SCALE

        let cardNumberX = 4;
        let cardNumberY = 2;

        let marginX = 50;
        let marginY = 25;

        let bigWidthMargin = (width - cardNumberX*cardsWidth - (cardNumberX-1)*marginX) / 2;
        let bigHeightMargin = (height - cardNumberY*cardsHeight - (cardNumberY-1)*marginY) / 2;

        let countX = 0;
        let count = 0;

        for (let x = (bigWidthMargin + (cardsWidth / 2)); countX < cardNumberX; x += (cardsWidth + marginX)) {
            countX++;
            let countY = 0;
            for (let y = (bigHeightMargin + (cardsHeight / 2)); countY < cardNumberY; y += (cardsHeight + marginY)) {
                countY++;
                count++;
                this.coordonates.push({x,y});
            }
        }

        // Images
        count = 0;

        for (let item in items.images) {
            this.add(
                (new Response(
                    this.game,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                    items.images[item].key
                )).sprite
            );
            count++;
        }

    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
        this.forEach((item) => {
            item.events.onInputDown.removeAll();
        });
    }

}
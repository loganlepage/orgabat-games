import GameFactory from "system/phaser/GameFactory";
import Card from "./Card";
import Phaser from "phaser";

export default class CardFactory extends GameFactory {

    //relative to the parent
    // static get X_BEGIN_AT() { return -690; }

    coordonates = [];

    constructor(game, cards) {
        super(game);

        let width = this.game.width;
        let height = this.game.height;

        // let cardsWidth = 95;
        // let cardsHeight = 145;

        let cardsWidth = 95;
        let cardsHeight = 149;

        let cardNumberX = 5;
        let cardNumberY = 4;

        let marginX = 50;
        let marginY = 5;
        let bigWidthMargin = (width - 5*cardsWidth - 4*marginX) / 2;
        let bigHeightMargin = (height - 4*cardsHeight - 3*marginY) / 2;

        // console.log(bigHeightMargin);

        let countX = 0;
        let count = 0;

        for (let x = bigWidthMargin; countX < cardNumberX; x += (cardsWidth + marginX)) {
            countX++;
            let countY = 0;
            for (let y = bigHeightMargin; countY < cardNumberY; y += (cardsHeight + marginY)) {
                countY++;
                count++;
                this.coordonates.push({x,y});
            }
        }

        let count2 = 0;

        for (let name in cards) {
            this.add(
                (new Card(
                    this.game,
                    this.coordonates[count2].x,
                    this.coordonates[count2].y,
                    cards[name].key,
                    cards[name].validated
                ))
            );
            count2++;
        }

        /* for (let x = bigWidthMargin; x < width-(bigWidthMargin); x += (cardsWidth + margin)) {
            for (let y = bigHeightMargin; y < height-(bigHeightMargin); y += (cardsHeight + margin)) {
                console.log("x: " + x + " y: " + y);
                // game.graphics.drawRect(x, y, x+cardsWidth, y+cardsHeight);
                let newColor = this.newRandomColor();
                game.graphics.lineStyle(1, newColor, 1);
                game.graphics.drawRect(x, y, x+200, y+200);
                count++;
            }
        }
        console.log(bigWidthMargin);
        console.log(bigHeightMargin);

        /*for (let name in cards) {
            this.add(
                (new Card(
                    this.game,
                    cards[name].pair,
                    cards[name].key,
                    cards[name].x,
                    cards[name].y,
                    cards[name].clicked,
                    cards[name].validated
                ))
            );
        }*/
    }

    /*newRandomColor() {
        let colors = [0xFF3300, 0xffd900, 0xFF0000, 0xFF700B, 0x0000FF, 0xFFFF0B, 0x33FF00, 0xffffff];
        let color = colors[Math.floor(Math.random()*colors.length)];
        return color;
    }*/

}
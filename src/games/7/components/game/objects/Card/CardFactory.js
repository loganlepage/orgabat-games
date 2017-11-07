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

        let cardsWidth = 105 * this.game.SCALE;
        let cardsHeight = 164 * this.game.SCALE;  // big carsd and scale(0.3 * this.game.SCALE)

        let cardNumberX = 5;
        let cardNumberY = 4;

        let marginX = 20 * this.game.SCALE;
        let marginY = 20 * this.game.SCALE;

        let bigWidthMargin = (width - 5*cardsWidth - 4*marginX) / 2;
        let bigHeightMargin = (height - 4*cardsHeight - 3*marginY) / 2;

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

        // this.shuffle(this.coordonates);

        let count2 = 0;

        for (let name in cards) {
            this.add(
                (new Card(
                    this.game,
                    this.coordonates[count2].x,
                    this.coordonates[count2].y,
                    cards[name].key,
                    cards[name].validated,
                    cards[name].clicked
                    ))
                );
            count2++;
        }
    }

    shuffle (array) {
        let i = 0,
        j = 0,
        temp = null
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }

}
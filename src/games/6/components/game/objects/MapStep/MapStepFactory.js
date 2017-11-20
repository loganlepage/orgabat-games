import GameFactory from "system/phaser/GameFactory";
import MapStep from "./MapStep";
import Phaser from "phaser";

export default class MapStepFactory extends GameFactory {

    coordonates = [];

    constructor(game, mapSteps) {
        super(game);

        this.mapSteps = mapSteps;

        // this.cardsWidth = 150;
        // this.cardsHeight = 150;  // scale(1)

        this.cardsWidth = 146 * this.game.SCALE;
        this.cardsHeight = 146 * this.game.SCALE;  // scale(0.95) and achor(1)

        this.cardNumberX = 6;
        this.cardNumberY = 1;

        this.marginX = 10 * this.game.SCALE;
        this.marginY = 10 * this.game.SCALE;

        this.bigWidthMargin = (this.game.width - (this.cardNumberX*this.cardsWidth) - ((this.cardNumberX-1)*this.marginX)) / 2;
        this.bigHeightMargin = 200 * this.game.SCALE;

        this.createCoordonates();
        this.draw();
        this.createSteps();
    }

    createCoordonates() {

        let countX = 0;
        // for (let x = (bigWidthMargin + (cardsWidth / 2)); countX < cardNumberX; x += (cardsWidth + marginX)) { // anchor(0.5)
        for (let x = this.bigWidthMargin; countX < this.cardNumberX; x += (this.cardsWidth + this.marginX)) { // anchor(0)
            countX++;
            let countY = 0;
            // for (let y = (bigHeightMargin + (cardsHeight / 2)); countY < cardNumberY; y += (cardsHeight + marginY)) { // anchor(0.5)
            for (let y = this.bigHeightMargin; countY < this.cardNumberY; y += (this.cardsHeight + this.marginY)) { // anchor(0)
                countY++;
                this.coordonates.push({x,y});
            }
        }

    }

    draw() {
        let length = this.coordonates.length;

        let littleMargin = 10;

        let x = this.coordonates[0].x - littleMargin;
        let y = this.coordonates[0].y - littleMargin;

        let width = this.game.width - 2*this.bigWidthMargin + 2*littleMargin;
        let height = this.cardsHeight + 2*littleMargin;

        this.graphics = this.game.add.graphics(0, 0);
        this.game.layer.zDepthOverAll.addChild(this.graphics);
        this.graphics.beginFill("black", 0.5);
        this.graphics.drawRect(x, y, width, height);
    }

    createSteps() {
        let count = 0;

        for (let name in this.mapSteps) {
            this.add(
                (new MapStep(
                    this.game,
                    this.mapSteps[name].good,
                    this.mapSteps[name].key,
                    this.mapSteps[name].validated,
                    this.mapSteps[name].position,
                    this.coordonates[count].x,
                    this.coordonates[count].y,
                ))
            );
            count++;
        }
    }

    destroy() {
        this.graphics.destroy();
    }

}
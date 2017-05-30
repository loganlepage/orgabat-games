import GameFactory from "system/phaser/GameFactory";
import Items from './Items';

export default class ItemsFactory extends GameFactory {
    constructor(game, items) {
        super(game);
        for (let i in items) {
            this.add((new Items(
                this.game, items[i].category,
                items[i].category,
Math.floor(Math.random()*(600-0+1)+0),                this.game.world.centerY,
                items[i].isNeeded
            )).sprite);
        }
    }
}
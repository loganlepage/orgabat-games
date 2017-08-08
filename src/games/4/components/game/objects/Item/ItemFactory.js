import GameFactory from "system/phaser/GameFactory";
import Item from "./Item";
import Phaser from "phaser";

export default class ItemFactory extends GameFactory {

    constructor(game, items) {

        super(game);

        let gameWidth = this.game.world.width;

        //TODO: Replace 2nd Item argument by 'name' when graphics come
        for (let type in items) {
            for (let name in items[type]) {
                this.add(
                    (new Item(
                        this.game,
                        type,
                        name,
                        items[type][name].x * this.game.SCALE,
                        items[type][name].y * this.game.SCALE,
                        items[type][name].needed,
                        items[type][name].title
                    )).sprite
                );
            }
        }
    }
}
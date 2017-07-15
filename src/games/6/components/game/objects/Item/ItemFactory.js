import GameFactory from "system/phaser/GameFactory";
import Item from "./Item";
import Phaser from "phaser";

export default class ItemFactory extends GameFactory {

    //relative to the parent
    static get X_BEGIN_AT() { return -690; }

    constructor(game, items) {

        super(game);

        //TODO: Replace 2nd Item argument by 'name' when graphics come
        for (let type in items) {
            for (let name in items[type]) {
                this.add(
                    (new Item(this.game, items[type][name].title, type,
                        items[type][name].x + ItemFactory.X_BEGIN_AT,
                        items[type][name].y,
                        items[type][name].needed,
                        items[type][name].clicked
                    )).sprite
                );
            }
        }
    }
}
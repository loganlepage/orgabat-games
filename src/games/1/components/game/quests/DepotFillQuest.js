import {Quest} from 'system/phaser/utils/Quest';

export default class DepotFillQuest extends Quest {
    constructor(game) {
        super(game);
        this._name = 'Déposer 9 charges de mortier dans le dépot';
        this._key = 'depot_fill';
        game.toolGroup.forEach((tool) => {
            if(tool.key === 'depot')
                tool.obj.onFull.addOnce(this.done, this);
        });
    }
}

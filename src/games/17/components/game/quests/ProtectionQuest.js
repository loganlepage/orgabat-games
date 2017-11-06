import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class WorkspaceQuest extends Quest {

    _name = "Trouver les bonnes protections pour chaque chantier";
    _key = 'protection_quest';
    _help = "Choisis d'abord une situation et répond ensuite à la question posée";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

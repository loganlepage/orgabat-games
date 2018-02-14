import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class WorkspaceQuest extends Quest {

    _name = "Trouver les bonnes protections pour chaque chantier";
    _key = 'protection_quest';
    _help = "Clique d’abord sur une situation et choisis ensuite les mesures de prévention parmi la liste proposée.";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

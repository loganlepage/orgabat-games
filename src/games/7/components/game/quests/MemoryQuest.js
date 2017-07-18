import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class MemoryQuest extends Quest {

    _name = 'Memorgabat';
    _key = 'memory_quest';
    _help = "Trouver les cartes similaires.";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

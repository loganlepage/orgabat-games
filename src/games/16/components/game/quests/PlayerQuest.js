import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class PlayerQuest extends Quest {

    _name = "Choisir l'attitude appropriée";
    _key = 'player_quest';
    _help = 'Cliquer sur le personnage qui permet de rentrer chez le client';

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

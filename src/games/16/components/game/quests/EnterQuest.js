import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class EnterQuest extends Quest {

    _name = 'Choisir la bonne conduite à prendre';
    _key = 'enter_quest';
    _help = 'Choisir la bonne conduite à prendre';

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

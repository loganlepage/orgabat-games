import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class CareStepsQuest extends Quest {

    _name = 'Effectuer les premiers secours';
    _key = 'care_steps_quest';
    _help = "Placer les étapes dans le bon ordre pour effectuer les gestes de premier secours";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

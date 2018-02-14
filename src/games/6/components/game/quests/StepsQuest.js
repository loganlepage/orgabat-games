import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class StepsQuest extends Quest {

    _name = 'Choisir les bonnes conduites';
    _key = 'steps_quest';
    _help = "Sélectionner les conduites qui permettent de charger le véhicule tout en préservant son intégrité physique";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class MeasureQuest extends Quest {

    _name = 'Définir les meilleures mesures de prévention possibles';
    _key = 'measure_quest';
    _help = "Choisir les mesures de prévention de la plus efficace à la moins efficace, en associant un exemple à chaque fois";

    constructor(game) {
        super(game);
        // game.playTest.onTalkEnd.addOnce(this.done, this);
        if(Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.talkEnd = this; //si on veut faire des actions sur la quête depuis la console du navigateur
        }
    }
}

import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class TerminerPart1Quest extends Quest {

    _name = 'Terminer la première partie';
    _key = 'qcm_1_finished';
    _help = "Saississez une réponse pour chacune des questions.";

    constructor(game) {
        super(game);
        game.qcmGroup1.forEach(material => {
            //peu importe le matériel
            material.onFinished.addOnce(() => {
                this.onFinished()
            }, this);
        });
    }

    onFinished() {
        let allAreFinished = true;
        for (const question of Config.questions_part_1) {
            if (question.prop["user-answer"] === null) {
                allAreFinished = false;
            }
        }
        if (allAreFinished) {
            this.done();
        }
    }
}

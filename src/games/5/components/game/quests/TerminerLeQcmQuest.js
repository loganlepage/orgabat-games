import {Quest} from 'system/phaser/utils/Quest';
import Config from '../config/data';

export default class OuvrirBoiteEpiQuest extends Quest {

    _name = 'Terminer le QCM';
    _key = 'qcm_finished';
    _help = "Saississez une réponse pour chacune des questions.";

    constructor(game) {
        super(game);
        game.qcmGroup.forEach((material) => {
            //peu importe le matériel
            material.onFinished.addOnce(() => {
                this.onFinished()
            }, this);
        });
    }

    onFinished() {
        let allAreFinished = true;
        for (const question of Config.questions) {
            if (question.prop["user-answer"] === null) {
                allAreFinished = false;
            }
        }
        if (allAreFinished) {
            this.done();
        }
    }
}

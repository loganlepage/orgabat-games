import {Quest} from "system/phaser/utils/Quest";
import Config from "../config/data";

export default class TremisProtectQuest extends Quest {

    _name = 'Protéger les trémis';
    _key = 'tremis_protect';
    _help = "Avec votre souris, \nprendre et déposer des outils \npour protéger les trémis.";

    constructor(game) {
        super(game);
        game.materialGroup.forEach((material) => {
            for (const protect of Config.containers[Config.containerIndex['tremie']].protects) {
                if (material.type === protect) {

                    //dès qu'un matériel compatible va protéger une trémie
                    material.onProtect.add(() => {
                        this.onProtect(material)
                    }, this);
                }
            }
        });
        if (Config.developer.debug) {
            window.quest = window.quest || {};
            window.quest.tremisProtect = this;
        }
    }

    onProtect(material) {
        let isFinished = true;
        if (Config.containers[Config.containerIndex['tremie']].isProtected === false) {
            isFinished = false;
        }
        if (isFinished) {
            material.onProtect.remove(this.onProtect, this);
            this.done();
        }
    }
}

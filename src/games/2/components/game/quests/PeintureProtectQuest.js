import {Quest} from "system/phaser/utils/Quest";
import Config from "../config/data";

export default class PeintureProtectQuest extends Quest {

    _name = 'Protéger la peinture';
    _key = 'peinture_protect';
    _help = "Avec votre souris, \nprendre et déposer des outils \npour protéger la peinture fraiche.";

    constructor(game) {
        super(game);
        game.materialGroup.forEach((material) => {
            for (const protect of Config.containers[Config.containerIndex['peinture']].protects) {
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
            window.quest.peintureProtect = this;
        }
    }

    onProtect(material) {
        let isFinished = true;
        if (Config.containers[Config.containerIndex['peinture']].isProtected === false) {
            isFinished = false;
        }
        if (isFinished) {
            material.onProtect.remove(this.onProtect, this);
            this.done();
        }
    }
}

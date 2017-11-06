"use strict";
import GameModal from "system/phaser/GameModal";
import {DefaultManager, StackManager} from "system/phaser/Modal";
import QcmMultipleModal from "../../modals/QcmMultipleModal";
import Feedback from "system/phaser/modals/Feedback";


/** Modal handler (called by the gameObject) */
export default class QcmMultipleModalHandler extends GameModal {

    isCantContinue = false;

    static get ANSWER_UNDEFINED() {
        return "Vous devez saisir une réponse";
    }

    /**
     * Constructor for a new modal
     * @param properties
     * @param obj
     * @param game
     */
    constructor(properties, obj, game) {
        super(game);
        this.properties = properties;
        this.obj = obj;
    }

    show() {
        const qcmMultipleModal = new QcmMultipleModal({}, DefaultManager, this.obj.keys, this.game);
        qcmMultipleModal.toggle(true, {light: true});
        qcmMultipleModal.onContinue.add(this.continue, this);
    }

    continue(answer, qcmModal) {
        if (answer === null) {
            this.cantContinueException(QcmModalHandler.ANSWER_UNDEFINED)
        } else {
            qcmModal.onContinue.removeAll(this);
            qcmModal.delete();
            this.obj.continue(answer);
        }
    }

    cantContinueException(message) {
        if (this.isCantContinue) return;
        this.isCantContinue = true;
        const cantUse = new Feedback({}, StackManager, this.game);
        cantUse.setInfo(message);
        cantUse.toggle(GameModal.VISIBLE, {stack: 'BOTTOM_RIGHT'});
        setTimeout(() => {
            cantUse.toggle(GameModal.HIDDEN, {stack: 'BOTTOM_RIGHT'});
            this.isCantContinue = false;
        }, 2000);
    }
};
"use strict";
import {State} from 'phaser';
import Canvas from 'system/phaser/utils/PhaserManager';
import Type from "system/utils/Type";
import {Quest} from "system/phaser/utils/Quest";
import {StackManager} from 'system/phaser/Modal';
import HelpModal from '../modals/HelpModal';
import {DoOnce} from 'system/utils/Utils';


/** State when we start gabator */
export default class Play extends State {

    /** Called when the state must be created */
    create() {
        /** Gabator */
        this.gabator = this.game.add.sprite(0, 0, 'gabator-sleep');
        this.gabator.width = this.game.uiScale(this.gabator.width);
        this.gabator.height = this.game.uiScale(this.gabator.height);
        this.gabator.x = this.game.canvas.width / 2 - this.gabator.width / 2;
        this.gabator.y = this.game.canvas.height - this.gabator.height;

        /** Bouton d'aide */
        this.help = this.game.add.button(
            this.game.uiScale(10),
            this.game.canvas.height - this.gabator.height - this.game.uiScale(15),
            'bouton_help', this.onHelp, this, 2, 1, 0); // Bouton aide
        this.help.scale.set(this.game.uiScale(0.6));
        this.help.visible = false;
    }

    /** Called when the game start */
    start() {
        this.gabator.loadTexture('gabator', 0); //gabator reveillé
        this.helpFeedback = new HelpModal({}, StackManager, Canvas.get('game'));
        this.help.visible = true;

        if(Type.isExist(Canvas.get('game'))
            && Type.isExist(Canvas.get('game').gameProcess)
            && Type.isExist(Canvas.get('game').gameProcess.quests)) {
            Canvas.get('game').gameProcess.quests.onNbQuestsDoneChange.add((nb) => this.help.visible = nb > 0, this);
        }
    }
    onHelp() {
        if(!Type.isExist(Canvas.get('game'))
        || !Type.isExist(Canvas.get('game').gameProcess)
        || !Type.isExist(Canvas.get('game').gameProcess.quests)) return;
        const quest = Canvas.get('game').gameProcess.quests.getFirstNotDone();
        if(!Type.isInstanceOf(quest, Quest)) return;

        this.helpFeedbackOnce = this.helpFeedbackOnce || new DoOnce((q) => {
                this.helpFeedback.title = q.name;
                this.helpFeedback.description = q.help;
                this.helpFeedback.toggle(true, {stack: 'BOTTOM_RIGHT', fixed:true});
                const close = () => {
                    this.helpFeedback.toggle(false, {stack: 'BOTTOM_RIGHT', fixed:true});
                    this.helpFeedbackOnce.done = false;
                    clearTimeout(timeOut);
                };
                const timeOut = setTimeout(close, 7000);
                this.helpFeedback.items.close.events.onInputDown.addOnce(close, this);
            });
        this.helpFeedbackOnce.call(quest);
    }
};
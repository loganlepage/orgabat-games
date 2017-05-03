"use strict";
import {Signal} from 'phaser';
import Canvas from "system/phaser/utils/PhaserManager";
import Feedback from "system/phaser/modals/Feedback";
import {TooltipManager, StackManager, Stack} from "system/phaser/Modal";

export default class PlayTest {

    static static_variable1 = "Variable statique";

    static get STATIC_FINAL_VARIABLE1() {
        return "Variable statique finale";
    }

    _firstname = "toto"; //variable privée par convention
    set toto(firstname) {
        this._firstname = firstname;
    } //
    get toto() {
        return this._firstname;
    }

    game; //facultatif

    onTalkEnd = new Signal();

    constructor(game) {
        this.game = game;
    }

    start() {
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        (async function(self) {
            self.info("Message de test");

            await sleep(2500);
            self.sayGabatorHello();

            await sleep(2500);
            self.alert("Derrière vous");

            await sleep(2500);
            self.confirm(() => {
                //Ok il a confirmé
                self.info("Très bien je note");
            });

            self.onTalkEnd.dispatch(); //déclenchement de l'event, pattern observer
        }(this));
    }

    sayGabatorHello() {
        console.log("sayGabatorHello");
        Canvas.get('gabator').modal.showHelp(
            "Gabator qui parle",
            "Hey salut ! \n" +
            "Ce message est fixe !"
        );
    }

    alert(text) {
        console.log("alert");
        const alert = new Feedback({}, StackManager, this.game);
        alert.setAlert(`Attention : ${text}!`);
        alert.toggle(true, {stack: 'BOTTOM_RIGHT'});
        setTimeout(() => {
            alert.toggle(false, {stack: 'BOTTOM_RIGHT'});
        }, 6000);
    }

    info(text) {
        console.log("info");
        const info = new Feedback({}, StackManager, this.game);
        info.setInfo(`Information : ${text}.`);
        info.toggle(true, {stack: 'BOTTOM_RIGHT'});
        setTimeout(() => {
            info.toggle(false, {stack: 'BOTTOM_RIGHT'});
        }, 6000);
    }

    confirm(callback) {
        console.log("confirm");
        Canvas.get('gabator').modal.showConfirm(
            "Confirmez",
            "Voulez-vous vraiment faire ça ?",
            callback
        );
    }
}
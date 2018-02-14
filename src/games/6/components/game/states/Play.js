/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager, Stack} from 'system/phaser/Modal';
import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';

import Truck from "../objects/Truck/Truck";
import Shelf from "../objects/Shelf/Shelf";
import Carriage from "../objects/Carriage/Carriage";
import Button from "../objects/Button/Button";
// import ItemFactory from "../objects/Item/ItemFactory";
import Item from "../objects/Item/Item";
import StepFactory from "../objects/Step/StepFactory";
import MapStepFactory from "../objects/MapStep/MapStepFactory";
import Config from "../config/data";

import TruckQuest from "../quests/TruckQuest";
import StepsQuest from "../quests/StepsQuest";

export default class Play extends State {

    /** Constructor for a new play state */
    constructor() {
        super();
    }

    /**
     * Called when the state must be created
     * init all the game (scale, physics, gameobjects...)
     */
     create() {
        this.game.controlsEnabled = false;
        this.game.stage.backgroundColor = '#f5f0d6';

        this.initUI();
        PhaserManager.ready('game', 'play');

        this.start();
    }

    /** Called by create to add UI Layers */
    initUI() {
        this.game.layer = {
            zDepth0: this.add.group(),
            zDepth1: this.add.group(),
            zDepth2: this.add.group(),
            zDepth3: this.add.group(),
            zDepthOverAll: this.add.group()
        };
    }

    /** Called by Phaser to render */
    render() {
        /*if(Config.developer.debug) {
            this.game.time.advancedTiming = true; //SEE FPS
            this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        }*/
    }

    /**
     * Called after create, to start the state
     * this.game Rules
     */
     start() {
        this.game.gameProcess = new GameProcess(this);
        this.game.gameProcess.init();
    }

};

class PartOne {

    finish = new Phaser.Signal();

    clickedSteps = 0;

    constructor(gameProcess) {
        this.game = gameProcess.game;
        this.gameProcess = gameProcess;
    }

    start() {
        this.gameProcess.quests.add(new StepsQuest(this.gameProcess.game));
        this.stepText = this.game.add.text(40 * this.game.SCALE, 40 * this.game.SCALE, `Sélectionner les conduites à tenir parmi la liste ci-dessous: ${this.clickedSteps}/8`, {fill: '#2a2a2a', fontSize: 30 * this.game.SCALE});
        this.addSteps();
        // Next step ->
        // this.addButton();
        // this.onQuestsCleaned(); // Shortcut
    }

    addSteps() {
        let healthMax = 4;
        this.stepGroup = new StepFactory(this.game, Config.steps);
        this.stepGroup.forEach((step) => {
            step.text1.inputEnabled = true;
            step.text1.input.useHandCursor = true;
            step.text1.tint = 0x9A9A9A;
            step.text1.events.onInputDown.add(function(){
                if (!step.clicked) {
                    if (step.check()){
                        this.clickedSteps++;
                        if (this.clickedSteps >= 8) {
                            this.addButton();
                        }
                    } else if (healthMax > 0){
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        healthMax--;
                    }
                    this.stepText.text = `Sélectionner les conduites à tenir parmi la liste ci-dessous: ${this.clickedSteps}/8`;
                }
            }, this);
        });
    }

    addButton() {
        this.partOneButton = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.partOneButton.sprite.events.onInputDown.add(this.onClickAction, this);
        this.gameProcess.quests._quests.steps_quest.done();
    }

    onClickAction() {
        this.onQuestsCleaned();
    }

    onQuestsCleaned() {
        this.removeElements();
        this.finish.dispatch();
    }

    removeElements() {
        this.removeText();
        this.removeButton();
    }

    removeText() {
        this.stepGroup.forEach((step) => {step.removeText()}, this);
        this.stepText.destroy();
        this.stepGroup = null;
    }

    removeButton() {
        this.partOneButton.destroy();
    }

}

class PartTwo {

    paintCapacity = 0;
    paintCapacityMax = 30;
    materialCapacity = 0;
    materialCapacityMax = 3;
    mapCapacity = 0;
    mapCapacityMax = 6;
    carriageCapacity = 0;
    carriageCapacityMax = 4;

    firstMap = true;

    finish = new Phaser.Signal();

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
        this.gameProcess.quests.add(new TruckQuest(this.gameProcess.game));
    }

    start() {
        this.addBackground();
        this.paintText = this.game.add.text(20 * this.game.SCALE, 20 * this.game.SCALE, `Quantité de peinture : ${this.paintCapacity}/${this.paintCapacityMax}`, {fontSize: 30*this.game.SCALE, fill: '#676565'});
        this.carriageText = this.game.add.text(this.game.world.width - 20 * this.game.SCALE, 20 * this.game.SCALE, `Capacité du chariot : ${this.carriageCapacity}/${this.carriageCapacityMax}`, {fontSize: 30*this.game.SCALE, fill: '#676565'});
        this.suppliesText = this.game.add.text(20 * this.game.SCALE, 60 * this.game.SCALE, `Matériels : ${this.materialCapacity}/3`, {fontSize: 30*this.game.SCALE, fill: '#676565'});
        this.coatText = this.game.add.text(20 * this.game.SCALE, 100 * this.game.SCALE, `Enduits : ${this.mapCapacity}/${this.mapCapacityMax}`, {fontSize: 30*this.game.SCALE, fill: '#676565'});
        this.carriageText.anchor.setTo(1, 0);
        this.game.layer.zDepth0.addChild(this.paintText);
        this.game.layer.zDepth0.addChild(this.suppliesText);
        this.game.layer.zDepth0.addChild(this.coatText);
        this.addTruck();
        this.addShelf();
        this.addCarriage();
        this.addItems();
        // this.gameProcess.questsCleaned.addOnce(this.onQuestsCleaned, this);
        // Finish game ->
        // this.mapSteps(); // To go to the end
        // this.addButton(); // To go to the end
    }

    onQuestsCleaned() {
        this.finish.dispatch();
    }

    addBackground(){
        this.bg = this.game.add.sprite(this.game.width, 0, "atlas", "jeu6/bg");
        this.bg.scale.set(this.game.SCALE);
        this.bg.anchor.setTo(1, 0);
        this.game.layer.zDepth0.addChild(this.bg);
    }

    addTruck() {
        this.truck = new Truck({
            game: this.game,
            x: 240 * this.game.SCALE,
            y: 500 * this.game.SCALE
        });
        this.game.layer.zDepth0.addChild(this.truck.sprite);
    }

    addShelf() {
        this.shelf = new Shelf({
            game: this.game,
            x: this.game.world.width / 1.9,
            y: 18
        });
        this.game.layer.zDepth0.addChild(this.shelf.sprite);
    }

    addCarriage() {
        this.carriage = new Carriage({
            game: this.game,
            x: 750 * this.game.SCALE,
            y: 500 * this.game.SCALE
        });
        this.nextPositionY = 0;
        this.game.layer.zDepth1.addChild(this.carriage.sprite);
        this.carriage.sprite.events.onDragStop.add(function (currentSprite) {
            if (this.carriage.checkOverlap(this.carriage.sprite, this.truck.sprite)){
                this.removeCarriageElements();
            }
        }, this);
    }

    addItems() {
        Canvas.get('gabator').modal.showHelp(
            "Il faut: un aspirateur, une ponceuse, une caisse à outils, 30L de peinture et 6 sacs d'enduit"
            );
        this.itemGroup = [];
        for (let type in Config.items) {
            for (let name in Config.items[type]) {
                this.itemGroup.push(
                    (new Item(this.game, Config.items[type][name].title, type,
                        Config.items[type][name].x * this.game.SCALE,
                        Config.items[type][name].y * this.game.SCALE,
                        Config.items[type][name].needed,
                        Config.items[type][name].clicked
                    )).sprite
                );
            }
        }
        this.addItemsAction();
    }

    addItemsAction() {
        this.itemGroup.forEach((item) => {
            item.addControls();
            item.events.onDragStop.add(function (currentSprite) {
                let name = currentSprite.frameName;
                if (name === "jeu6/peinture15l" && this.paintCapacity <= 15) {
                    if (item.obj.checkOverlap(currentSprite, this.truck.sprite)){
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        Canvas.get('gabator').modal.showHelp(
                            "Attention, ces pots de peinture sont trop hauts"
                            );
                        this.updateQuantity(currentSprite);
                    } else if (item.obj.checkOverlap(currentSprite, this.carriage.sprite)){
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        Canvas.get('gabator').modal.showHelp(
                            "Attention, ces pots de peinture sont trop hauts"
                            );
                        this.updateCarriage(currentSprite);
                    }
                } else if (name === "jeu6/peinture15l" && this.paintCapacity > 15) {
                    Canvas.get('gabator').modal.showHelp(
                        "Il y aura trop de peinture"
                        );
                    currentSprite.position.copyFrom(currentSprite.originalPosition);
                } else if (name === "jeu6/peinture5l" && this.paintCapacity <= 25) {
                    if (item.obj.checkOverlap(currentSprite, this.truck.sprite)){
                        this.updateQuantity(currentSprite);
                    } else if (item.obj.checkOverlap(currentSprite, this.carriage.sprite)){
                        this.updateCarriage(currentSprite);
                    }
                } else if (name === "jeu6/peinture5l" && this.paintCapacity > 25) {
                    Canvas.get('gabator').modal.showHelp(
                        "Il y aura trop de peinture"
                        );
                    currentSprite.position.copyFrom(currentSprite.originalPosition);
                } else if (name === "jeu6/map" && this.mapCapacity >= 6) {
                    Canvas.get('gabator').modal.showHelp(
                        "Il y aura trop d'enduit"
                        );
                    currentSprite.position.copyFrom(currentSprite.originalPosition);
                } else if (name === "jeu6/map" && this.mapCapacity < 6) {
                    if (item.obj.checkOverlap(currentSprite, this.truck.sprite)){
                        this.updateQuantity(currentSprite);
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        Canvas.get('gabator').modal.showHelp(
                            "Attention, il vaut mieux utiliser le chariot pour les objets lourds"
                            );
                    } else if (item.obj.checkOverlap(currentSprite, this.carriage.sprite)){
                        // console.log("Update carriage");
                        this.updateCarriage(currentSprite);
                    }
                } else if (name === "jeu6/aspirateur" || name === "jeu6/ponceuse" || name === "jeu6/caisse") {
                    if (item.obj.checkOverlap(currentSprite, this.truck.sprite)){
                        this.updateQuantity(currentSprite);
                    } else if (item.obj.checkOverlap(currentSprite, this.carriage.sprite)){
                        this.updateCarriage(currentSprite);
                    }
                } else {
                    if (item.obj.checkOverlap(currentSprite, this.truck.sprite)){
                        Canvas.get('gabator').modal.showHelp(
                            "L'élément n'est pas correct"
                            );
                    }
                }
            }, this);
        });
    }

    updateCarriage(currentSprite) {
        if (this.carriageCapacity < 4) {
            if (this.carriageCapacity == 0) {
                currentSprite.position.x = this.carriage.sprite.position.x - 10 * this.game.SCALE;
                currentSprite.position.y = this.carriage.sprite.position.y + 30 * this.game.SCALE;
            } else {
                if (currentSprite.frameName == "jeu6/map") {
                    this.nextPositionY += currentSprite.height/4;
                } else if (currentSprite.frameName == "jeu6/peinture15l") {
                    this.nextPositionY += currentSprite.height/2.25;
                } else {
                    this.nextPositionY += currentSprite.height/2;
                }
                currentSprite.position.x = this.carriage.sprite.position.x - 10 * this.game.SCALE;
                currentSprite.position.y = this.carriage.sprite.position.y + 30 * this.game.SCALE - this.nextPositionY;
            }
            this.carriage.sprite.addSpriteToMove(currentSprite);
            this.carriageCapacity++;
            this.carriageText.text = `Capacité du chariot : ${this.carriageCapacity}/${this.carriageCapacityMax}`;
        } else {
            Canvas.get('gabator').modal.showHelp(
                "Le chariot est plein"
            );
        }
    }

    removeCarriageElements(){
        let wrongElements = [];
        this.carriage.sprite.spritesToMove.forEach((element) => {
            this.updateQuantity(element);
        }, this);
        this.carriage.sprite.initElements();
        this.carriageCapacity = 0;
        this.carriageText.text = `Capacité du chariot : ${this.carriageCapacity}/${this.carriageCapacityMax}`;
        this.nextPositionY = 0;
    }

    updateQuantity(currentSprite) {
        let name = currentSprite.frameName;
        if (currentSprite.obj.check()) {
            if (name === "jeu6/peinture15l") {
                if (this.paintCapacity <= 15) {
                    this.paintCapacity += 15;
                    currentSprite.position.x = this.truck.sprite.position.x - 1000;
                    currentSprite.position.y = this.truck.sprite.position.y;
                    currentSprite.obj.charged = true;
                    this.checkQuantity();
                } else {
                    currentSprite.init();
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                    Canvas.get('gabator').modal.showHelp(
                        "Il y a trop de peinture"
                    );
                }
            } else if (name === "jeu6/peinture5l") {
                if (this.paintCapacity <= 25) {
                    this.paintCapacity += 5;
                    currentSprite.position.x = this.truck.sprite.position.x - 1000;
                    currentSprite.position.y = this.truck.sprite.position.y;
                    currentSprite.obj.charged = true;
                    this.checkQuantity();
                } else {
                    currentSprite.init();
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                    Canvas.get('gabator').modal.showHelp(
                        "Il y a trop de peinture"
                    );
                }
            } else if ((name === "jeu6/aspirateur" || name === "jeu6/ponceuse" || name === "jeu6/caisse")) {
                if (this.materialCapacity < 3) {
                    this.materialCapacity++;
                    currentSprite.position.x = this.truck.sprite.position.x - 1000;
                    currentSprite.position.y = this.truck.sprite.position.y;
                    currentSprite.obj.charged = true;
                    this.checkQuantity();
                } else {
                    currentSprite.init();
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                    Canvas.get('gabator').modal.showHelp(
                        "Il y a trop de matériel"
                    );
                }
            } else if (name === "jeu6/map") {
                if (this.firstMap) {
                    this.firstMap = false;
                    this.mapSteps();
                }
                if (this.mapCapacity <= 5) {
                    this.mapCapacity++;
                    currentSprite.position.x = this.truck.sprite.position.x - 1000;
                    currentSprite.position.y = this.truck.sprite.position.y;
                    currentSprite.obj.charged = true;
                    this.checkQuantity();
                } else {
                    currentSprite.init();
                    PhaserManager.get('gabator').stats.changeValues({
                        health: PhaserManager.get('gabator').stats.state.health - 1,
                    });
                    Canvas.get('gabator').modal.showHelp(
                        "Il y a trop de sac d'enduit"
                    );
                }
            } else {
                PhaserManager.get('gabator').stats.changeValues({
                    health: PhaserManager.get('gabator').stats.state.health - 1,
                });
                currentSprite.init();
            }
            return true;
        }
    }

    checkQuantity(){
        this.paintText.text = `Quantité de peinture : ${this.paintCapacity}/${this.paintCapacityMax}`;
        this.suppliesText.text = `Matériels : ${this.materialCapacity}/${this.materialCapacityMax}`;
        this.coatText.text = `Enduits : ${this.mapCapacity}/${this.mapCapacityMax}`;
        if (this.paintCapacity === 30 && this.materialCapacity === 3 && this.mapCapacity === 6) {
            this.addButton();
        }
    }

    addButton() {
        this.gameProcess.quests._quests.truck_quest.done();
        this.button = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.button.sprite.events.onInputDown.add(this.onClickAction, this);
    }

    onClickAction() {
        this.onQuestsCleaned();
    }

    mapSteps() {
        // Draw a rectangle
        this.graphics = this.game.add.graphics(0, 0);
        this.game.layer.zDepth1.addChild(this.graphics);
        this.graphics.lineStyle(0, "balck", 0);
        this.graphics.beginFill("black", 0.5);
        this.graphics.drawRect(0, 0, this.game.world.width, this.game.world.height);
        this.graphics.lineStyle(1, "balck", 0);
        this.addMapSteps();
    }

    addMapSteps() {
        this.mapStepGroup = new MapStepFactory(this.game, Config.mapSteps);
        this.disableControls();

        let currentPosition = 1;
        let finished = false;

        this.mapStepText = this.game.add.text(
            this.game.world.centerX, 
            125 * this.game.SCALE,
            `Sélectionner les 3 images permettant d’effectuer la manutention en sécurité. Respecter l’ordre chronologique: ${currentPosition}/3`, 
            {
                align: "center", 
                fill: '#ffffff',
                wordWrap: true,
                wordWrapWidth: this.game.world.width - (50 * this.game.SCALE)
            }
        );
        this.mapStepText.anchor.setTo(0.5);

        this.mapStepGroup.forEach((mapStep) => {
            mapStep.sprite.input.useHandCursor = true;
            mapStep.sprite.events.onInputDown.add(function(){
                if (!mapStep.validated) {
                    if (mapStep.check(currentPosition) && !finished){
                        currentPosition++;
                        this.mapStepText.text = `Sélectionner les 3 images permettant d’effectuer la manutention en sécurité. Respecter l’ordre chronologique: ${currentPosition}/3`;
                        mapStep.validate();
                    } else if (!mapStep.check(currentPosition) || !finished){
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        Canvas.get('gabator').modal.showHelp(
                            "Mauvaise étape sélectionnée"
                        );
                    }
                    if (currentPosition >= 4 && !finished) {
                        this.mapStepText.text = `Toutes les étapes ont été validées`;
                        finished = true;
                        this.addMapStepsButton();
                    }
                }
            }, this);
            this.game.layer.zDepthOverAll.addChild(mapStep.sprite);
        });
    }

    addMapStepsButton() {
        this.mapButton = new Button(this.game, this.game.world.centerX*2 - 100, this.game.world.centerY*2 - 50, null, this);
        this.mapButton.sprite.events.onInputDown.add(this.removeMapSteps, this);
        this.game.layer.zDepthOverAll.addChild(this.mapButton.sprite);
    }

    removeMapSteps() {
        this.addItemsAction();
        this.carriage.sprite.addControls();
        this.mapButton.destroy();
        this.mapStepText.destroy();
        this.graphics.destroy();
        this.mapStepGroup.forEach((mapStep) => {mapStep.destroy()}, this);
        this.mapStepGroup.destroy();
        this.mapStepGroup = null;
    }

    disableControls() {
        this.carriage.sprite.removeControls();
        this.itemGroup.forEach((item) => {
            item.events.onDragStop.removeAll();
            item.events.onInputDown.removeAll();
            item.inputEnabled = false;
            item.input.useHandCursor = false;
        });
    }

}

class GameProcess {

    questsCleaned = new Phaser.Signal();

    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
        this.game.camera.y = this.game.camera.height;

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new DomQuestList(this.quests);

        this.partOne = new PartOne(this);
        this.partTwo = new PartTwo(this);
    }

    init() {
        //On affiche la modale d'information du début
        this.startInfoModal = new StartInfoModal({}, DefaultManager, this.game);
        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.addOnce(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.addOnce(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.iconA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.items.close.items.textA.events.onInputDown.add(this._onStartInfoClose, this);
        this.startInfoModal.onDeleted.addOnce(() => {
            delete this.startInfoModal
        }, this);
        this.startInfoModal.toggle(true);
    }

    _onStartInfoClose() {
        //On active Gabator
        if (PhaserManager.get('gabator').state.current == "play") {
            PhaserManager.get('gabator').state.getCurrentState().start();
            Canvas.get('gabator').modal.showHelp(
                "Attention à l'intégrité physique"
                );
        }

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);

        this._initParts();

        //Evenements de progression du jeu ici (voir jeu 1 ou jeu 2)

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.game.controlsEnabled = true;

        this._timeStart = this.game.time.now;
    }

    _initParts() {
        //When ready, lets init parts.
        this.partOne.finish.addOnce(this.partTwo.start, this.partTwo);
        this.partTwo.finish.addOnce(this._onFinish, this);
        this.partOne.start();
    }

    _onFinish() {
        this.game.controlsEnabled = false;
        this._timeEnd = this.game.time.now;

        //On affiche la modale de fin
        const endInfoModal = new EndInfoModal({}, DefaultManager, this.game, {
            healthMax: PhaserManager.get('gabator').stats.healthMax,
            organizationMax: PhaserManager.get('gabator').stats.organizationMax,
            enterpriseMax: PhaserManager.get('gabator').stats.enterpriseMax
        });
        endInfoModal.onExit.addOnce(() => window.parent.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        let healthLevel = PhaserManager.get('gabator').stats.state.health;
        let healthLevelMax = PhaserManager.get('gabator').stats.healthMax;
        endInfoModal.toggle(true, {}, {
            star1: this.quests.get('steps_quest').isDone,
            star2: this.quests.get('truck_quest').isDone,
            star3: healthLevel == healthLevelMax ? true : false
        }, {
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            enterprise: PhaserManager.get('gabator').stats.state.enterprise,
        });

        //Et on envoie le score à l'API
        window.api.sendScore({
            exerciseId: game_id,
            time: Math.round((this._timeEnd - this._timeStart) / 1000),
            health: PhaserManager.get('gabator').stats.state.health,
            organization: PhaserManager.get('gabator').stats.state.organization,
            business: PhaserManager.get('gabator').stats.state.enterprise
        }, () => {
        });
    }
}
/** State when we start the game */
"use strict";
import Phaser, {State, Easing} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager, Stack} from 'system/phaser/Modal';

import QuestManager, {DomQuestList} from 'system/phaser/utils/Quest';
import Config from "../config/data";

import ResponseFactory from "../objects/Response/ResponseFactory";
import Background from "../objects/Background/Background";

import CareStepsQuest from "../quests/CareStepsQuest";
import NumbersQuest from "../quests/NumbersQuest";
import RescueQuest from "../quests/RescueQuest";
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
        this.game.stage.backgroundColor = '#FFFFFF';
        this.tileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, "atlas");
        this.tileSprite.tileScale.set(this.game.SCALE * 1.2);
        this.tileSprite.alpha = 0.3;
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

class ScreenOne {

    finish = new Phaser.Signal();
    emergencyCare = new Phaser.Signal();
    emergencyCall = new Phaser.Signal();
    emergencyDrive = new Phaser.Signal();

    title = "";

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
        this.gameProcess.quests.add(new RescueQuest(this.gameProcess.game));
    }

    start() {
        let text = `Paul est salarié depuis 3 ans dans l’entreprise Bâtiplus. Actuellement, il travaille sur un chantier 
où dix maisons individuelles sont en cours de construction. Il manutentionne des parpaings afin 
d’approvisionner le poste de travail d’un collègue. Soudain, il glisse et se coupe profondément à la cuisse. 
Que faire ?`;
        this.title = this.game.add.text(this.game.world.centerX, 25 * this.game.SCALE, text, {font: 'Arial', fontSize: 25 * this.game.SCALE, fill: '#000000', align:'center'});
        this.title.anchor.setTo(0.5, 0);

        this.game.responseGroup = new ResponseFactory(this.game, Config.screenOne);
        this.game.responseGroup.forEach((item) => {
            if (item.obj.key == "pratiquer") {
                item.events.onInputDown.add(this.care, this);
            }
            if (item.obj.key == "appeller") {
                item.events.onInputDown.add(this.call, this);
            }
            if (item.obj.key == "transporter") {
                item.events.onInputDown.add(this.drive, this);
            }
        });

        // console.log("1");
        // this.care(); // Shortcut with care step
        // this.call(); // Shortcut with call step

    }

    call() {
        this.removeResponses();
        this.emergencyCall.dispatch();
    }

    care() {
        this.removeResponses();
        this.emergencyCare.dispatch();
    }

    drive() {
        this.removeResponses();
        let healthMax = PhaserManager.get('gabator').stats.healthMax;
        let organizationMax = PhaserManager.get('gabator').stats.organizationMax;
        let enterpriseMax = PhaserManager.get('gabator').stats.enterpriseMax;
        PhaserManager.get('gabator').stats.changeValues({
            health: PhaserManager.get('gabator').stats.state.health - healthMax,
            organization: PhaserManager.get('gabator').stats.state.organization - organizationMax,
            enterprise: PhaserManager.get('gabator').stats.state.enterprise - enterpriseMax
        });
        this.emergencyDrive.dispatch();
    }

    removeResponses() {
        this.title.destroy();
        this.game.responseGroup.destroy();
    }

}

class ScreenTwo {

    finish = new Phaser.Signal();
    fail = new Phaser.Signal();

    title = "";

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
    }

    start() {
        let text = `As-tu ta formation SST ?`;
        this.title = this.game.add.text(this.game.world.centerX, 25 * this.game.SCALE, text, {font: 'Arial', fontSize: 25 * this.game.SCALE, fill: '#000000', align:'center'});
        this.title.anchor.setTo(0.5, 0);

        this.game.responseGroup = new ResponseFactory(this.game, Config.screenTwo);
        this.game.responseGroup.forEach((item) => {
            if (item.obj.key == "oui") {
                item.events.onInputDown.add(this.correct, this);
            }
            if (item.obj.key == "non") {
                item.events.onInputDown.add(this.notCorrect, this);
            }
        });

        Canvas.get('gabator').modal.showHelp(
            "Attention, il faut la formation SST pour pratiquer les premiers secours "
        );

        // console.log("2");
        // this.correct(); // To finish this screen

    }

    correct() {
        this.removeResponses();
        this.finish.dispatch();
    }

    notCorrect() {
        this.removeResponses();
        PhaserManager.get('gabator').stats.changeValues({
            enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1
        });
        this.fail.dispatch();
    }

    removeResponses() {
        this.title.destroy();
        this.game.responseGroup.destroy();
    }

}

class ScreenThree {

    finish = new Phaser.Signal();
    correct_answers_count = 0;
    shapes = [];
    title;
    background;
    gameProcess;
    game;

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
    }

    start() {
        this.gameProcess.quests.add(new CareStepsQuest(this.gameProcess.game));

        let text = `Remet les quatre étapes, par ordre chronologique, de l’intervention du SST.`;
        this.title = this.game.add.text(this.game.world.centerX, 25 * this.game.SCALE, text, {font: 'Arial', fontSize: 25 * this.game.SCALE, fill: '#000000', align:'center'});
        this.title.anchor.setTo(0.5, 0);

        this.background = new Background(this.game, this.game.world.centerX, 350 * this.game.SCALE, "steps/bg");
        this.game.layer.zDepth0.addChild(this.background.sprite);
        
        this.game.responseGroup = new ResponseFactory(this.game, Config.screenThree);
        this.addShapes(this.background);
        this.addResponsesActions();

        // console.log("3");
        // this.questCleaned(); // To finish this screen
    }

    addResponsesActions() {
        this.game.responseGroup.forEach((item) => {
            item.input.enableDrag(false, true);
            item.events.onDragStop.add(function (currentSprite) {
                switch(currentSprite.obj.position){
                    case 1:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[0])) {
                            currentSprite.position.x = this.shapes[0].position.x;
                            currentSprite.position.y = this.shapes[0].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 0 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 2:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[1])) {
                            currentSprite.position.x = this.shapes[1].position.x;
                            currentSprite.position.y = this.shapes[1].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 1 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 3:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[2])) {
                            currentSprite.position.x = this.shapes[2].position.x;
                            currentSprite.position.y = this.shapes[2].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 2 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 4:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[3])) {
                            currentSprite.position.x = this.shapes[3].position.x;
                            currentSprite.position.y = this.shapes[3].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 3 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    default:
                        currentSprite.position.copyFrom(currentSprite.originalPosition);
                        break;
                }
                if (this.correct_answers_count >= 4) {
                    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.questCleaned, this);
                }
            }, this);
        }, this);
    }

    removeResponses() {
        this.background.sprite.destroy();
        this.title.destroy();
        this.game.responseGroup.destroy();
    }

    addShapes(element) {
        let x = element.x, 
            y = element.y,
            // y2 = y + 15,
            y2 = y,

            width = element.sprite.width,
            number = this.game.responseGroup.number,

            margin = (width / number)/2,

            x1 = x - width/2 + margin,
            x2 = x - width / 2 + 3 * margin,
            x3 = x - width / 2 + 5 * margin,
            x4 = x - width / 2 + 7 * margin,

            fill = false,
            radius = 100;

        this.shapes[0] = this.game.add.graphics(x1, y2);
        if (fill) {
            this.shapes[0].beginFill(0xFF0000, .5);
        }
        this.shapes[0].drawCircle(0, 0, radius);

        this.shapes[1] = this.game.add.graphics(x2, y2);
        if (fill) {
            this.shapes[1].beginFill(0xFF0000, .5);
        }
        this.shapes[1].drawCircle(0, 0, radius);

        this.shapes[2] = this.game.add.graphics(x3, y2);
        if (fill) {
            this.shapes[2].beginFill(0xFF0000, .5);
        }
        this.shapes[2].drawCircle(0, 0, radius);

        this.shapes[3] = this.game.add.graphics(x4, y2);
        if (fill) {
            this.shapes[3].beginFill(0xFF0000, .5);
        }
        this.shapes[3].drawCircle(0, 0, radius);
    }

    removeShapes() {
        this.shapes.map(function(shape) {
            return shape.destroy();
        });
    }

    wrongAnswer() {
        // Canvas.get('gabator').modal.showHelp(
        //     "Mauvaise réponse"
        // );
        PhaserManager.get('gabator').stats.changeValues({
            health: PhaserManager.get('gabator').stats.state.health - 1,
            organization: PhaserManager.get('gabator').stats.state.organization - 1,
        });
    }

    questCleaned () {
        this.removeResponses();
        this.removeShapes();
        this.gameProcess.quests._quests.care_steps_quest.done();
        this.finish.dispatch();
    }

}

class ScreenFour {

    finish = new Phaser.Signal();
    correct_answers_count = 0;
    shapes = [];
    title;
    background;
    gameProcess;
    game;

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
    }

    start() {
        this.gameProcess.quests.add(new StepsQuest(this.gameProcess.game));

        let text = `Paul a été pris en charge par les secours. Il te demande conseil sur la procédure en cas d’accident du travail, 
car c’est la premiè̀re fois pour lui. Fais glisser sur les schémas les différents acteurs :`;
        this.title = this.game.add.text(this.game.world.centerX, 25 * this.game.SCALE, text, {font: 'Arial', fontSize: 25 * this.game.SCALE, fill: '#000000', align:'center'});
        this.title.anchor.setTo(0.5, 0);

        this.background = new Background(this.game, this.game.world.centerX, 350 * this.game.SCALE, "process/bg");
        this.game.layer.zDepth0.addChild(this.background.sprite);

        this.game.responseGroup = new ResponseFactory(this.game, Config.screenFour);
        this.addShapes(this.background);
        this.addResponsesActions();

        // console.log("4");
        // this.questCleaned(); // To finish this screen
    }

    addResponsesActions() {
        this.game.responseGroup.forEach((item) => {
            item.input.enableDrag(false, true);
            item.position.y += 150;
            item.cloneOriginalPosition();
            // To do: vérifier la perte de scope dans "item.events.onDragStop.add"
            item.events.onDragStop.add(function(currentSprite) {
                switch(currentSprite.obj.position){
                    case 1:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[0])) {
                            currentSprite.position.x = this.shapes[0].position.x;
                            currentSprite.position.y = this.shapes[0].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 0 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 2:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[1])) {
                            currentSprite.position.x = this.shapes[1].position.x;
                            currentSprite.position.y = this.shapes[1].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 1 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 3:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[2])) {
                            currentSprite.position.x = this.shapes[2].position.x;
                            currentSprite.position.y = this.shapes[2].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 2 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 4:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[3])) {
                            currentSprite.position.x = this.shapes[3].position.x;
                            currentSprite.position.y = this.shapes[3].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (var shape in this.shapes) {
                                if (shape != 3 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    default:
                        currentSprite.position.copyFrom(currentSprite.originalPosition);
                        break;
                }
                if (this.correct_answers_count >= 4) {
                    // this.questCleaned();
                    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.questCleaned, this);
                }
            }, this);
        }, this);
    }

    removeResponses() {
        this.background.sprite.destroy();
        this.title.destroy();
        this.game.responseGroup.destroy();
    }

    addShapes(element) {
        let x = element.x, 
            y = element.y,

            x1 = x - 330 * this.game.SCALE,
            y1 = y - 0 * this.game.SCALE,

            x2 = x + 90 * this.game.SCALE,
            y2 = y - 0 * this.game.SCALE,

            x3 = x + 320 * this.game.SCALE,
            y3 = y - 170 * this.game.SCALE,

            x4 = x + 320 * this.game.SCALE,
            y4 = y + 170 * this.game.SCALE,

            fill = false,
            radius = 80 * this.game.SCALE;

        // CPAM
        this.shapes[0] = this.game.add.graphics(x1, y1);
        if (fill) {
            this.shapes[0].beginFill(0xFF0000, .5);
        }
        this.shapes[0].drawCircle(0, 0, radius);

        // Médecin
        this.shapes[1] = this.game.add.graphics(x2, y2);
        if (fill) {
            this.shapes[1].beginFill(0xFF0000, .5);
        }
        this.shapes[1].drawCircle(0, 0, radius);

        // Salarié
        this.shapes[2] = this.game.add.graphics(x3, y3);
        if (fill) {
            this.shapes[2].beginFill(0xFF0000, .5);
        }
        this.shapes[2].drawCircle(0, 0, radius);

        // Employeur
        this.shapes[3] = this.game.add.graphics(x4, y4);
        if (fill) {
            this.shapes[3].beginFill(0xFF0000, .5);
        }
        this.shapes[3].drawCircle(0, 0, radius);
    }

    removeShapes() {
        this.shapes.map(function(shape) {
            return shape.destroy();
        });
    }

    questCleaned() {
        this.removeResponses();
        this.removeShapes();
        this.gameProcess.quests._quests.steps_quest.done();
        this.gameProcess.quests._quests.rescue_quest.done();
        this.finish.dispatch();
    }

    wrongAnswer(){
        // Canvas.get('gabator').modal.showHelp(
        //     "Mauvaise réponse"
        // );
        PhaserManager.get('gabator').stats.changeValues({
            health: PhaserManager.get('gabator').stats.state.health - 1,
            organization: PhaserManager.get('gabator').stats.state.organization - 1,
        });
    }

}

class ScreenFive {

    finish = new Phaser.Signal();
    correct_answers_count = 0;
    shapes = [];
    title;
    background;
    gameProcess;
    game;

    constructor(gameProcess) {
        this.gameProcess = gameProcess;
        this.game = gameProcess.game;
    }

    start() {
        this.gameProcess.quests.add(new NumbersQuest(this.gameProcess.game));

        let text = `Fais glisser le numéro corespondant aux urgences associées:`;
        this.title = this.game.add.text(this.game.world.centerX, 25 * this.game.SCALE, text, {font: 'Arial', fontSize: 25 * this.game.SCALE, fill: '#000000', align:'center'});
        this.title.anchor.setTo(0.5, 0);

        this.background = new Background(this.game, this.game.world.centerX, 350 * this.game.SCALE, "numbers/bg");
        this.background.sprite.scale.set(this.game.SCALE * 1.2);
        this.game.layer.zDepth0.addChild(this.background.sprite);
        this.game.responseGroup = new ResponseFactory(this.game, Config.screenFive);

        this.addShapes(this.background);
        this.addResponsesActions();

        // console.log("5");
        // this.questCleaned(); // To finish this screen
    }

    addResponsesActions() {
        // let self = this;
        this.game.responseGroup.forEach((item) => {
            item.input.enableDrag(false, true);
            item.scale.set(this.game.SCALE * 1.4);
            item.position.y += 150;
            item.cloneOriginalPosition();
            item.inputEnabled = true;
            item.events.onDragStop.add(function (currentSprite) {
                switch(currentSprite.obj.position){
                    case 1:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[0])) {
                            currentSprite.position.x = this.shapes[0].position.x;
                            currentSprite.position.y = this.shapes[0].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (let shape in this.shapes) {
                                if (shape != 0 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 2:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[1])) {
                            currentSprite.position.x = this.shapes[1].position.x;
                            currentSprite.position.y = this.shapes[1].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (let shape in this.shapes) {
                                if (shape != 1 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 3:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[2])) {
                            currentSprite.position.x = this.shapes[2].position.x;
                            currentSprite.position.y = this.shapes[2].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (let shape in this.shapes) {
                                if (shape != 2 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    case 4:
                        if (item.obj.checkOverlap(currentSprite, this.shapes[3])) {
                            currentSprite.position.x = this.shapes[3].position.x;
                            currentSprite.position.y = this.shapes[3].position.y;
                            this.correct_answers_count ++;
                        } else {
                            for (let shape in this.shapes) {
                                if (shape != 3 && item.obj.checkOverlap(currentSprite, this.shapes[shape])) {
                                    this.wrongAnswer();
                                }
                            }
                        }
                        break;
                    default:
                        currentSprite.position.copyFrom(currentSprite.originalPosition);
                        break;
                }
                if (this.correct_answers_count >= 4) {
                    // this.questCleaned();
                    this.game.time.events.add(Phaser.Timer.SECOND * 1, this.questCleaned, this);
                }
            }, this);
        }, this);
    }

    removeResponses() {
        this.background.sprite.destroy();
        this.title.destroy();
        this.game.responseGroup.destroy();
    }

    addShapes(element) {
        let x = element.x, 
            y = element.y,

            x1 = x + 85 * this.game.SCALE,
            y1 = y - 115 * this.game.SCALE,

            x2 = x + 150 * this.game.SCALE,
            y2 = y - 10 * this.game.SCALE,

            x3 = x + 200 * this.game.SCALE,
            y3 = y + 100 * this.game.SCALE,

            x4 = x + 175 * this.game.SCALE,
            y4 = y + 210 * this.game.SCALE,

            // Pour afficher les zones de drag n drop
            fill = false,
            radius = 20 * this.game.SCALE;

        // Samu
        this.shapes[0] = this.game.add.graphics(x1, y1);
        if (fill) {
            this.shapes[0].beginFill(0xFF0000, .5);
        }
        this.shapes[0].drawCircle(0, 0, radius);

        // Pompiers
        this.shapes[1] = this.game.add.graphics(x2, y2);
        if (fill) {
            this.shapes[1].beginFill(0xFF0000, .5);
        }
        this.shapes[1].drawCircle(0, 0, radius);

        // Police
        this.shapes[2] = this.game.add.graphics(x3, y3);
        if (fill) {
            this.shapes[2].beginFill(0xFF0000, .5);
        }
        this.shapes[2].drawCircle(0, 0, radius);

        // Unique
        this.shapes[3] = this.game.add.graphics(x4, y4);
        if (fill) {
            this.shapes[3].beginFill(0xFF0000, .5);
        }
        this.shapes[3].drawCircle(0, 0, radius);
    }

    removeShapes() {
        this.shapes.map(function(shape) {
            return shape.destroy();
        });
    }

    wrongAnswer() {
        // Canvas.get('gabator').modal.showHelp(
        //     "Mauvaise réponse"
        // );
        PhaserManager.get('gabator').stats.changeValues({
            health: PhaserManager.get('gabator').stats.state.health - 1,
            enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1,
        });
    }

    questCleaned () {
        this.removeResponses();
        this.removeShapes();
        this.gameProcess.quests._quests.numbers_quest.done();
        this.finish.dispatch();
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

        // Parties à utiliser
        this.screenOne = new ScreenOne(this);
        this.screenTwo = new ScreenTwo(this);
        this.screenThree = new ScreenThree(this);
        this.screenFour = new ScreenFour(this);
        this.screenFive = new ScreenFive(this);
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
            // Canvas.get('gabator').modal.showHelp(
            //     "..."
            // );
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
        this.screenOne.emergencyCall.addOnce(this.screenFive.start, this.screenFive);
        this.screenOne.emergencyCare.add(this.screenTwo.start, this.screenTwo); // Peut être réalisée plusieurs fois
        this.screenOne.emergencyDrive.addOnce(this._onFinish, this);

        this.screenTwo.finish.addOnce(this.screenThree.start, this.screenThree);
        this.screenTwo.fail.add(this.screenOne.start, this.screenOne); // Peut être réalisée plusieurs fois

        // this.screenThree.finish.addOnce(this.screenFour.start, this.screenFour);
        this.screenThree.finish.addOnce(this.screenFive.start, this.screenFive);

        this.screenFive.finish.addOnce(this.screenFour.start, this.screenFour);

        this.screenFour.finish.addOnce(this._onFinish, this);

        this.screenOne.start();
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

        // Étoiles:
        let healthLevel = PhaserManager.get('gabator').stats.state.health;
        let healthLevelMax = PhaserManager.get('gabator').stats.healthMax;
        let careStepsBoolean = this.quests._quests.care_steps_quest != undefined ? this.quests._quests.care_steps_quest._done : false;
        let rescueBoolean = this.quests._quests.rescue_quest != undefined ? this.quests._quests.rescue_quest._done : false;

        let starValue1 = rescueBoolean;
        let starValue2 = healthLevel == healthLevelMax || careStepsBoolean ? true : false ;
        let starValue3 = healthLevel == healthLevelMax && careStepsBoolean ? true : false ;

        endInfoModal.toggle(true, {}, {
            star1: starValue1,
            star2: starValue2,
            star3: starValue3
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
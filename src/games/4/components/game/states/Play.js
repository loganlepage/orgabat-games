/** State when we start the game */
"use strict";
import Phaser, {State, Easing, Point} from 'phaser';
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Canvas from "system/phaser/utils/PhaserManager";

import StartInfoModal from '../modals/StartInfoModal';
import EndInfoModal from '../modals/EndInfoModal';
import {DefaultManager} from 'system/phaser/Modal';

import QuestManager, {GuiQuestList} from 'system/phaser/utils/Quest';
import Truck from "../objects/Truck/Truck";

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
        this.game.stage.backgroundColor = '#34495e';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);    

        this.initUI();
        this.addTruck();
        this.addCopyTruck();
        //initialissation des éléments de la scène ici (voir jeu 1 ou jeu 2)
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

    addTruck() {
        this.truck = new Truck({game:this.game,
                                x:this.game.world.centerX, 
                                y: this.game.world.centerY + 300});
        this.game.physics.arcade.enable(this.truck);
        this.truck.sprite.input.draggable = false;
        this.truck.sprite.inputEnabled = false;
    }

    addCopyTruck() {
//        x: Math.floor(Math.random() - largeur du jeu - taille du sprite) + 1 apparition random d'un sprite
        this.truckCopy = new Truck({
            game: this.game,
            x:200
        });
        this.truckCopy.angle = 45;
        this.game.physics.arcade.enable(this.truckCopy);
        this.truckCopy.sprite.originalPosition = this.truckCopy.sprite.position.clone();
        this.truckCopy.sprite.events.onDragStop.add(function(currentSprite){
            this.checkOverlap(currentSprite, this.truck.sprite);
        }, this);
    }

    checkOverlap(spriteA, spriteB) {
        let boundsA = spriteA.getBounds(),
            boundsB = spriteB.getBounds();
        if(Phaser.Rectangle.intersects(boundsA,boundsB)){
            spriteA.input.draggable = false;
            spriteA.position.copyFrom(spriteB.position); 
            spriteA.anchor.setTo(spriteB.anchor.x, spriteB.anchor.y);   
        }
        else
            spriteA.position.copyFrom(spriteA.originalPosition);
    }


    /** Called by Phaser to update */
    update() {

    }

    /** Called by Phaser to render */
    render() {
        //if(Config.developer.debug) {
        this.game.time.advancedTiming = true; //SEE FPS
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        // }
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

class GameProcess {
    constructor(playState) {
        this.play = playState;
        this.game = playState.game;
        this.game.camera.y = this.game.camera.height;

        //Animation de la caméra
        //On ajuste sa durée par rapport au mouvement à effectuer (peut être égal à 0)
        this.bootTweenTime = (this.game.world.height - this.game.camera.height) * 4.5;
        this.bootTween = this.game.add.tween(this.game.camera).to({
            y: this.game.canvas.height
        }, this.bootTweenTime, Easing.Quadratic.InOut, false, 600);

        //On prépare les quêtes
        this.quests = new QuestManager(this.game);
        new GuiQuestList(this.game.canvas.width - 10, 30, this.quests, this.game);
        this.quests.add(new ChargeTruck(this.game));
    }

    init() {
        if (this.bootTweenTime > 0) this.bootTween.start().onComplete.add(() => this._onAnimationEnd());
        else this._onAnimationEnd();
    }

    _onAnimationEnd() {
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
        if (PhaserManager.get('gabator').state.current == "play"){
            PhaserManager.get('gabator').state.getCurrentState().start();
                Canvas.get('gabator').modal.showHelp(
            `
Rappele toi,\nle camion peut supporter jusqu'à 30 éléments.
`
        );
        }

        this.game.keys.addKey(Phaser.Keyboard.ENTER).onDown.remove(this._onStartInfoClose, this);
        this.game.keys.addKey(Phaser.Keyboard.A).onDown.remove(this._onStartInfoClose, this);


        //Evenements de progression du jeu ici (voir jeu 1 ou jeu 2)

        //Ferme la modale et active les controls
        this.startInfoModal.toggle(false, {});
        this.game.controlsEnabled = true;

        this._timeStart = this.game.time.now;
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
        endInfoModal.onExit.addOnce(() => window.closeGameModal(), this);
        endInfoModal.onReplay.addOnce(() => window.location.reload(), this);
        endInfoModal.toggle(true, {}, {
            star1: false,
            star2: false,
            star3: false
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
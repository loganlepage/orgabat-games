"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ResponseSprite from "./ResponseSprite";
import PhaserManager from 'system/phaser/utils/PhaserManager';
import Phaser from 'phaser';
import {Signal} from "phaser";

export default class Response extends BasicGameObject {

    onDropped = new Signal();

    constructor(game, x, y, repo, key, isUsed, point) {
        super(game);
        this.x = x;
        this.y = y;
        this.repo = repo;
        this.key = key;
        this.isUsed = isUsed;
        this.point = point;
        this.addSprite(new ResponseSprite(this.game, this.x, this.y, this.repo, this.key, this));
        this.addControls();
        this.validated = false;
    }

    validate(){
        this.validated = true;
        this.removeControls();
    }

    addControls(){
        this.sprite.input.useHandCursor = true;
        this.sprite.input.enableDrag(true, true);
        this.sprite.inputEnabled = true;
    }

    removeControls(){
        this.sprite.input.useHandCursor = false;
        this.sprite.input.enableDrag(false, false);
        this.sprite.inputEnabled = false;
    }

    checkOverlap(currentSprite, shapeToOverlap) {
        if (!currentSprite.obj.validated) {
            let boundsA = currentSprite.getBounds(),
                boundsB = shapeToOverlap.getBounds();
            if (Phaser.Rectangle.intersects(boundsA, boundsB) && shapeToOverlap.answers.includes(currentSprite.link)) {
                currentSprite.obj.validate();
                currentSprite.position.copyFrom(shapeToOverlap.position);
                shapeToOverlap.destroy();
                this.onDropped.dispatch(currentSprite);
            } else if (Phaser.Rectangle.intersects(boundsA, boundsB) && !shapeToOverlap.answers.includes(currentSprite.link)) {
                currentSprite.position.copyFrom(currentSprite.originalPosition);
                switch(this.point){
                    case 'organization':
                        PhaserManager.get('gabator').stats.changeValues({
                            organization: PhaserManager.get('gabator').stats.state.organization - 1,
                        });
                        break;
                    case 'enterprise':
                        PhaserManager.get('gabator').stats.changeValues({
                            enterprise: PhaserManager.get('gabator').stats.state.enterprise - 1,
                        });
                        break;
                    default:
                        PhaserManager.get('gabator').stats.changeValues({
                            health: PhaserManager.get('gabator').stats.state.health - 1,
                        });
                        break;
                }
            } else {
                currentSprite.position.copyFrom(currentSprite.originalPosition);
            }
        }
    }
}
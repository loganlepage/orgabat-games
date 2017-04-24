"use strict";
import Type from "system/utils/Type";
import Modal from "system/phaser/Modal";
import WasteTooltip from "./WasteTooltip";
import {TooltipManager} from "system/phaser/Modal";
import {Signal} from "phaser";


/** Description Tooltip Modal */
export default class WasteActionModal extends Modal {

    data;
    isTooltipUsable = true;
    onClick = new Signal();

    /**
     * Constructor for a new modal
     * @param data
     * @param manager
     * @param game
     */
    constructor(data, manager, game) {
        super(Type.deepMerge(WasteActionModal.pattern, {items: {image: {key: `jeu3/actions/${data.name}`}}}), manager, game);
        this.data = data;
        this.initEvents(this.items.image);
    }

    initEvents(image) {
        image.events.onInputOver.add(() => {
            this.game.canvas.style.cursor = "pointer";
            this.showTooltip();
            this.items.image.alpha = 0.8;
        }, this);
        image.events.onInputOut.add(() => {
            this.game.canvas.style.cursor = "default";
            this.items.image.alpha = 1;
        }, this);
        image.events.onInputDown.add(() => {
            this.onClick.dispatch(this);
        }, this);
    }

    showTooltip() {
        if(!this.isTooltipUsable) return;
        this.isTooltipUsable = false;
        const tooltip = new WasteTooltip({items: {
            name: { text: this.data.info }
        }}, TooltipManager, this.game);

        /** Events */
        this.items.image.events.onInputOut.addOnce(()=>{tooltip.toggle(false)}, tooltip);
        tooltip.onDeleted.addOnce(()=>{
            this.isTooltipUsable = true;
        }, this);

        /** UI */
        tooltip.x = this.items.image.width / 2;
        tooltip.y = this.items.image.height + this.game.uiScale(12);
        tooltip.toggle(true, {},
            (err) => { if(err.code === 403) {
                tooltip.delete(); //Si on a créé un objet non utilisé
                this.isShowMouseUsable = true;
            }});
        this.addChild(tooltip);
    }

    static get pattern() {
        return {
            type: "group",
            items: {
                image: {
                    type: "sprite",
                    key: "[changer cette clé]",
                    props: {scale: 0.297, inputEnabled: true}
                }
            }
        }
    }
};
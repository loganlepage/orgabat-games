var Game = Game || {};
Game.Vendor = Game.Vendor || {};

Game.Vendor.Modal = function (game) {

    /**
     * Use: https://github.com/netgfx/phaser_modals/blob/master/examples/example1/js/index.js
     */

    var _this = this;

    game.modals = {};

    return {

        createModal: function (options) {

            var type = options.type || ''; // must be unique
            var includeBackground = options.includeBackground; // maybe not optional
            var backgroundColor = options.backgroundColor || "0x000000";
            var backgroundOpacity = options.backgroundOpacity === undefined ? 0.7 : options.backgroundOpacity;

            var modalCloseOnInput = options.modalCloseOnInput || false;
            var modalBackgroundCallback = options.modalBackgroundCallback || false;
            var vCenter = options.vCenter || false;
            var hCenter = options.hCenter || false;
            var itemsArr = options.itemsArr || [];
            var fixedToCamera = options.fixedToCamera || false;
            /**var vPadding = options.vPadding || 20;*/

                /////////////////////////////////////////////////////////////////////

            var modal;
            var modalGroup = game.add.group();
            if (fixedToCamera === true) {
                modalGroup.fixedToCamera = true;
                modalGroup.cameraOffset.x = 0;
                modalGroup.cameraOffset.y = 0;
                modalGroup.vCenter = vCenter;
                modalGroup.hCenter = hCenter;
            }

            if (includeBackground === true) {
                modal = game.add.graphics(game.width, game.height);
                modal.beginFill(backgroundColor, backgroundOpacity);
                modal.x = 0;
                modal.y = 0;

                modal.drawRect(0, 0, game.width, game.height);
                if (modalCloseOnInput === true) {
                    var innerModal = game.add.sprite(0, 0);
                    innerModal.inputEnabled = true;
                    innerModal.width = game.width;
                    innerModal.height = game.height;
                    innerModal.type = type;
                    innerModal.input.priorityID = 0;
                    innerModal.events.onInputDown.add(function (e, pointer) {
                        this.hideModal(e.type);
                    }, _this, 2);

                    modalGroup.add(innerModal);
                } else {
                    modalBackgroundCallback = true;
                }
            }

            if (modalBackgroundCallback) {
                var innerModal = game.add.sprite(0, 0);
                innerModal.inputEnabled = true;
                innerModal.width = game.width;
                innerModal.height = game.height;
                innerModal.type = type;
                innerModal.input.priorityID = 0;

                modalGroup.add(innerModal);
            }

            // add the bg
            if (includeBackground) {
                modalGroup.add(modal);
            }

            var position = function(direction) {
                if(direction == "x") return hCenter ? (centerX - (modalLabel.width / 2)) + offsetX : offsetX;
                else return vCenter ? (centerY - (modalLabel.Height / 2)) + offsetY : offsetY;
            };
            var modalLabel;
            for (var i = 0; i < itemsArr.length; i += 1) {
                var item = itemsArr[i];
                var itemType = item.type || 'text';
                var itemColor = item.color || 0x000000;
                var itemFontfamily = item.fontFamily || 'Arial';
                var itemFontSize = item.fontSize || 32;
                var itemStroke = item.stroke || '0x000000';
                var itemStrokeThickness = item.strokeThickness || 0;
                var itemAlign = item.align || 'center';
                var offsetX = item.offsetX || 0;
                var offsetY = item.offsetY || 0;
                var contentScale = item.contentScale || 1;
                var content = item.content || "";
                var centerX = game.width / 2;
                var centerY = game.height / 2;
                var callback = item.callback || false;
                var textAlign = item.textAlign || "left";
                var atlasParent = item.atlasParent || "";
                var buttonHover = item.buttonHover || content;
                var buttonActive = item.buttonActive || content;
                var graphicColor = item.graphicColor || 0xffffff;
                var graphicOpacity = item.graphicOpacity || 1;
                var graphicW = item.graphicWidth || 200;
                var graphicH = item.graphicHeight || 200;
                var lockPosition = item.lockPosition || false;
                modalLabel = null;

                if (itemType === "text" || itemType === "bitmapText") {
                    if (itemType === "text") {
                        modalLabel = game.add.text(0, 0, content, {
                            font: itemFontSize + 'px ' + itemFontfamily,
                            fill: "#" + String(itemColor).replace("0x", ""),
                            stroke: "#" + String(itemStroke).replace("0x", ""),
                            strokeThickness: itemStrokeThickness,
                            align: itemAlign
                        });
                        modalLabel.contentType = 'text';
                        modalLabel.update();
                        modalLabel.x = position("x");
                        modalLabel.y = position("y");
                    } else {
                        modalLabel = game.add.bitmapText(0, 0, itemFontfamily, String(content), itemFontSize);
                        modalLabel.contentType = 'bitmapText';
                        modalLabel.align = textAlign;
                        modalLabel.updateText();
                        modalLabel.x = position("x");
                        modalLabel.y = position("y");
                    }

                } else if (itemType === "image") {
                    //content = item.imageKey || "";
                    modalLabel = game.add.image(0, 0, content);
                    modalLabel.scale.setTo(contentScale, contentScale);
                    modalLabel.contentType = 'image';
                    modalLabel.x = position("x");
                    modalLabel.y = position("y");
                }
                else if (itemType === "sprite") {
                    modalLabel = game.add.sprite(0, 0, atlasParent, content);
                    modalLabel.scale.setTo(contentScale, contentScale);
                    modalLabel.contentType = 'sprite';
                    modalLabel.x = position("x");
                    modalLabel.y = position("y");
                }
                else if(itemType === "button") {
                    modalLabel = game.add.button(0, 0, atlasParent, callback, this, buttonHover, content, buttonActive, content);
                    modalLabel.scale.setTo(contentScale, contentScale);
                    modalLabel.contentType = 'button';
                    modalLabel.x = position("x");
                    modalLabel.y = position("y");
                }
                else if(itemType === "graphics") {
                    modalLabel = game.add.graphics(graphicW, graphicH);
                    modalLabel.beginFill(graphicColor, graphicOpacity);
                    modalLabel.drawRect(0, 0, graphicW, graphicH);
                    modalLabel.endFill();
                    modalLabel.x = position("x");
                    modalLabel.y = position("y");
                }

                modalLabel["_offsetX"] = 0;
                modalLabel["_offsetY"] = 0;
                modalLabel["lockPosition"] = lockPosition;
                modalLabel._offsetX = offsetX;
                modalLabel._offsetY = offsetY;
                modalLabel.baseX = offsetX;
                modalLabel.baseY = offsetY;
                modalLabel.type = options.type;

                if (callback !== false && itemType !== "button") {
                    modalLabel.inputEnabled = true;
                    modalLabel.pixelPerfectClick = true;
                    modalLabel.priorityID = 10;
                    modalLabel.events.onInputDown.add(callback, modalLabel);
                }

                if (itemType !== "bitmapText" && itemType !== "graphics") {
                    modalLabel.bringToTop();
                    modalGroup.add(modalLabel);
                    modalLabel.bringToTop();
                    modalGroup.bringToTop(modalLabel);
                } else {
                    modalGroup.add(modalLabel);
                    modalGroup.bringToTop(modalLabel);
                }
            }

            modalGroup.visible = false;
            game.modals[type] = modalGroup;
        },
        updateModalValue: function (prop, type, index) {
            var item, modal = game.modals[type];
            var position = function(direction) {
                if(direction == "x") return modal.hCenter ? ((game.width / 2) - (item.width / 2)) + item._offsetX : item._offsetX;
                else return modal.vCenter ? ((game.height / 2) - (item.height / 2)) + item._offsetY : item._offsetY;
            };
            if (index !== undefined && index !== null) {
                if(index >= 0) {
                    item = modal.getChildAt(index);
                    if (item.contentType === "text") {
                        if(prop.type === 'xFromBase')
                            item._offsetX = item.baseX + prop.value;
                        else if(prop.type === 'yFromBase')
                            item._offsetY = item.baseY + prop.value;
                        else
                            item[prop.type] = prop.value;
                        item.update();
                        if (item.lockPosition === true){ }
                        else {
                            item.x = position("x");
                            item.y = position("y");
                        }
                    } else if (item.contentType === "bitmapText") {
                        item[prop.type] = prop.value;
                        item.updateText();
                        if(item.lockPosition === true) { }
                        else {
                            item.x = position("x");
                            item.y = position("y");
                        }
                    } else if (item.contentType === "image") {
                        if(prop.type === "x" || prop.type === "y")
                            item.position[prop.type] = prop.value;
                        else if(prop.type == "image")
                            item.loadTexture(prop.value);
                        else if(prop.type === 'xFromBase')
                            item.x = item.baseX + prop.value;
                        else if(prop.type === 'yFromBase')
                            item.y = item.baseY + prop.value;
                        else
                            item[prop.type] = prop.value;
                    }
                } else {
                    if(prop.type == "x")
                        if(!modal.fixedToCamera) modal.position.x = prop.value;
                        else modal.cameraOffset.x = prop.value;
                    else if(prop.type == "y")
                        if(!modal.fixedToCamera) modal.position.y = prop.value;
                        else modal.cameraOffset.y = prop.value;
                    else {}
                }
            }
        },
        getModalItem: function (type, index) {
            return game.modals[type].getChildAt(index);
        },
        showModal: function (type) {
            game.world.bringToTop(game.modals[type]);
            game.modals[type].visible = true;
            game.modals[type].alpha = 0;
            game.add.tween(game.modals[type]).to({alpha:1}, 100, Phaser.Easing.Linear.None, true);
        },
        hideModal: function (type) {
            game.modals[type].alpha = 1;
            var tween = game.add.tween(game.modals[type]).to({alpha:0}, 100, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function(){game.modals[type].visible = false;}, this);
        },
        destroyModal: function (type) {
            game.modals[type].destroy();
            delete game.modals[type];
        }
    };
};

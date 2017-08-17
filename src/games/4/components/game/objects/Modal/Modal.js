"use strict";
import BasicGameObject from "system/phaser/BasicGameObject";
import ModalSprite from "./ModalSprite";
import Phaser from 'phaser';

export default class Modal extends BasicGameObject {

	finish = new Phaser.Signal();
	texts = [];
	isCorrect = false;

	cross;
	itemGroup;
	selectedItems;
	missingItems = [];
	attempt;

	constructor({game, x, y, key, title, itemGroup, selectedItems, attempt}) {
	    super(game);
	    this.itemGroup = itemGroup; // Contient tous les sprites
	    this.selectedItems = selectedItems; // Contient tous les objets séléctionnés
	    this.attempt = attempt; // Nombre de tentative
	    this.addSprite(new ModalSprite({
	        game: this.game,
	        x: x,
	        y: y,
	        key: key,
	        buttonObj: this
	    }));


	    // Tableau de texte, pour supprimer facilement
	    this.texts = [];

	    // Création des position de textes:
	    let textPositionX = x - (this.sprite.width/2) + 20,
	    	textPositionY = y - (this.sprite.height/2) + 20,
	    	// Titre du modal:
	    	titleText = this.game.add.text(textPositionX, textPositionY, `Validation du chargement: 0 / 0`, {fill: '#000000', fontSize: 20});
	    this.texts.push(titleText);
	    // Modification de la position pour commencer la liste des éléments
	    textPositionY += 30;

	    // Création des compteurs:
	    let count = 0,
	    	countEquipment = 0, // EPI
	    	countMaterial = 0,	// matériel
	    	countSupplie = 0, // materiaux
	    	totalSelectedItems = this.selectedItems.length,
	    	totalEquipment = 0,
	    	totalMaterial = 0,
	    	totalSupplie = 0;

	    // ÉLéments corrects séléctionnés et total d'élément à séléctionner
	    let correctItemsNumber = 0,
	    	totalAnswers = 0;

	    // Compteurs totaux des différents types:
	    this.itemGroup.forEach((item) => {
	    	if (item.obj.isNeeded) {
	    		totalAnswers++;
	    		// Ajout des éléments corrects, pour supprimer ceux séléctionnés et obtenir les manquants:
	    		this.missingItems.push(item.obj);
	    		// Mise à jour des compteurs en fonction des différents types:
		    	switch(item.obj.type){
		    		case "materiaux":
		    			totalSupplie++;
		    			break;
		    		case "materiels":
		    			totalMaterial++;
		    			break;
		    		case "epi":
		    			totalEquipment++;
		    			break;
		    		default:
		    			break;
		    	}
	    	}
	    });

	    // Ajout de la liste des éléments
	    this.selectedItems.forEach((item) => {
	    	count++;

	    	// Mise à jour des éléments corrects manquants:
	    	this.missingItems.forEach((missingItem) => {
	    		if (missingItem.title == item.title) {
	    			let index = this.missingItems.indexOf(missingItem);
	    			if (index > -1) {
					    this.missingItems.splice(index, 1);
					}
	    		}
	    	});

	    	// Compteurs des différents types des éléments séléctionnés:
	    	switch(item.type){
	    		case "materiaux":
	    			countSupplie++;
					break;
	    		case "materiels":
	    			countMaterial++;
	    			break;
	    		case "epi":
	    			countEquipment++;
	    			break;
	    	}

	    	// Création de la liste des éléments
	    	if(count<Math.round(totalSelectedItems/2)){ // Première colonne
		    	if (item.isNeeded) {
		    		this.texts.push(this.game.add.text(textPositionX, textPositionY, `${item.title}`, {fill: '#008000', fontSize: 16}));
		    		// Mise à jour de la poisiton pour placer le prochain élément
		    		textPositionY += 20;
		    		correctItemsNumber++;
		    	} else {
		    		this.texts.push(this.game.add.text(textPositionX, textPositionY, `${item.title}`, {fill: '#FF0000', fontSize: 16}));
		    		textPositionY += 20;
		    	}
		    } else if(count == Math.round(totalSelectedItems/2) + 1) { // Début deuxième colonne
		    	// Mise à jour de la position pour créer la deuxième colonne
		    	textPositionX = x + 20;
		    	textPositionY = y - (this.sprite.height/2) + 50;
		    	if (item.isNeeded) {
		    		this.texts.push(this.game.add.text(textPositionX, textPositionY, `${item.title}`, {fill: '#008000', fontSize: 16}));
		    		textPositionY += 20;
		    		correctItemsNumber++;
		    	} else {
		    		this.texts.push(this.game.add.text(textPositionX, textPositionY, `${item.title}`, {fill: '#FF0000', fontSize: 16}));
		    		textPositionY += 20;
		    	}
		    } else { // Deuxième colonne
		    	if (item.isNeeded) {
		    		this.texts.push(this.game.add.text(textPositionX, textPositionY, `${item.title}`, {fill: '#008000', fontSize: 16}));
		    		textPositionY += 20;
		    		correctItemsNumber++;
		    	} else {
		    		this.texts.push(this.game.add.text(textPositionX, textPositionY, `${item.title}`, {fill: '#FF0000', fontSize: 16}));
		    		textPositionY += 20;
		    	}
		    }
	    });

	    // Mise à jour du titre du modal
	    titleText.text = `Validation du chargement: ${correctItemsNumber} / ${totalAnswers}`;

	    // Elements text:
	    let elementsX = this.game.world.centerX - (this.sprite.width/2) + 20,
	    	elementsY = this.game.world.centerY + (this.sprite.height/2) - 50,
	    	elementsText = this.game.add.text(elementsX, elementsY, ``, {fill: '#000000', fontSize: 16});
	    this.texts.push(elementsText);

	    // Ajout des phrases d'aide:
	    let textValue = `Il faut: `;
	    switch(this.attempt){
	    	case 1:
	    		elementsText.text = `Éléments restant: ${totalAnswers - correctItemsNumber}`;
	    		break;
	    	case 2:
	    		// EPI:
	    		if (totalEquipment - countEquipment >= 2) {
	    			textValue += `${totalEquipment - countEquipment} EPIs en plus, `;
	    		} else if (totalEquipment - countEquipment >= 0) {
	    			textValue += `${totalEquipment - countEquipment} EPI en plus, `;
	    		} else if (totalEquipment - countEquipment == 0) {
	    			textValue += `aucun EPI en plus, `;
	    		} else if (totalEquipment - countEquipment <= 1){
	    			let absValue = Math.abs(totalEquipment - countEquipment);
	    			textValue += `${absValue} EPIs en moins, `;
	    		} else if (totalEquipment - countEquipment <= 2){
	    			let absValue = Math.abs(totalEquipment - countEquipment);
	    			textValue += `${absValue} EPI en moins, `;
	    		} 
	    		// Matériels:
	    		if (totalMaterial - countMaterial >= 2) {
	    			textValue += `${totalMaterial - countMaterial} matériels en plus, `;
	    		} else if (totalMaterial - countMaterial >= 0) {
	    			textValue += `${totalMaterial - countMaterial} matériel en plus, `;
	    		} else if (totalMaterial - countMaterial == 0) {
	    			textValue += `aucun matériel en plus, `;
	    		} else if (totalMaterial - countMaterial <= 2){
	    			let absValue = Math.abs(totalMaterial - countMaterial);
	    			textValue += `${absValue} matériels en moins, `;
	    		} else if (totalMaterial - countMaterial <= 1){
	    			let absValue = Math.abs(totalMaterial - countMaterial);
	    			textValue += `${absValue} matériel en moins, `;
	    		} 
	    		// Matériaux:
	    		if (totalSupplie - countSupplie >= 2) {
	    			textValue += `${totalSupplie - countSupplie} matériaux en plus,`;
	    		} else if (totalSupplie - countSupplie >= 0) {
	    			textValue += `${totalSupplie - countSupplie} matériau en plus,`;
	    		} else if (totalSupplie - countSupplie == 0) {
	    			textValue += `aucun matériau en plus,`;
	    		} else if (totalSupplie - countSupplie <= 2){
	    			let absValue = Math.abs(totalSupplie - countSupplie);
	    			textValue += `${absValue} matériaux en moins,`;
	    		} else if (totalSupplie - countSupplie <= 1){
	    			let absValue = Math.abs(totalSupplie - countSupplie);
	    			textValue += `${absValue} matériau en moins,`;
	    		} 
	    		elementsText.text = textValue;
	    		// elementsText.text = `Il manque: ${totalEquipment - countEquipment} EPI, ${totalMaterial - countMaterial} matériels, et ${totalSupplie - countSupplie} matériaux`;
	    		break;
	    	case 3:
	    	default:
	    		// EPI:
	    		if (totalEquipment - countEquipment >= 2) {
	    			textValue += `${totalEquipment - countEquipment} EPIs en plus, `;
	    		} else if (totalEquipment - countEquipment >= 0) {
	    			textValue += `${totalEquipment - countEquipment} EPI en plus, `;
	    		} else if (totalEquipment - countEquipment == 0) {
	    			textValue += `aucun EPI en plus, `;
	    		} else if (totalEquipment - countEquipment <= 1){
	    			let absValue = Math.abs(totalEquipment - countEquipment);
	    			textValue += `${absValue} EPIs en moins, `;
	    		} else if (totalEquipment - countEquipment <= 2){
	    			let absValue = Math.abs(totalEquipment - countEquipment);
	    			textValue += `${absValue} EPI en moins, `;
	    		} 
	    		// Matériels:
	    		if (totalMaterial - countMaterial >= 2) {
	    			textValue += `${totalMaterial - countMaterial} matériels en plus, `;
	    		} else if (totalMaterial - countMaterial >= 0) {
	    			textValue += `${totalMaterial - countMaterial} matériel en plus, `;
	    		} else if (totalMaterial - countMaterial == 0) {
	    			textValue += `aucun matériel en plus, `;
	    		} else if (totalMaterial - countMaterial <= 2){
	    			let absValue = Math.abs(totalMaterial - countMaterial);
	    			textValue += `${absValue} matériels en moins, `;
	    		} else if (totalMaterial - countMaterial <= 1){
	    			let absValue = Math.abs(totalMaterial - countMaterial);
	    			textValue += `${absValue} matériel en moins, `;
	    		} 
	    		// Matériaux:
	    		if (totalSupplie - countSupplie >= 2) {
	    			textValue += `${totalSupplie - countSupplie} matériaux en plus,`;
	    		} else if (totalSupplie - countSupplie >= 0) {
	    			textValue += `${totalSupplie - countSupplie} matériau en plus,`;
	    		} else if (totalSupplie - countSupplie == 0) {
	    			textValue += `aucun matériau en plus,`;
	    		} else if (totalSupplie - countSupplie <= 2){
	    			let absValue = Math.abs(totalSupplie - countSupplie);
	    			textValue += `${absValue} matériaux en moins,`;
	    		} else if (totalSupplie - countSupplie <= 1){
	    			let absValue = Math.abs(totalSupplie - countSupplie);
	    			textValue += `${absValue} matériau en moins,`;
	    		} 
	    		let randomIndex = Math.floor((Math.random() * this.missingItems.length));
	    		elementsText.text = textValue;
	    		// Ajout du message d'aide en plus:
	    		if (this.missingItems.length > 0) {
	    			this.elementsText2 = this.game.add.text(elementsX, elementsY + 20, `dont par exemple: 1 ${this.missingItems[randomIndex].title}`, {fill: '#000000', fontSize: 16});
	    			this.texts.push(this.elementsText2);
	    		}
	    		break;
	    }

	    // Cross:
	    let crossX = this.game.world.centerX + (this.sprite.width/2) - 40,
	    	crossY = this.game.world.centerY - (this.sprite.height/2) + 20,
	    	crossWidth = 20;
	    this.cross = this.game.add.graphics(0,0);
	    this.cross.lineStyle(2, "black", 1);
        this.cross.moveTo(crossX,crossY);
        this.cross.lineTo(crossX + crossWidth, crossY + crossWidth);
        this.cross.moveTo(crossX + crossWidth,crossY);
        this.cross.lineTo(crossX, crossY + crossWidth);

        // Si l'étape est correct ou non:
        this.isCorrect = correctItemsNumber == totalAnswers ? true : false;

        // Fermer l'étape en cours
        this.sprite.events.onInputDown.add(function(){
        	this.finish.dispatch();
        }, this);
	}

	destroy() {
		this.sprite.destroy();
		this.texts.forEach((item) => {
			item.destroy();
		});
		this.cross.destroy();
	}
}













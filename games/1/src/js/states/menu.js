var Game = Game || {};
Game.State = Game.State || {};


/**
 * State when we the game is loaded
 */
Game.State.menuState = {

    create: function() {
        game.add.text(80, 80, "Approvisionnez le chantier",
            {font: '25px arial', fill: '#ffffff'});
        game.add.text(80, 160, "Vous devez apporter du liant dans l'entrepôt afin d'approvisionner le chantier.\n" +
            "Pour cela, choisissez un des trois outils (brouette, transpalette ou l'élévateur), \n" +
            "prennez du liant dans le mortier et apportez le au dépôt à l'intérieur du bâtiment.",
            {font: '21px arial', fill: '#ffffff'});
        game.add.text(80, this.game.world.height - 80, "Appuyez sur [Entrer] pour lancer la partie",
            {font: '21px arial', fill: '#ffff66'});

        let wKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        wKey.onDown.addOnce(this.start, this);
    },

    start: function() {
        game.state.start('play');
    }
};
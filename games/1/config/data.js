var Game = Game || {};
Game.Config = Game.Config || {};


/**
 * Configs for this game
 */
Game.Config.data = {
    developer: {
        debug: false
    },
    canvasParent: "gameDiv",
    tilesmap: {
        name: "map",
        calques: ["Background", "Midground"],
        file: "map.json",
        tiles: {
            width: 25,
            height: 21,
            size: 32
        },
        assets: [
            {name: "PathAndObjects", file: "PathAndObjects.png"}
        ]
    },

    entities: {
        player: {x: 2, y: 7, speed: 175},
        vehicles: [ //names are unique
            {
                name: "elevateur", x: 2, y: 2,
                prop: {speed: 6, speedRotate: 30, player_x: 0.5, player_y: -0.35, loading_x: 0.5, loading_y: 1.8,
                    walkToMove: false, name: "Chariot élévateur",
                    description: "Permet de transporter six charges de liant.", size: "1x2m", containerSize: 6,
                    source: "https://manitou.cdn.prismic.io/manitou%2F83b388e7-4fd0-47a9-88e3-c22e09c06985_vue_ds_mi80d_mi100d_a_0315.svg"}
            },
            {
                name: "brouette", x: 5, y: 3,
                prop: {speed: 5, speedRotate: 50, player_x: 0.5, player_y: -0.25, loading_x: 0.5, loading_y: 1,
                    walkToMove: true, name: "Brouette",
                    description: "Permet de transporter une charge de liant.", size: "0.5x1m", containerSize: 1,
                    source: "http://st.depositphotos.com/1739901/2117/i/950/depositphotos_21173467-Top-view-of-wheelbarrow-on.jpg"}
            },
            {
                name: "transpalette", x: 7.5, y: 2.5,
                prop: {speed: 5, speedRotate: 30, player_x: 0.5, player_y: -1, loading_x: 0.5, loading_y: 1,
                    walkToMove: true, name: "Transpalette",
                    description: "Permet de transporter trois charges de liant.", size: "0.5x1.5m", containerSize: 3,
                    source: "http://www.lkgoodwin.com/more_info/pallet_truck/images/bt_top_view.jpg"}
            }
        ],
        materials: [
            {name: "parpaings", x: 13, y: 2, prop: {name: "Parpaings", modalDirection: "bottom", amount: 0}},
            {name: "liants", x: 16, y: 2, prop: {name: "Liants", modalDirection: "bottom", amount: 0}},
            {name: "sable", x: 7, y: 10, prop: {name: "Sable", modalDirection: "top", amount: 0}},
            {name: "gravier", x: 10, y: 10, prop: {name: "Gravier", modalDirection: "top", amount: 0}},
            {name: "mortier", x: 16, y: 10, prop: {name: "Mortier", modalDirection: "top", amount: 9}}
        ],
        tools: [
            {name: "betonniere", x: 13, y: 10, prop: {
                name: "Bétonnière", modalDirection: "top"
                //idea, if you want to improve the code
                //role: {make: {result: {type: "materials", name: "mortier"}, need: {liants: 1, sable: 1, gravier: 1}}}
            }},
            {name: "depot", x: 8, y: 17, prop: {name: "Dépôt", modalDirection: "top", needed: "mortier", amount: 0, amountMax: 9}}
        ],
        assets: [
            //parent: game
            {name: "elevateur", file: "elevateur.png"},
            {name: "brouette", file: "brouette.png"},
            {name: "transpalette", file: "transpalette.png"},
            {name: "parpaings", file: "parpaings.png"},
            {name: "liants", file: "liants.png"},
            {name: "sable", file: "sable.png"},
            {name: "gravier", file: "gravier.png"},
            {name: "betonniere", file: "betonniere.png"},
            {name: "mortier", file: "mortier.png"},
            {name: "depot", file: "depot.png"},

            //parent: vehicle
            {name: "charge", file: "charge.png"}
        ]
    },

    modals: {
        assets: [
            {name: "modalBG", file: "popup.png"},
            {name: "big_infobulle_left", file: "big_infobulle_left.png"},
            {name: "big_infobulle_right", file: "big_infobulle_right.png"},
            {name: "small_infobulle_top", file: "small_infobulle_top.png"},
            {name: "small_infobulle_bottom", file: "small_infobulle_bottom.png"},
            {name: "info_infobulle", file: "info_infobulle.png", source: "http://albaland.fr/medias/pictogrammes/PICTO_1304683213.jpg"},
            {name: "alert_infobulle", file: "alert_infobulle.png", source: "https://www.groupeer.fr/imgs/picto-alert.png"},
            {name: "bouton_a", file: "bouton_a.png"},
            {name: "bouton_e", file: "bouton_e.png"}
        ]
    }
};
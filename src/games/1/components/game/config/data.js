import {Keyboard} from 'phaser';

/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    /*tilesmap: {
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
    },*/
    tilesmap: {
        name: "map",
        calques: ["Background", "Midground"],
        file: "orgabat2.json",
        tiles: {
            width: 25,
            height: 21,
            size: 32
        },
        assets: [
            {name: "PathAndObjects", file: "PathAndObjects.png"},
            {name: "herbe", file: "herbe.png"},
            {name: "dalle", file: "dalle.png"},
            {name: "herbe_cote", file: "herbe_cote.png"},
            {name: "dalle_ciment", file: "dalle_ciment.png"},
        ]
    },

    entities: {
        player: {x: 2, y: 7, speed: 175},
        vehicles: [ //names are unique
            {
                name: "elevateur", x: 2, y: 2,
                prop: {speed: 18, speedRotate: 10, player_x: 0.5, player_y: -0.35, loading_x: 0.5, loading_y: 1.8,
                    walkToMove: false, use: Keyboard.UP, name: "Chariot élévateur",
                    description: "Permet de transporter six charges de liant.", size: "1x2m",
                    infoAdded: "Permis élévateur requis", containerSize: 6,
                    source: "https://manitou.cdn.prismic.io/manitou%2F83b388e7-4fd0-47a9-88e3-c22e09c06985_vue_ds_mi80d_mi100d_a_0315.svg"}
            },
            {
                name: "brouette", x: 5, y: 3,
                prop: {speed: 10, speedRotate: 15, player_x: 0.5, player_y: -0.25, loading_x: 0.5, loading_y: 1,
                    walkToMove: true, use: Keyboard.UP, name: "Brouette",
                    description: "Permet de transporter une charge de liant.", size: "0.5x1m", containerSize: 1,
                    source: "http://st.depositphotos.com/1739901/2117/i/950/depositphotos_21173467-Top-view-of-wheelbarrow-on.jpg"}
            },
            {
                name: "transpalette", x: 7.5, y: 2.5,
                prop: {speed: 8, speedRotate: 10, player_x: 0.5, player_y: -1, loading_x: 0.5, loading_y: 1,
                    walkToMove: true, use: Keyboard.DOWN, name: "Transpalette",
                    description: "Permet de transporter trois charges de liant.", size: "0.5x1.5m", containerSize: 3,
                    source: "http://www.lkgoodwin.com/more_info/pallet_truck/images/bt_top_view.jpg"}
            }
        ],
        materials: [
            {name: "parpaing", x: 13, y: 2, prop: {name: "Parpaings", modalDirection: "bottom"}},
            {name: "liants", x: 16, y: 2, prop: {name: "Liants", modalDirection: "bottom"}},
            {name: "sable", x: 7, y: 10, prop: {name: "Sable", modalDirection: "top"}},
            {name: "gravier", x: 10, y: 10, prop: {name: "Gravier", modalDirection: "top"}},
            {name: "mortier", x: 16, y: 10, prop: {name: "Mortier", modalDirection: "top", amount: {current:9}}}
        ],
        tools: [
            {name: "betonniere", x: 13, y: 10, prop: {
                name: "Bétonnière", modalDirection: "top"
                //idea, if we want to improve the code
                //role: {make: {result: {type: "materials", name: "mortier"}, need: {liants: 1, sable: 1, gravier: 1}}}
            }},
            {name: "depot", x: 8, y: 17, prop: {name: "Dépôt", modalDirection: "top", needed: "mortier", amount: {current:0, max:9}}}
        ],
        assets: [
            //parent: game
            {name: "elevateur", file: "elevateur.png"},
            {name: "brouette", file: "brouette.png"},
            {name: "transpalette", file: "transpalette.png"},
            {name: "parpaing", file: "parpaing.png"},
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
            {name: "big_modal", file: "big_modal.png"},
            {name: "big_tooltip_left", file: "big_tooltip_left.png"},
            {name: "big_tooltip_right", file: "big_tooltip_right.png"},
            {name: "small_tooltip_top", file: "small_tooltip_top.png"},
            {name: "small_tooltip_bottom", file: "small_tooltip_bottom.png"},
            {name: "info_feedback", file: "info_feedback.png", source: "http://albaland.fr/medias/pictogrammes/PICTO_1304683213.jpg"},
            {name: "alert_feedback", file: "alert_feedback.png", source: "https://www.groupeer.fr/imgs/picto-alert.png"},
            {name: "small_feedback", file: "small_feedback.png"},
            {name: "bouton_a", file: "bouton_a.png"},
            {name: "bouton_z", file: "bouton_z.png"},
            {name: "bouton_e", file: "bouton_e.png"},
            {name: "star", file: "star.png"},
            {name: "star_disabled", file: "star_disabled.png"}
        ]
    }
}
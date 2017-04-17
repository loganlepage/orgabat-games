import {Keyboard} from 'phaser';
import Elevator from '../objects/Vehicle/elevator/Elevator';

/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    tilemap: {
        name: "map",
        calques: ["main"],
        file: "map.json",
        tiles: {
            width: 25,
            height: 21,
            size: 32
        },
        assets: [
            {name: "tilemap.32", file: "tilemap.32.png"},
        ]
    },
    atlas: "jeu1",
    entities: {
        player: {x: 2, y: 7, speed: 175},
        vehicles: [ //names are unique
            {
                name: "elevateur", x: 2, y: 2, useClass: Elevator,
                prop: {
                    speed: 18, speedRotate: 10, player_x: 0.5, player_y: -0.20, loading_x: 0.5, loading_y: 1.8,
                    walkToMove: false, use: Keyboard.UP, name: "Chariot élévateur",
                    description: "Permet de transporter six charges de liant.", size: "1x2m",
                    infoAdded: "Permis élévateur requis", containerSize: 6
                }
            },
            {
                name: "brouette", x: 5, y: 3,
                prop: {
                    speed: 10, speedRotate: 15, player_x: 0.5, player_y: 0, loading_x: 0.5, loading_y: 0.7,
                    walkToMove: true, use: Keyboard.UP, name: "Brouette",
                    description: "Permet de transporter une charge de liant.", size: "0.5x1m", containerSize: 1
                }
            },
            {
                name: "transpalette", x: 7.5, y: 2.5,
                prop: {
                    speed: 8, speedRotate: 10, player_x: 0.5, player_y: -0.60, loading_x: 0.5, loading_y: 1,
                    walkToMove: true, use: Keyboard.DOWN, name: "Transpalette",
                    description: "Permet de transporter trois charges de liant.", size: "0.5x1.5m", containerSize: 3
                }
            }
        ],
        materials: [
            {name: "parpaing", x: 13, y: 2, prop: {name: "Parpaings", modalDirection: "bottom"}},
            {name: "liants", x: 16, y: 2, prop: {name: "Liants", modalDirection: "bottom"}},
            {name: "sable", x: 10, y: 10.5, prop: {name: "Sable", modalDirection: "top"}},
            {name: "gravier", x: 13, y: 10.5, prop: {name: "Gravier", modalDirection: "top"}},
            {name: "mortier", x: 16, y: 10.5, prop: {name: "Mortier", modalDirection: "top", amount: {current: 9}}}
        ],
        tools: [
            {
                name: "depot",
                x: 8,
                y: 17,
                prop: {name: "Dépôt", modalDirection: "top", needed: "mortier", amount: {current: 0, max: 9}}
            }
        ]
    },
}
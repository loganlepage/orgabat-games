/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu6",
    items: {
        materiaux: {
            peinture15l1: {needed: true, title: "peinture15l", x: 1000, y: 140},
            peinture15l2: {needed: true, title: "peinture15l", x: 1100, y: 140},
            peinture15l3: {needed: true, title: "peinture15l", x: 1200, y: 140},
            peinture15l4: {needed: true, title: "peinture15l", x: 1300, y: 140},
            peinture5l1: {needed: false, title: "peinture5l", x: 1000, y: 280},
            peinture5l2: {needed: false, title: "peinture5l", x: 1100, y: 280},
            peinture5l3: {needed: false, title: "peinture5l", x: 1200, y: 280},
            peinture5l4: {needed: false, title: "peinture5l", x: 1300, y: 280},
            map1: {needed: true, title: "map", x: 950, y: 520},
            map2: {needed: true, title: "map", x: 1020, y: 520},
            map3: {needed: true, title: "map", x: 1090, y: 520},
            map4: {needed: true, title: "map", x: 1160, y: 520},
            map5: {needed: true, title: "map", x: 1230, y: 520},
            map6: {needed: true, title: "map", x: 1300, y: 520},
            map7: {needed: true, title: "map", x: 880, y: 520},
        }, materiels: {
            bache: {needed: false, title: "bache", x: 1000, y: 400},
            aspirateur: {needed: true, title: "aspirateur", x: 1100, y: 400},
            ponceuse: {needed: true, title: "ponceuse", x: 1200, y: 400},
            caisse: {needed: true, title: "caisse", x: 1300, y: 400},
            echaffaudage: {needed: false, title: "echaffaudage", x: 700, y:500},
            escabeau: {needed: false, title: "escabeau", x: 700, y: 350},
            chariot: {needed: false, title: "chariot", x: 700, y: 200}
        }
    }
}
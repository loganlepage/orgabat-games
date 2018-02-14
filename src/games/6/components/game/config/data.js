/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu6",
    items: {
        materiaux: {
            peinture15l1: {needed: true, title: "peinture15l", x: 970, y: 91, clicked: false},
            peinture15l2: {needed: true, title: "peinture15l", x: 1050, y: 136, clicked: false},
            peinture15l3: {needed: true, title: "peinture15l", x: 1132, y: 181, clicked: false},
            peinture15l4: {needed: true, title: "peinture15l", x: 1229, y: 233, clicked: false},
            peinture5l1: {needed: false, title: "peinture5l", x: 943, y: 332, clicked: false},
            peinture5l2: {needed: false, title: "peinture5l", x: 987, y: 354, clicked: false},
            peinture5l3: {needed: false, title: "peinture5l", x: 1026, y: 378, clicked: false},
            peinture5l4: {needed: false, title: "peinture5l", x: 1066, y: 400, clicked: false},
            peinture5l5: {needed: false, title: "peinture5l", x: 1106, y: 422, clicked: false},
            peinture5l6: {needed: false, title: "peinture5l", x: 1150, y: 445, clicked: false},
            peinture5l7: {needed: false, title: "peinture5l", x: 1197, y: 470, clicked: false},
            map1: {needed: true, title: "map", x: 1061, y: 737, clicked: false},
            map2: {needed: true, title: "map", x: 983, y: 699, clicked: false},
            map3: {needed: true, title: "map", x: 983, y: 673, clicked: false},
            map4: {needed: true, title: "map", x: 983, y: 647, clicked: false},
            map5: {needed: true, title: "map", x: 906, y: 647, clicked: false},
            map6: {needed: true, title: "map", x: 906, y: 621, clicked: false},
            map7: {needed: true, title: "map", x: 906, y: 595, clicked: false},
        }, materiels: {
            bache: {needed: false, title: "bache", x: 1015, y: 260, clicked: false},
            aspirateur: {needed: true, title: "aspirateur", x: 1138, y: 563, clicked: false},
            ponceuse: {needed: true, title: "ponceuse", x: 1165, y: 340, clicked: false},
            caisse: {needed: true, title: "caisse", x: 1009, y: 492, clicked: false},
            escabeau: {needed: false, title: "escabeau", x: 790, y: 310, clicked: false},
            echaffaudage: {needed: false, title: "echaffaudage", x: 680, y: 265, clicked: false}
        }
    },
    steps: {
        step1: {good: false, title: " - Je vais prendre un café avec mes collèques", clicked: false},
        step2: {good: true, title: " - Je prends quelques minutes pour me préparer à l’activité physique (mouvements d’échauffement)", clicked: false},
        step3: {good: false, title: " - Je commence à charger seul. Je suis le plus jeune de l’entreprise, donc c’est à moi de le faire.", clicked: false},
        step4: {good: true, title: " - Je demande à un collègue de m’aider pour manutentionner", clicked: false},
        step5: {good: true, title: " - Je demande à un collègue de rapprocher le véhicule de l’espace de stockage", clicked: false},
        step7: {good: true, title: " - Je commence par manutentionner les charges les moins lourdes", clicked: false},
        step8: {good: true, title: " - Je déplace le rouleau de moquette qui gêne le passage avec un collègue", clicked: false},
        step9: {good: false, title: " - Nous laissons le rouleau de moquette au sol, nous n’avons pas de temps à perdre", clicked: false},
        step10: {good: false, title: " - Je choisis de prendre les pots de 15 litres", clicked: false},
        step11: {good: true, title: " - Je choisis de prendre les pots de 5 litres", clicked: false},
        step12: {good: true, title: " - J’utilise un chariot", clicked: false},
        step13: {good: true, title: " - Je dégage la zone de passage", clicked: false}
    },
    mapSteps: {
        mapStep1: {good: false, key: "mapStep1", validated: false, position: null},
        mapStep2: {good: true, key: "mapStep4", validated: false, position: 1},
        mapStep3: {good: false, key: "mapStep2", validated: false, position: null},
        mapStep4: {good: true, key: "mapStep5", validated: false, position: 3},
        mapStep5: {good: false, key: "mapStep3", validated: false, position: null},
        mapStep6: {good: true, key: "mapStep6", validated: false, position: 2}
    }
}
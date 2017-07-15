/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu6",
    items: {
        materiaux: {
            peinture15l1: {needed: true, title: "peinture15l", x: 1000, y: 140, clicked: false},
            peinture15l2: {needed: true, title: "peinture15l", x: 1100, y: 140, clicked: false},
            peinture15l3: {needed: true, title: "peinture15l", x: 1200, y: 140, clicked: false},
            peinture15l4: {needed: true, title: "peinture15l", x: 1300, y: 140, clicked: false},
            peinture5l1: {needed: false, title: "peinture5l", x: 940, y: 280, clicked: false},
            peinture5l2: {needed: false, title: "peinture5l", x: 1000, y: 280, clicked: false},
            peinture5l3: {needed: false, title: "peinture5l", x: 1060, y: 280, clicked: false},
            peinture5l4: {needed: false, title: "peinture5l", x: 1120, y: 280, clicked: false},
            peinture5l5: {needed: false, title: "peinture5l", x: 1180, y: 280, clicked: false},
            peinture5l6: {needed: false, title: "peinture5l", x: 1240, y: 280, clicked: false},
            peinture5l7: {needed: false, title: "peinture5l", x: 1300, y: 280, clicked: false},
            map1: {needed: true, title: "map", x: 950, y: 520, clicked: false},
            map2: {needed: true, title: "map", x: 1020, y: 520, clicked: false},
            map3: {needed: true, title: "map", x: 1090, y: 520, clicked: false},
            map4: {needed: true, title: "map", x: 1160, y: 520, clicked: false},
            map5: {needed: true, title: "map", x: 1230, y: 520, clicked: false},
            map6: {needed: true, title: "map", x: 1300, y: 520, clicked: false},
            map7: {needed: true, title: "map", x: 880, y: 520, clicked: false},
        }, materiels: {
            bache: {needed: false, title: "bache", x: 1000, y: 400, clicked: false},
            aspirateur: {needed: true, title: "aspirateur", x: 1100, y: 400, clicked: false},
            ponceuse: {needed: true, title: "ponceuse", x: 1200, y: 400, clicked: false},
            caisse: {needed: true, title: "caisse", x: 1300, y: 400, clicked: false},
            echaffaudage: {needed: false, title: "echaffaudage", x: 700, y:500, clicked: false},
            escabeau: {needed: false, title: "escabeau", x: 700, y: 350, clicked: false},
            chariot: {needed: false, title: "chariot", x: 700, y: 220, clicked: false}
        }
    },
    steps: {
        step1: {good: false, title: "Je vais prendre un café avec mes collèques", x:50, y:50, clicked: false},
        step2: {good: true, title: "Je prends quelques minutes pour me préparer à l’activité physique (mouvements d’échau ement)", x:50, y:90, clicked: false},
        step3: {good: false, title: "Je commence immédiatement à charger seul", x:50, y:130, clicked: false},
        step4: {good: true, title: "Je demande à un collègue de m’aider pour manutentionner", x:50, y:170, clicked: false},
        step5: {good: true, title: "Je demande à un collègue de rapprocher le véhicule de l’espace de stockage", x:50, y:210, clicked: false},
        step6: {good: false, title: "Je suis le plus jeune, c’est à moi de charger seul le véhicule", x:50, y:250, clicked: false},
        step7: {good: true, title: "Je commence par manutentionner les charges les moins lourdes", x:50, y:290, clicked: false},
        step8: {good: true, title: "Je déplace le rouleau de moquette avec un collègue", x:50, y:330, clicked: false},
        step9: {good: false, title: "Nous laissons le rouleau de moquette au sol, nous n’avons pas de temps à perdre", x:50, y:370, clicked: false},
        step10: {good: false, title: "Je choisis de prendre les pots de 15 litres", x:50, y:410, clicked: false},
        step11: {good: true, title: "Je choisis de prendre les pots de 5 litres", x:50, y:450, clicked: false},
        step12: {good: true, title: "J’utilise un chariot", x:50, y:490, clicked: false},
        step13: {good: true, title: "Je dégage la zone de passage", x:50, y:530, clicked: false}
    },
    mapSteps: {
        mapStep1: {good: false, key: "mapStep1", validated: false, position: null, x: 250, y: 200},
        mapStep2: {good: true, key: "mapStep4", validated: false, position: 1, x: 350, y: 200},
        mapStep3: {good: false, key: "mapStep2", validated: false, position: null, x: 450, y: 200},
        mapStep4: {good: true, key: "mapStep5", validated: false, position: 2, x: 550, y: 200},
        mapStep5: {good: false, key: "mapStep3", validated: false, position: null, x: 650, y: 200},
        mapStep6: {good: true, key: "mapStep6", validated: false, position: 3, x: 750, y: 200}
    }
}
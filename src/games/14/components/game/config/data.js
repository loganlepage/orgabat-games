/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu14",
    background: {
        title: "Plan de la maison, il faut aller du portail au poste de travail",
        key: "bg",
        work: {
            x: 1150,
            y: 345,
            title: "poste de travail"
        },
        area: [
            { // First step
                x: 300,
                y: 400,
                title: "Emprunter la cours de graviers",
                correctAnswer: false
            },
            {
                x: 300,
                y: 150,
                title: "Emprunter la cours bitumée",
                correctAnswer: true
            },
            {
                x: 300,
                y: 650,
                title: "Emprunter les escaliers",
                correctAnswer: false
            },
            { // Second step
                x: 760,
                y: 330,
                title: "Passer les éléments par la fenêtre",
                correctAnswer: false
            },
            {
                x: 760,
                y: 525,
                title: "Passer par la porte d’entrée",
                correctAnswer: false
            },
            {
                x: 760,
                y: 140,
                title: "Demander au client d’enlever sa voiture du garage",
                correctAnswer: true
            },
            { // Third step
                x: 1000,
                y: 325,
                title: "Encombrement au sol",
                correctAnswer: false
            },
            {
                x: 1000,
                y: 515,
                title: "Menuisier posant les portes du placard de l’entrée",
                correctAnswer: false
            },
            {
                x: 1110,
                y: 230,
                title: "Emprunter le garage",
                correctAnswer: true
            },
        ]
    }
}
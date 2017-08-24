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
        start: {
            x: 110,
            y: 210,
            title: "Point de départ"
        },
        work: {
            x: 1150,
            y: 375,
            title: "Poste de travail"
        },
        area: [
            { // First step
                x: 300,
                y: 400,
                title: "Emprunter la cours de graviers",
                correctAnswer: false,
                position: 1
            },
            {
                x: 300,
                y: 150,
                title: "Emprunter la cours bitumée",
                correctAnswer: true,
                position: 1
            },
            {
                x: 300,
                y: 650,
                title: "Emprunter les escaliers",
                correctAnswer: false,
                position: 1
            },
            { // Second step
                x: 800,
                y: 335,
                title: "Passer les éléments par la fenêtre",
                correctAnswer: false,
                position: 2
            },
            {
                x: 800,
                y: 530,
                title: "Passer par la porte d’entrée",
                correctAnswer: false,
                position: 2
            },
            {
                x: 800,
                y: 145,
                title: "Demander au client d’enlever sa voiture du garage",
                correctAnswer: true,
                position: 2
            },
            { // Third step
                x: 950,
                y: 390,
                title: "Encombrement au sol",
                correctAnswer: false,
                position: 3
            },
            {
                x: 1000,
                y: 515,
                title: "Menuisier posant les portes du placard de l’entrée",
                correctAnswer: false,
                position: 3
            },
            {
                x: 1085,
                y: 190,
                title: "Emprunter le garage",
                correctAnswer: true,
                position: 3
            },
        ]
    },
    question: {
        title: "Les ouvriers disposent de 8 heures pour réaliser la pose de parquet.\nAfin de réaliser ce travail dans les meilleurs conditions, sélectionner les principes de prévention les\nplus adaptés parmi les propositions suivantes:",
        answers: [
            {
                title: "- Organiser son poste de travail, adapter le travail à l’homme, éviter les risques",
                correctAnswer: true
            },
            {
                title: "- Donner la priorité aux mesures de protection collective, donner les instructions appropriées aux salariés,\nadapter l’homme au travail",
                correctAnswer: false
            },
            {
                title: "- Donner la priorité aux mesures de protection individuelle, organiser son poste de travail, éviter les risques",
                correctAnswer: false
            },
        ]
    }
}
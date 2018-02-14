/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu14",
    background: {
        title: "Vous devez approvisionner votre poste de travail en partant du portail. Vous avez un chariot à disposition.",
        key: "bg",
        start: {
            x: 1100,
            y: 720,
            title: "Point de départ"
        },
        work: {
            x: 420,
            y: 280,
            title: "Poste de travail"
        },
        area: [
            { // First step
                x: 800,
                y: 560,
                title: "Emprunter la cours de graviers",
                correctAnswer: false,
                position: 1
            },
            {
                x: 650,
                y: 650,
                title: "Emprunter la cours bitumée",
                correctAnswer: true,
                position: 1
            },
            {
                x: 1000,
                y: 450,
                title: "Emprunter les escaliers",
                correctAnswer: false,
                position: 1
            },
            { // Second step
                x: 650,
                y: 380,
                title: "Passer les éléments par la fenêtre",
                correctAnswer: false,
                position: 2
            },
            {
                x: 800,
                y: 335,
                title: "Passer par la porte d’entrée",
                correctAnswer: false,
                position: 2
            },
            {
                x: 440,
                y: 520,
                title: "Demander au client d’enlever sa voiture du garage",
                correctAnswer: true,
                position: 2
            },
            { // Third step
                x: 720,
                y: 200,
                title: "Encombrement au sol",
                correctAnswer: false,
                position: 3
            },
            {
                x: 720,
                y: 280,
                title: "Menuisier posant les portes du placard de l’entrée",
                correctAnswer: false,
                position: 3
            },
            {
                x: 260,
                y: 260,
                title: "Emprunter le garage",
                correctAnswer: true,
                position: 3
            },
        ]
    },
    question: {
        title: "Les ouvriers doivent réaliser une pose de parquet dans les conditions ci-dessous. Afin de réaliser ce travail dans les meilleurs conditions possibles, sélectionner les principes de prévention les plus adaptés parmi les propositions suivantes:",
        key: "image",
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
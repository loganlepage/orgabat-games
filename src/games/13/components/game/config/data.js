/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu13",
    background: {
        title: "background",
        key: "bg",
        area: [
            {
                x: 1155,
                y: 600,
                title: "1",
                correctAnswer: "5"
            },
            {
                x: 1325,
                y: 420,
                title: "2",
                correctAnswer: "3"
            },
            {
                x: 800,
                y: 780,
                title: "3",
                correctAnswer: "8"
            },
            {
                x: 570,
                y: 550,
                title: "4",
                correctAnswer: "4"
            },
            {
                x: 145,
                y: 70,
                title: "5",
                correctAnswer: "7"
            },
        ]
    },
    responses: {
        title: "Réponses possibles",
        images: [
            {
                key: "1",
                title: "1"
            },
            {
                key: "2",
                title: "2"
            },
            {
                key: "3",
                title: "3"
            },
            {
                key: "4",
                title: "4"
            },
            {
                key: "5",
                title: "5"
            },
            {
                key: "6",
                title: "6"
            },
            {
                key: "7",
                title: "7"
            },
            {
                key: "8",
                title: "8"
            },
        ]
    }
}
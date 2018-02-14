/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu12",
    images: [
        {
            title: "Image n°1",
            key: "1",
            shapes: [
                {
                    x: -60,
                    y: -25,
                    correctAnswer: "shapeY4"
                }
            ]
        },
        {
            title: "Image n°2",
            key: "2",
            shapes: [
                {
                    x: -35,
                    y: 150,
                    correctAnswer: "shapeY3"
                },
                {
                    x: 230,
                    y: 0,
                    correctAnswer: "shapeY4"
                }
            ]
        },
        {
            title: "Image n°3",
            key: "3",
            shapes: [
                {
                    x: -140,
                    y: -110,
                    correctAnswer: "shapeG2"
                }
            ]
        },
        {
            title: "Image n°4",
            key: "4",
            shapes: [
                {
                    x: -5,
                    y: -135,
                    correctAnswer: "shapeY1"
                },
                // {
                //     x: -155,
                //     y: -40,
                //     correctAnswer: "shapeY1"
                // },
                {
                    x: -60,
                    y: -30,
                    correctAnswer: "shapeY2"
                },
                // {
                //     x: 10,
                //     y: 65,
                //     correctAnswer: "shapeY1"
                // },
                {
                    x: -80,
                    y: 120,
                    correctAnswer: "shapeY3"
                }
            ],
            lines: [
                {
                    x1: -5,
                    y1: -120,
                    x2: -5,
                    y2: 70,
                },
                {
                    x1: -20,
                    y1: -130,
                    x2: -140,
                    y2: -45,
                }
            ]
        },
        {
            title: "Image n°5",
            key: "5",
            shapes: [
                {
                    x: -180,
                    y: -25,
                    correctAnswer: "shapeY1"
                },
                {
                    x: -60,
                    y: -70,
                    correctAnswer: "shapeY2"
                },
                // {
                //     x: 105,
                //     y: -15,
                //     correctAnswer: "shapeY1"
                // },
                // {
                //     x: 40,
                //     y: 30,
                //     correctAnswer: "shapeY2"
                // }
            ],
            lines: [
                {
                    x1: -54,
                    y1: -54,
                    x2: -35,
                    y2: 25,
                },
                {
                    x1: -164,
                    y1: -20,
                    x2: 175,
                    y2: -20,
                }
            ]
        },
        {
            title: "Image n°6",
            key: "6",
            shapes: [
                {
                    x: -100,
                    y: -55,
                    correctAnswer: "shapeG1"
                },
                {
                    x: 110,
                    y: -120,
                    correctAnswer: "shapeG2"
                }
            ]
        }
    ],
    responses: {
        shape1: {
            key: "shapeY1",
            title: "Rails d'arrimage"
        },
        shape2: {
            key: "shapeY2",
            title: "Barres de blocage"
        },
        shape3: {
            key: "shapeY3",
            title: "Points d'arrimage"
        },
        shape4: {
            key: "shapeY4",
            title: "Parois de séparation"
        },
        shape5: {
            key: "shapeG1",
            title: "Paroi de séparation"
        },
        shape6: {
            key: "shapeG2",
            title: "Galerie"
        }
    }
}
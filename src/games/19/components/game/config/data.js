/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu19",
    responses: [
    {
        key:'sable',
        x: -350,
        y: -200
    },
    {
        key:'graviers',
        x: -350,
        y: -100
    },
    {
        key:'agglos',
        x: -350,
        y: 0
    }
    ],
    background: {
        title: "Plan de la maison, il faut déplacer les matériaux aux bons endroits",
        key: "bg",
        area: [
        {
            x: -100,
            y: -350,
            correctAnswer: []
        },
        {
            x: -200,
            y: -350,
            correctAnswer: []
        },
        {
            x: -300,
            y: -350,
            correctAnswer: []
        },
        {
            x: -540,
            y: -100,
            correctAnswer: ['graviers', 'sable']
        },
        {
            x: -540,
            y: 0,
            correctAnswer: ['graviers', 'sable'],
        },
        {
            x: -540,
            y: 100,
            correctAnswer: ['graviers', 'sable']
        },
        {
            x: 200,
            y: 200,
            correctAnswer: ['agglos']
        },
        {
            x: 300,
            y: 200,
            correctAnswer: ['agglos']
        },
        {
            x: 400,
            y: 200,
            correctAnswer: ['agglos']
        }
        ]
    }
}
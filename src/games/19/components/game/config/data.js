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
        x: 200,
        y: 100
    },
    {
        key:'graviers',
        x: 200,
        y: 200
    },
    {
        key:'agglos',
        x: 200,
        y: 300
    }
    ],
    background: {
        title: "Plan de la maison, il faut déplacer les matériaux aux bons endroits",
        key: "bg",
        area: [
        {
            x: 400,
            y: 150,
            correctAnswer: []
        },
        {
            x: 500,
            y: 150,
            correctAnswer: []
        },
        {
            x: 600,
            y: 150,
            correctAnswer: []
        },
        {
            x: 150,
            y: 450,
            correctAnswer: ['graviers', 'sable']
        },
        {
            x: 150,
            y: 550,
            correctAnswer: ['graviers', 'sable'],
        },
        {
            x: 150,
            y: 650,
            correctAnswer: ['graviers', 'sable']
        },
        {
            x: 900,
            y: 600,
            correctAnswer: ['agglos']
        },
        {
            x: 1000,
            y: 600,
            correctAnswer: ['agglos']
        },
        {
            x: 1100,
            y: 600,
            correctAnswer: ['agglos']
        }
        ]
    }
}
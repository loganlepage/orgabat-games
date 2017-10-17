/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu23",
    steps:[
    {
        title: "Analyser la situation de travail et évaluer le risque d’accident",
        quest: "analyze_quest",
        repo: "analyse",
        background: "analyse",
        responses:[
        {
            key:"analyse1",
            x: 200,
            y: 200
        },
        {
            key:"analyse2",
            x: 200,
            y: 300
        },
        {
            key:"analyse3",
            x: 200,
            y: 400
        },
        {
            key:"analyse4",
            x: 200,
            y: 500
        },
        {
            key:"analyse5",
            x: 200,
            y: 600
        },
        ], // end responses
        shapes: [
        {
            key:"shape1",
            x: 200,
            y: 200,
            answer: ["analyse1"]
        },
        {
            key:"shape1",
            x: 200,
            y: 200,
            answer: ["analyse2"]
        },
        {
            key:"shape1",
            x: 200,
            y: 200,
            answer: ["analyse3"]
        },
        {
            key:"shape1",
            x: 200,
            y: 200,
            answer: ["analyse4"]
        },
        {
            key:"shape1",
            x: 200,
            y: 200,
            answer: ["analyse5"]
        },
        ] // end shapes
    }, // end step
    ]
}
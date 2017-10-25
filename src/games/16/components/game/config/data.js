/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu16",
    tile: "bg",
    steps:[
    {
        title: "L'intervention se déroule chez un particulier. Cliquer sur le personnage qui permet de rentrer chez le client",
        quest: "player_quest",
        repo: "1/",
        blockStep: false,
        images:[
        {
            key:"1",
            correct: false
        },
        {
            key:"2",
            correct: false
        },
        {
            key:"3",
            correct: false
        },
        {
            key:"4",
            correct: true
        }
        ]
    ]
}
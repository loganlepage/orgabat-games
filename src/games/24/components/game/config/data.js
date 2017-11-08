/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu24",
    background: {
        title: "Repérer les six erreurs afin de compléter la grille de mots fléchés",
        key: "grille"
    },
    images: [
        {
            key:"image1",
            correct: "Huile",
            responses: ["Flaque", "Huile", "Peinture"]
        },
        {
            key:"image2",
            correct: "Lumière",
            responses: ["Couleur", "Ombre", "Lumière"]
        },
        {
            key:"image3",
            correct: "Fils",
            responses: ["Fils", "Sol", "Dalle"]
        },
        {
            key:"image4",
            correct: "Échelle",
            responses: ["Etagère", "Échelle", "Nacelle"]
        },
        {
            key:"image5",
            correct: "Superposer",
            responses: ["Superposer", "Tuberculose", "Transpalette"]
        },
        {
            key:"image6",
            correct: "Écouteurs",
            responses: ["Etagère", "Echaffaudage", "Écouteurs"]
        }
    ]
}
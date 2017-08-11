/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu11",
    items: [
        {
            key: "adhesif",
            mistakes: ["Mauvaises dimensions"],
            quantity: 5,
            dimensions: "",
            note: ""
        },
        {
            key: "cartouche",
            mistakes: [],
            quantity: 36,
            dimensions: "280ml",
            note: ""
        },
        {
            key: "ciment",
            mistakes: ["Produit défectueux"],
            quantity: 3,
            dimensions: "35kg",
            note: "Un sac est éventré"
        },
        {
            key: "coffrage",
            mistakes: [],
            quantity: 50,
            dimensions: "200x27 en 4m",
            note: ""
        },
        {
            key: "contreplaque_agglo",
            mistakes: ["Mauvaises quantités"],
            quantity: 6,
            dimensions: "185x300 en 18mm",
            note: ""
        },
        {
            key: "contreplaque",
            mistakes: [],
            quantity: 8,
            dimensions: "250x122 en 12mm",
            note: ""
        },
        {
            key: "gaine_16",
            mistakes: ["Mauvaises quantités"],
            quantity: 13,
            dimensions: "16mm",
            note: ""
        },
        {
            key: "gaine_20",
            mistakes: ["Non livré"],
            quantity: 0,
            dimensions: "20mm",
            note: ""
        },
        {
            key: "peinture",
            mistakes: [],
            quantity: 2,
            dimensions: "",
            note: ""
        },
        {
            key: "pointes",
            mistakes: ["Mauvaises dimensions"],
            quantity: 10,
            dimensions: "2.7x70",
            note: ""
        },
        {
            key: "vis",
            mistakes: [],
            quantity: 9,
            dimensions: "1000u",
            note: ""
        },
        {
            key: "vmc",
            mistakes: ["Erreur de produit"],
            quantity: 1,
            dimensions: "",
            note: "Hygroréglable Type B"
        }
    ]
}
/** Configs for this game */
export default {
    developer: {
        debug: true
    },
    canvasParent: "#gameDiv",
    atlas: "jeu11",
    states: [
        {
            title: "Mauvaises dimensions"
        },
        {
            title: "Produit défectueux"
        },
        {
            title: "Mauvaises quantités"
        },
        {
            title: "Erreur de produit"
        },
        {
            title: "Produit non livré"
        },
        {
            title: "Produit OK"
        }
    ],
    items: [
        {
            key: "adhesif",
            name: "Adhésif orange",
            mistakes: ["Mauvaises dimensions"],
            quantity: 5,
            dimensions: "",
            note: ""
        },
        {
            key: "cartouche",
            name: "Cartouche silicone",
            mistakes: [],
            quantity: 36,
            dimensions: "280ml",
            note: ""
        },
        {
            key: "ciment",
            name: "Ciment gris",
            mistakes: ["Produit défectueux"],
            quantity: 3,
            dimensions: "35kg",
            note: "Un sac est éventré"
        },
        {
            key: "coffrage",
            name: "Planche de coffrage",
            mistakes: [],
            quantity: 50,
            dimensions: "200x27 en 4m",
            note: ""
        },
        {
            key: "contreplaque_agglo",
            name: "Contreplaqué aggloméré",
            mistakes: ["Mauvaises quantités"],
            quantity: 6,
            dimensions: "185x300 en 18mm",
            note: ""
        },
        {
            key: "contreplaque",
            name: "Contreplaqué",
            mistakes: [],
            quantity: 8,
            dimensions: "250x122 en 12mm",
            note: ""
        },
        {
            key: "gaine_16",
            name: "Gaine ICTA 16mm",
            mistakes: ["Mauvaises quantités"],
            quantity: 13,
            dimensions: "16mm",
            note: ""
        },
        {
            key: "gaine_20",
            name: "Gaine ICTA 20mm",
            mistakes: ["Non livré"],
            quantity: 0,
            dimensions: "20mm",
            note: ""
        },
        {
            key: "peinture",
            name: "Peinture monocouche",
            mistakes: [],
            quantity: 2,
            dimensions: "",
            note: ""
        },
        {
            key: "pointes",
            name: "Pointes tête plates inox",
            mistakes: ["Mauvaises dimensions"],
            quantity: 10,
            dimensions: "2.7x70",
            note: ""
        },
        {
            key: "vis",
            name: "Vis plaques de plâtre",
            mistakes: [],
            quantity: 9,
            dimensions: "1000u",
            note: ""
        },
        {
            key: "vmc",
            name: "VMC Hygroréglable Type B",
            mistakes: ["Erreur de produit"],
            quantity: 1,
            dimensions: "",
            note: "Hygroréglable Type B"
        }
    ]
}
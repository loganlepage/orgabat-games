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
            correctAnswers: ["Produit OK"],
            quantity: 5,
            dimensions: "",
            note: ""
        },
        {
            key: "cartouche",
            name: "Cartouche silicone",
            correctAnswers: ["Produit OK"],
            quantity: 36,
            dimensions: "280ml",
            note: ""
        },
        {
            key: "ciment",
            name: "Ciment gris",
            correctAnswers: ["Produit défectueux"],
            quantity: 3,
            dimensions: "35kg",
            note: "Un sac est éventré"
        },
        {
            key: "coffrage",
            name: "Planche de coffrage",
            correctAnswers: ["Mauvaises dimensions"],
            quantity: 50,
            dimensions: "200x27 en 2m",
            note: ""
        },
        {
            key: "contreplaque_agglo",
            name: "Contreplaqué aggloméré",
            correctAnswers: ["Mauvaises quantités"],
            quantity: 6,
            dimensions: "185x300 en 18mm",
            note: ""
        },
        {
            key: "contreplaque",
            name: "Contreplaqué",
            correctAnswers: ["Produit OK"],
            quantity: 8,
            dimensions: "250x122 en 12mm",
            note: ""
        },
        {
            key: "gaine_16",
            name: "Gaine ICTA 16mm",
            correctAnswers: ["Mauvaises quantités"],
            quantity: 13,
            dimensions: "16mm",
            note: ""
        },
        {
            key: "gaine_20",
            name: "Gaine ICTA 20mm",
            correctAnswers: ["Produit non livré"],
            quantity: 0,
            dimensions: "20mm",
            note: ""
        },
        {
            key: "peinture",
            name: "Peinture monocouche",
            correctAnswers: ["Produit OK"],
            quantity: 6,
            dimensions: "",
            note: ""
        },
        {
            key: "pointes",
            name: "Pointes tête plates inox",
            correctAnswers: ["Mauvaises dimensions"],
            quantity: 10,
            dimensions: "2.7x60",
            note: ""
        },
        {
            key: "vis",
            name: "Vis plaques de plâtre",
            correctAnswers: ["Produit OK"],
            quantity: 9,
            dimensions: "1000u",
            note: ""
        },
        {
            key: "vmc",
            name: "VMC Autoréglable",
            correctAnswers: ["Erreur de produit"],
            quantity: 1,
            dimensions: "",
            note: ""
        }
    ]
}
//Math.floor(Math.random()*(max-min+1)+min) apparition random d'un sprite
/*
 Dans les items, le champ category correspond à une des trois
 catégories du sprite.
 Le champ needed correspond aux bonnes réponses.
 Pour faire en sorte d'indiquer les mauvaises réponses lors de la validation il suffira
 de faire la liste des items avec needed === false
 */
/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: 'jeu4',
    items: {
        materiaux: {
            ferraille: {needed: true, title: "Ferraille", x: 110, y: 100},
            agglos: {needed: true, title: "Agglos", x: 250, y: 100},
            briques: {needed: false, title: "Briques", x: 380, y: 100},
            beton_cellulaire: {needed: false, title: "Béton cellulaire", x: 110, y: 190},
            sacs_de_chaux: {needed: false, title: "Sacs de chaux", x: 250, y: 185},
            sacs_de_ciment: {needed: true, title: "Sacs de ciment", x: 380, y: 180},
            adjuvant: {needed: false, title: "Adjuvant", x: 110, y: 285},
            sable: {needed: true, title: "Sable", x: 250, y: 275},
            graviers: {needed: true, title: "Graviers", x: 380, y: 265},
            eau: {needed: true, title: "Eau", x: 110, y: 380},
            bois: {needed: false, title: "Bois", x: 250, y: 365},
            huile_de_decoffrage: {needed: false, title: "Huile de Decoffrage", x: 380, y: 350},
            appuis_de_fenetre: {needed: false, title: "Appuis de fenetre"},
            boisseau_de_cheminee: {needed: false, title: "Boisseau de cheminee"},
            bidon: {needed: false, title: "Bidon"},
            trapco: {needed: false, title: "Trapco"},
            monocouche_d_enduit: {needed: false, title: "Monocouche D'enduit"},
            poutrelles: {needed: false, title: "Poutrelles"},
        }, materiels: {
            pelle: {needed: true, title: "Pelle", x: 520, y: 95},
            seau: {needed: true, title: "Seau", x: 590, y: 95},
            metre: {needed: true, title: "Metre", x: 660, y: 95},
            crayon: {needed: true, title: "Crayon", x: 730, y: 95},
            equerre: {needed: false, title: "Equerre", x: 800, y: 95},
            fil_a_plomb: {needed: true, title: "Fil à plomb", x: 870, y: 95},
            niveau: {needed: false, title: "Niveau", x: 520, y: 175},
            laser: {needed: false, title: "Laser", x: 590, y: 175},
            truelle: {needed: true, title: "Truelle", x: 660, y: 175},
            macette: {needed: true, title: "Macette", x: 730, y: 175},
            marteau_de_coffreur: {needed: false, title: "Marteau de coffreur", x: 800, y: 175},
            regle_en_alu: {needed: true, title: "Regle en alu", x: 870, y: 175},
            ciseau_a_brique: {needed: false, title: "Ciseau à brique", x: 520, y: 255},
            pointrolle: {needed: false, title: "Pointrolle", x: 590, y: 255},
            scie_circulaire: {needed: false, title: "Scie circulaire", x: 660, y: 255},
            pioche: {needed: false, title: "Pioche", x: 730, y: 255},
            auge: {needed: true, title: "Auge", x: 800, y: 255},
            brouette: {needed: true, title: "Brouette", x: 870, y: 255},
            betonniere: {needed: true, title: "Betonniere", x: 520, y: 335},
            groupe_electrogene: {needed: false, title: "Groupe electrogene", x: 590, y: 335},
        }, epi: {
            gants: {needed: true, title: "Gants"},
            lunette_de_protection: {needed: false, title: "Lunette de protection", x: 1010, y: 110},
            chaussures_de_securite: {needed: true, title: "Chaussures de Securité", x: 1150, y: 110},
            casque_de_chantier: {needed: false, title: "Casque de Chantier", x: 1280, y: 110},
            casque_anti_bruit: {needed: true, title: "Casque Anti-bruit", x: 1010, y: 190},
            vetement_de_travail: {needed: true, title: "Vêtement de travail", x: 1150, y: 195},
            genouilleres: {needed: false, title: "Genouilleres", x: 1280, y: 200},
            masque_anti_poussieres: {needed: false, title: "Masque Anti-poussieres", x: 1010, y: 275},
            bottes_de_securite: {needed: false, title: "Bottess de sécurité", x: 1150, y: 285},
            combinaisons_jetables: {needed: false, title: "Combinaisons jetables", x: 1280, y: 295},
            trousse_de_secours: {needed: true, title: "Trousse de secours", x: 1010, y: 360},
        }
    }
}
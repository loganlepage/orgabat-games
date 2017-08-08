/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: 'jeu4',
    items: {
        materiaux: {
            ferraille: {needed: true, title: "Ferraille", x: 670, y: 532},
            agglos: {needed: true, title: "Agglos", x: 440, y: 700},
            hourdis: {needed: true, title: "Hourdis", x: 530, y: 755},
            briques: {needed: false, title: "Briques", x: 615, y: 810},
            beton_cellulaire: {needed: false, title: "Béton cellulaire", x: 685, y: 700},
            sacs_de_ciment: {needed: true, title: "Sacs de ciment", x: 470, y: 540},
            sable: {needed: true, title: "Sable", x: 330, y: 230},
            graviers: {needed: true, title: "Graviers", x: 160, y: 325},
            eau: {needed: true, title: "Eau", x: 345, y: 440},
            bois: {needed: false, title: "Bois", x: 850, y: 630},
            boisseau_de_cheminee: {needed: false, title: "Boisseau de cheminee", x: 555, y: 620},
            bidon: {needed: false, title: "Bidon", x: 925, y: 455},
        }, materiels: {
            pelle: {needed: true, title: "Pelle", x: 1050, y: 311},
            seau: {needed: true, title: "Seau", x: 865, y: 500},
            metre: {needed: true, title: "Metre", x: 1215, y: 415},
            crayon: {needed: true, title: "Crayon", x: 1070, y: 260},
            equerre: {needed: false, title: "Equerre", x: 1080, y: 230},
            fil_a_plomb: {needed: true, title: "Fil à plomb", x: 1155, y: 390},
            niveau: {needed: false, title: "Niveau", x: 1120, y: 530},
            truelle: {needed: true, title: "Truelle", x: 1105, y: 450},
            macette: {needed: true, title: "Macette", x: 1070, y: 430},
            regle_en_alu: {needed: true, title: "Regle en alu", x: 1025, y: 570},
            ciseau_a_brique: {needed: false, title: "Ciseau à brique", x: 1025, y: 400},
            pioche: {needed: false, title: "Pioche", x: 940, y: 340},
            auge: {needed: true, title: "Auge", x: 775, y: 440},
            brouette: {needed: true, title: "Brouette", x: 845, y: 390},
            betonniere: {needed: true, title: "Betonniere", x: 570, y: 330},
        }, epi: {
            gants: {needed: true, title: "Gants", x: 1070, y: 110},
            lunettes_de_protection: {needed: false, title: "Lunettes de protection", x: 1125, y: 145},
            chaussures_de_securite: {needed: true, title: "Chaussures de Securité", x: 1260, y: 200},
            casque_de_chantier: {needed: false, title: "Casque de Chantier", x: 1215, y: 310},
            casque_anti_bruit: {needed: true, title: "Casque Anti-bruit", x: 1000, y: 70},
            vetements_de_travail: {needed: true, title: "Vêtements de travail", x: 1300, y: 350},
            genouilleres: {needed: false, title: "Genouilleres", x: 1175, y: 270},
            masque_anti_poussieres: {needed: false, title: "Masque Anti-poussieres", x: 1190, y: 175},
            bottes_de_securite: {needed: false, title: "Bottess de sécurité", x: 1325, y: 230},
            trousse_de_secours: {needed: true, title: "Trousse de secours", x: 1010, y: 190},
        }
    }
}
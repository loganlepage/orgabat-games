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
            ferraille: {needed: true, title: "Ferraille", x: 470, y: 440},
            agglos: {needed: true, title: "Agglos", x: 130, y: 560},
            hourdis: {needed: true, title: "Hourdis", x: 205, y: 470},
            briques: {needed: false, title: "Briques", x: 340, y: 470},
            beton_cellulaire: {needed: false, title: "Béton cellulaire", x: 295, y: 530},
            sacs_de_ciment: {needed: true, title: "Sacs de ciment", x: 225, y: 265},
            sable: {needed: true, title: "Sable", x: 210, y: 140},
            graviers: {needed: true, title: "Graviers", x: 70, y: 200},
            eau: {needed: true, title: "Eau", x: 100, y: 340},
            bois: {needed: false, title: "Bois", x: 300, y: 360},
            boisseau_de_cheminee: {needed: false, title: "Boisseau de cheminee", x: 75, y: 480},
            bidon: {needed: false, title: "Bidon", x: 555, y: 300},
        }, materiels: {
            pelle: {needed: true, title: "Pelle", x: 790, y: 280},
            seau: {needed: true, title: "Seau", x: 495, y: 335},
            metre: {needed: true, title: "Metre", x: 880, y: 340},
            crayon: {needed: true, title: "Crayon", x: 750, y: 200},
            equerre: {needed: false, title: "Equerre", x: 775, y: 175},
            fil_a_plomb: {needed: true, title: "Fil à plomb", x: 810, y: 370},
            niveau: {needed: false, title: "Niveau", x: 710, y: 405},
            truelle: {needed: true, title: "Truelle", x: 675, y: 230},
            macette: {needed: true, title: "Macette", x: 660, y: 300},
            regle_en_alu: {needed: true, title: "Regle en alu", x: 730, y: 380},
            ciseau_a_brique: {needed: false, title: "Ciseau à brique", x: 615, y: 270},
            pioche: {needed: false, title: "Pioche", x: 720, y: 330},
            auge: {needed: true, title: "Auge", x: 570, y: 380},
            brouette: {needed: true, title: "Brouette", x: 630, y: 350},
            betonniere: {needed: true, title: "Betonniere", x: 360, y: 290},
        }, epi: {
            gants: {needed: true, title: "Gants", x: 740, y: 80},
            lunettes_de_protection: {needed: false, title: "Lunettes de protection", x: 790, y: 110},
            chaussures_de_securite: {needed: true, title: "Chaussures de Securité", x: 885, y: 165},
            casque_de_chantier: {needed: false, title: "Casque de Chantier", x: 860, y: 240},
            casque_anti_bruit: {needed: true, title: "Casque Anti-bruit", x: 690, y: 55},
            vetements_de_travail: {needed: true, title: "Vêtements de travail", x: 940, y: 280},
            genouilleres: {needed: false, title: "Genouilleres", x: 820, y: 215},
            masque_anti_poussieres: {needed: false, title: "Masque Anti-poussieres", x: 830, y: 135},
            bottes_de_securite: {needed: false, title: "Bottess de sécurité", x: 945, y: 185},
            trousse_de_secours: {needed: true, title: "Trousse de secours", x: 710, y: 140},
        }
    }
}
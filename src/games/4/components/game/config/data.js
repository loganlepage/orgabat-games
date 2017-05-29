//Math.floor(Math.random()*(max-min+1)+min) apparition random d'un sprite
/** Configs for this game */
export default {
    developer: {
        debug: false
    },
    canvasParent: "#gameDiv",
    atlas: 'jeu4',
    entities: {
        items: [
            {
                name: "ferraille",
                category: 'materiaux',
                isNeeded: true,
                prop: {name: "Ferraille"}
            },
            {name: "agglos", category: 'materiaux', isNeeded: true, prop: {name: "Agglos"}},
            {name: "briques", category: 'materiaux', isNeeded: false, prop: {name: "Briques"}},
            {name: "béton_cellulaire", category: 'materiaux', isNeeded: false, prop: {name: "Béton cellulaire"}},
            {name: "sacs_de_chaux", category: 'materiaux', isNeeded: false, prop: {name: "Sacs de chaux"}},
            {name: "sacs_de_ciment", category: 'materiaux', isNeeded: true, prop: {name: "Sacs de ciment"}},
            {name: "adjuvant", category: 'materiaux', isNeeded: false, prop: {name: "Adjuvant"}},
            {name: "sable", category: 'materiaux', isNeeded: true, prop: {name: "Sable"}},
            {name: "graviers", category: 'materiaux', isNeeded: true, prop: {name: "Graviers"}},
            {name: "eau", category: 'materiaux', isNeeded: true, prop: {name: "Eau"}},
            {name: "bois", category: 'materiaux', isNeeded: false, prop: {name: "Bois"}},
            {name: "huile_de_decoffrage", category: 'materiaux', isNeeded: false, prop: {name: "Huile de Decoffrage"}},
            {name: "appuis_de_fenetre", category: 'materiaux', isNeeded: false, prop: {name: "Appuis de fenetre"}},
            {
                name: "boisseau_de_cheminee",
                category: 'materiaux',
                isNeeded: false,
                prop: {name: "Boisseau de cheminee"}
            },
            {name: "bidon", category: 'materiaux', isNeeded: false, prop: {name: "Bidon"}},
            {name: "trapco", category: 'materiaux', isNeeded: false, prop: {name: "Trapco"}},
            {name: "monocouche_d_enduit", category: 'materiaux', isNeeded: false, prop: {name: "Monocouche D'enduit"}},
            {name: "poutrelles", category: 'materiaux', isNeeded: false, prop: {name: "Poutrelles"}},
            {name: "gants", category: 'EPI', isNeeded: true, prop: {name: "Gants"}},
            {name: "lunette_de_protection", category: 'EPI', isNeeded: false, prop: {name: "Lunette de protection"}},
            {name: "chaussures_de_securite", category: 'EPI', isNeeded: true, prop: {name: "Chaussures de Securité"}},
            {name: "casque_de_chantier", category: 'EPI', isNeeded: false, prop: {name: "Casque de Chantier"}},
            {name: "casque_anti_bruit", category: 'EPI', isNeeded: true, prop: {name: "Casque Anti-bruit"}},
            {name: "vetement_de_travail", category: 'EPI', isNeeded: true, prop: {name: "Vêtement de travail"}},
            {name: "genouilleres", category: 'EPI', isNeeded: false, prop: {name: "Genouilleres"}},
            {name: "masque_anti_poussieres", category: 'EPI', isNeeded: false, prop: {name: "Masque Anti-poussieres"}},
            {name: "bottes_de_securite", category: 'EPI', isNeeded: false, prop: {name: "Bottess de sécurité"}},
            {name: "combinaisons_jetables", category: 'EPI', isNeeded: false, prop: {name: "Combinaisons jetables"}},
            {name: "trousse_de_secours", category: 'EPI', isNeeded: true, prop: {name: "Trousse de secours"}},
            {name: "pelle", category: 'materiels', isNeeded: true, prop: {name: "Pelle"}},
            {name: "seau", category: 'materiels', isNeeded: true, prop: {name: "Seau"}},
            {name: "metre", category: 'materiels', isNeeded: true, prop: {name: "Metre"}},
            {name: "crayon", category: 'materiels', isNeeded: true, prop: {name: "Crayon"}},
            {name: "equerre", category: 'materiels', isNeeded: false, prop: {name: "Equerre"}},
            {name: "fil_a_plomb", category: 'materiels', isNeeded: true, prop: {name: "Fil à plomb"}},
            {name: "niveau", category: 'materiels', isNeeded: false, prop: {name: "Niveau"}},
            {name: "laser", category: 'materiels', isNeeded: false, prop: {name: "Laser"}},
            {name: "truelle", category: 'materiels', isNeeded: true, prop: {name: "Truelle"}},
            {name: "macette", category: 'materiels', isNeeded: true, prop: {name: "Macette"}},
            {name: "marteau_de_coffreur", category: 'materiels', isNeeded: false, prop: {name: "Marteau de coffreur"}},
            {name: "regle_en_alu", category: 'materiels', isNeeded: true, prop: {name: "Regle en alu"}},
            {name: "ciseau_a_brique", category: 'materiels', isNeeded: false, prop: {name: "Ciseau à brique"}},
            {name: "pointrolle", category: 'materiels', isNeeded: false, prop: {name: "Pointrolle"}},
            {name: "scie_circulaire", category: 'materiels', isNeeded: false, prop: {name: "Scie circulaire"}},
            {name: "pioche", category: 'materiels', isNeeded: false, prop: {name: "Pioche"}},
            {name: "auge", category: 'materiels', isNeeded: true, prop: {name: "Auge"}},
            {name: "brouette", category: 'materiels', isNeeded: true, prop: {name: "Brouette"}},
            {name: "betonniere", category: 'materiels', isNeeded: true, prop: {name: "Betonniere"}},
            {name: "groupe_electrogene", category: 'materiels', isNeeded: false, prop: {name: "Groupe electrogene"}},
        ]
    }
}
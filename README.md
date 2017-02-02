# Projet ORGABAT (jeux)
Répertoire de travail pour les jeux du projet [ORGABAT]

## Récupération du projet et installation des dépendances
Positionnez vous à la racine du projet ORGABAT
```sh
git submodule update --init
cd ./web/modules/game
npm install
```

## Installer le transpiler
```sh
npm install -g webpack
```

## Utilisation
Créer un fichier minifié pour chaque jeu (production),
vous pouvez faire CTRL+C dès que terminé.
```sh
webpack -p
```

Créer un fichier pour chaque jeu sans minification (développement),
update automatique à chaque modification (watcher).
```sh
webpack
```







[ORGABAT]: <https://github.com/Five52/orgabat>

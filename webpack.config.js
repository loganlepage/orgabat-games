var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');
//
var isProd = process.argv.indexOf("-p") > -1;

module.exports = {
    /** nos points d'entrée, par clé */
    entry: {
        '1': "./src/games/1/app.jsx", // Jeu 1
        '2': "./src/games/2/app.jsx", // Jeu 2
        '3': "./src/games/3/app.jsx", // Jeu 3
        '4': "./src/games/4/app.jsx", // Jeu 4
        '5': "./src/games/5/app.jsx", // Jeu 5
        '6': "./src/games/6/app.jsx", // Jeu 6
        '7': "./src/games/7/app.jsx", // Jeu 7
        '8': "./src/games/8/app.jsx", // Jeu 8
        '9': "./src/games/9/app.jsx", // Jeu 9
        '10': "./src/games/10/app.jsx", // Jeu 10
        '11': "./src/games/11/app.jsx", // Jeu 11
        '12': "./src/games/12/app.jsx", // Jeu 12
        '13': "./src/games/13/app.jsx", // Jeu 13
        '14': "./src/games/14/app.jsx", // Jeu 14
        '15': "./src/games/15/app.jsx", // Jeu 15
        '99': "./src/games/99/app.jsx" // Jeu 99
    },
    /** description de nos sorties */
    output: {
        // ./dist
        path: path.join(__dirname, "dist"),
        // - dist/index.js
        filename: "[name].js",
        // notre base url
        publicPath: "/"
    },

    watch: true,

    resolve: {
        /** On ajoute un alias vers nos bibliothèques pour le require */
        alias: {
            'system': path.resolve("./src/system"),
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2,
        },
        /** On ajoute nos extensions à résoudre lors d'un require() */
        extensions: ["", ".js", ".jsx", ".json"]
    },
    module: {
        /** Liste de nos loaders (exécutés en ordre inverse) */
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['jsx', 'babel']
            },
            {test: /pixi\.js/, loader: 'expose?PIXI'},
            {test: /phaser-split\.js$/, loader: 'expose?Phaser'},
            {test: /p2\.js/, loader: 'expose?p2'},

            // à l'inverse de node et browserify, Webpack ne gère pas les json
            // nativement, il faut donc un loader pour que cela soit transparent
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },
    plugins: (
        [
            // on active l'extraction CSS (en production seulement)
            new ExtractTextPlugin("[name].css", {disable: !isProd}),

            // ce plugin permet de transformer les clés passés en dur dans les
            // modules ainsi vous pourrez faire dans votre code js
            // if (__PROD__) { ... }
            new webpack.DefinePlugin({
                "process.env": {NODE_ENV: JSON.stringify(process.env.NODE_ENV || isProd ? 'production' : 'development')}
            })
        ]
        // en production, on peut rajouter des plugins pour optimiser
            .concat(
                isProd
                    ? [
                        // ici on rajoute uglify.js pour compresser nos sorties
                        // (vous remarquerez que certain plugins sont directement livrés dans
                        // le package webpack).
                        new webpack.optimize.UglifyJsPlugin({
                            compress: {
                                warnings: false,
                            }
                        })
                    ]
                    : []
            )
    ),
};
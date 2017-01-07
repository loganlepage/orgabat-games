/**
 * Documentations
 * https://webpack.github.io/docs/configuration.html
 * https://www.npmjs.com/package/phaser#webpack-config
 * https://webpack.github.io/docs/multiple-entry-points.html
 */

var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/');

/**
 * On peut passer à notre commande de build l'option --production
 * @type {boolean}
 */
var production = process.argv.indexOf("--production") > -1;

module.exports = {
    /** nos points d'entrée, par clé */
    entry: {
        '1': "./src/games/1/main.js", // Jeu 1
        '2': "./src/games/2/main.js" // Test
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
            'phaser': path.join(phaserModule, 'build/custom/phaser-split.js'),
            'pixi': path.join(phaserModule, 'build/custom/pixi.js'),
            'p2': path.join(phaserModule, 'build/custom/p2.js')
        },
        /**
         * On peut ajouter nos extensions à résoudre lors d'un require()
         * On autorise rien, ou .js(on)
         */
        extensions: [
            "",
            ".js",
            ".json"
        ]
    },
    module: {
        /**
         * Liste de nos loaders
         * Les loaders sont exécutés en ordre inverse
         */
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    "babel"
                ]
            },
            { test: /pixi\.js/, loader: 'expose?PIXI' },
            { test: /phaser-split\.js$/, loader: 'expose?Phaser' },
            { test: /p2\.js/, loader: 'expose?p2' },

            // à l'inverse de node et browserify, Webpack ne gère pas les json
            // nativement, il faut donc un loader pour que cela soit transparent
            {
                test: /\.json$/,
                loaders: [
                    "json"
                ]
            }
        ]
    },
    plugins: (
        [
            // on active l'extraction CSS (en production seulement)
            new ExtractTextPlugin("[name].css", {disable: !production}),

            // ce plugin permet de transformer les clés passés en dur dans les
            // modules ainsi vous pourrez faire dans votre code js
            // if (__PROD__) { ... }
            new webpack.DefinePlugin({
                __PROD__: production
            }),
        ]
        // en production, on peut rajouter des plugins pour optimiser
        .concat(
            production
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
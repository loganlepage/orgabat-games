var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * On peut passer à notre commande de build l'option --production
 * @type {boolean}
 */
var production = process.argv.indexOf("--production") > -1;

module.exports = {
    /** nos points d'entrée, par clé */
    entry: {
        index: [
            "./src/js/index.js"
        ]
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
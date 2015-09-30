var path = require('path')
    , webpack = require('webpack')
;

module.exports = {
    context: __dirname,
    entry: {
        'jquery.transport.xdr': './src/jquery.transport.xdr.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js',
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    externals: {
        "jquery": "jQuery"
    }
};

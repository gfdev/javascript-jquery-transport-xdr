var path = require('path')
    , webpack = require('webpack')
    , minimize = process.argv.indexOf('--no-minimize') === -1 ? true : false
    , plugins = []
;

minimize && plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = {
    context: __dirname,
    entry: {
        'jquery.transport.xdr': './src/jquery.transport.xdr.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]' + (minimize ? '.min.' : '.') + 'js',
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: plugins,
    externals: {
        "jquery": "jQuery",
        "$": "jQuery"
    }
};

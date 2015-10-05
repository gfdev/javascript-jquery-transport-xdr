var path = require('path')
    , webpack = require('webpack')
    , pack = process.argv.indexOf('--no-minimize') === -1 ? true : false
    , plugins = []
;

pack && plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = {
    context: __dirname,
    entry: {
        'jquery.transport.xdr': './src/jquery.transport.xdr.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]' + (pack ? '.min.' : '.') + 'js',
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    plugins: plugins,
    externals: {
        "jquery": "jQuery"
    }
};

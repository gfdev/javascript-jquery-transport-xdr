require('babel-polyfill');

var pkg = require('./package.json')
    , webpack = require('webpack')
    , cloneDeep = require('lodash.clonedeep')
    , src = __dirname + '/src'
;

var defaults = {
    context: src,
    entry: '../index',
    output: {
        path: __dirname + '/dist',
        filename: 'jquery.transport.xdr.js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            { test: /\.jsx$/, include: src, loader: 'eslint' }
        ],
        loaders: [
            { test: /\.jsx$/, include: src, loader: 'babel?cacheDirectory' }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    externals: {
        'jquery': 'jQuery'
    }
};

var minimized = cloneDeep(defaults);

minimized.plugins.push(new webpack.optimize.UglifyJsPlugin());
minimized.output.filename = 'jquery.transport.xdr.min.js';

module.exports = [ defaults, minimized ];

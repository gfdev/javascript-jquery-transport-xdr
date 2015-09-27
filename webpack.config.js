var path = require('path')
    , webpack = require('webpack')
    , TransferWebpackPlugin = require('transfer-webpack-plugin')
;

module.exports = {
    context: __dirname,
    entry: {
        'jquery.transport.xdr': './src/jquery.transport.xdr.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].min.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new TransferWebpackPlugin([
            { from: 'src' }
        ])
    ],
    externals: {
        "jquery": "jQuery"
    }
};

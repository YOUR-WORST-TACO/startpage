const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.tsx',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [{loader: 'url-loader'}]
            }
        ]
    },
    output: {
        path: __dirname + '/dist/public',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        })
    ]
}

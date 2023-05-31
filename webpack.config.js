const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

require('dotenv').config();

const is_dev_mode = process.env.NODE_ENV !== 'production';
const CLIENT_PORT = process.env.CLIENT_PORT || 8085; // DEV MODE ONLY
const SERVER_PORT = process.env.SERVER_PORT || 3000; // DEV MODE ONLY

module.exports = {
    entry: "./client/index.tsx",
    mode: (is_dev_mode ? "development" : "production"),
    devtool: is_dev_mode && 'inline-source-map',
    output: {
        filename: "bundle.[fullhash].js",
        path: path.resolve(__dirname, "dist", "client"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./assets/index.html",
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify
        })
    ],
    resolve: {
        modules: [__dirname, "client", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [{
            test: /\.(jsx?|tsx?)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ["style-loader", "css-loader"],
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            exclude: /node_modules/,
            use: ["file-loader"],
        }]
    },
    devServer: {
        port: CLIENT_PORT,
        proxy: {
            '/api': `http://localhost:${SERVER_PORT}`,
            '/assets': `http://localhost:${SERVER_PORT}`
        }
    }
};

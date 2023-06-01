/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const path = require('path');

const is_dev_mode = process.env.NODE_ENV !== 'production';
const CLIENT_PORT = process.env.CLIENT_PORT || 8085; // DEV MODE ONLY
const SERVER_PORT = process.env.SERVER_PORT || 3000; // DEV MODE ONLY

module.exports = {
    entry: "./client/index.tsx",
    mode: (is_dev_mode ? "development" : "production"),
    devtool: is_dev_mode && 'inline-source-map',
    output: {
        filename: "[name]-[fullhash]-bundle.js",
        path: path.resolve(__dirname, "dist", "client"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./assets/index.html",
        }),
        new DotenvPlugin(),
    ],
    resolve: {
        modules: [__dirname, "client", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    optimization: {
        minimize: ! is_dev_mode,
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

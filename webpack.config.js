const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const CLIENT_PORT = process.env.CLIENT_PORT;
const SERVER_PORT = process.env.SERVER_PORT || 3000;

module.exports = {
    entry: "./client/index.tsx",
    mode: "development",
    devtool: 'inline-source-map',
    output: {
        filename: "bundle.[fullhash].js",
        path: path.resolve(__dirname, "dist", "client"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./assets/index.html",
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

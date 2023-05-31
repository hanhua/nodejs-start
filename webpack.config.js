const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: "./client/index.tsx",
    mode: "development",
    output: {
        filename: "bundle.[fullhash].js",
        path: path.resolve(__dirname, "dist"),
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
    }
};

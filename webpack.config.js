/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

const is_dev_mode = process.env.NODE_ENV !== 'production';
const CLIENT_PORT = process.env.CLIENT_PORT || 8085; // DEV MODE ONLY
const SERVER_PORT = process.env.SERVER_PORT || 3000; // DEV MODE ONLY


const plugins = [
    new HtmlWebpackPlugin({
        template: "./assets/index.html",
    }),
    new DotenvPlugin(),
];
if (is_dev_mode) {
    // https://stackoverflow.com/questions/71719220/webpack-hot-module-replacement-react-18-reactdomclient-createroot-on-a-contai
    plugins.unshift(new ReactRefreshPlugin())
}
if (process.env.BUNDLE_ANALYZER) {
    plugins.push(new BundleAnalyzerPlugin());
}
console.log(`NODE_ENV=${process.env.NODE_ENV ?? '(undefined)'} is_dev_mode=${is_dev_mode}`);

module.exports = {
    entry: "./client/index.tsx",
    mode: (is_dev_mode ? "development" : "production"),
    devtool: is_dev_mode && 'inline-source-map',
    output: {
        filename: "[name]-[fullhash]-bundle.js",
        chunkFilename: '[name]-[contenthash]-bundle.js',
        path: path.resolve(__dirname, "dist", "client"),
        publicPath: '/'
    },
    plugins,
    resolve: {
        modules: [__dirname, "client", "node_modules"],
        extensions: [".js", ".jsx", ".tsx", ".ts"],
    },
    optimization: {
        minimize: ! is_dev_mode,
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                reactjs: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
                    name: "reactjs",
                    priority: 2,
                    chunks: 'all',
                },
                axiosjs: {
                    test: /[\\/]node_modules[\\/]axios[\\/]/,
                    name: "axiosjs",
                    priority: 2,
                    chunks: 'all',
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: 1,
                    chunks: 'all',
                },
            },
        },
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
    target: "web",
    devServer: {
        client: { overlay: false },
        port: CLIENT_PORT,
        historyApiFallback: true,
        proxy: {
            '/api': `http://localhost:${SERVER_PORT}`,
            '/assets': `http://localhost:${SERVER_PORT}`
        },
    }
};

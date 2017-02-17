var webpack = require("webpack");

// 辅助函数
var utils = require("./utils");
var fullPath = utils.fullPath;

// 项目根路径
var ROOT_PATH = fullPath("../");
// 项目源码路径
var SRC_PATH = ROOT_PATH + "/src";
// 产出路径
var DIST_PATH = ROOT_PATH + "/dist";
// npm包路径
var NODE_MODULES_PATH = ROOT_PATH + "/node_modules";
// 是否是开发环境
var __DEV__ = process.env.NODE_ENV !== "production";

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require("html-webpack-plugin");
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var autoprefixer = require("autoprefixer");

var extractCSS = new ExtractTextPlugin("[name]_[hash:8].css");
var config = {
    entry: {
        app: [
            "./src/pages/app.tsx"
        ],
        lib: [
            "react", "react-dom", "react-router",
            "redux", "react-redux", "redux-thunk"
        ],
        base: "base"
    },
    output: {
        path: DIST_PATH,// 绝对路径
        filename: "[name]_[hash:8].js"
    },
    // devtool: "source-map",
    resolve: {
        extensions: ["", ".jsx", ".ts", ".tsx", ".js"],
        alias: {
            "react-router": NODE_MODULES_PATH + "/react-router/lib/index.js",
            "react-redux": NODE_MODULES_PATH + "/react-redux/dist/react-redux.min.js",
            "redux": NODE_MODULES_PATH + "/redux/dist/redux.min.js",
            "redux-thunk": NODE_MODULES_PATH + "/redux-thunk/dist/redux-thunk.min.js",
            "isomorphic-fetch": NODE_MODULES_PATH + "/isomorphic-fetch/fetch-npm-node.js",
            "es6-promise": NODE_MODULES_PATH + "/es6-promise/dist/es6-promise.min.js",
            "base": SRC_PATH + "/js/base.js"
        }
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ["ts"]
            }, {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: extractCSS.extract(["css", "postcss", "less"])
                //第一个参数是可选参数，传入一个loader，当css样式没有被抽取的时候可以使用该loader。
                //第二个参数则是用于编译解析的css文件loader，很明显这个是必须传入的，就像上述例子的css-loader。
            }, {
                test: /\.json$/,
                loader: "json-loader"
            }, {
                test: /\.png|jpeg|jpg|gif|ico$/,
                loaders: [
                    "file?name=images/[name]_[hash:8].[ext]",
                    "image-webpack?{optimizationLevel: 7, interlaced: false, pngquant:{quality: '65-90', speed: 4}, mozjpeg: {quality: 65}}"
                ]
            }
        ],
        // preloaders: [
        //     {
        //         test: /\.js$/,
        //         loaders: ["source-map"]
        //     }
        // ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "lib",
            filename: "lib.bundle_[hash:8].js"
        }),
        new webpack.DefinePlugin({
            // http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
        }),
        // html 页面        
        new HtmlwebpackPlugin({
            filename: "index.html",
            chunks: ["app", "lib", "base"],
            template: SRC_PATH + "/pages/app.html",
            minify: __DEV__ ? false : {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeRedundantAttributes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                removeComments: true
            }
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
            clear: false
        }),
        extractCSS,
    ],
    postcss: [autoprefixer]
};


module.exports = config; 
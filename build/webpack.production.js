var webpack = require("webpack");
var config = require("./webpack.config");
var utils = require("./utils");
var fullPath = utils.fullPath;
var distPath;
var __PRD__ = process.env.NODE_ENV == "production";
// 压缩 js、css
console.log("webpack working");

if (process.argv[2]) {
    var args = process.argv[2].split("/");
    args.shift();

    distPath = fullPath("../../" + args.join("/"));
} else {
    distPath = fullPath("../") + "/dist";
}
config.output.path = distPath;

// 处理warning http://stackoverflow.com/questions/30030031/passing-environment-dependent-variables-in-webpack
config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    })
)
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

if (__PRD__) {
    if (process.argv[3]) {//例如："http://m.qmjy.dev/"
        config.output.publicPath = process.argv[3];
    } else {
        config.output.publicPath = "http://m.qmin91.com/";
    }
} else {
    config.output.publicPath = "http://127.0.0.1:8888/";
}

webpack(config, function (err, status) {
    if (err) {
        console.log("fail! ", err);
    } else {
        console.log("done!");
    }
});

// 针对react router，nginx需要做的配置
// http://www.59m59s.com/blog/diao-zheng-nginxzheng-que-fu-wu-react-routerying-yong/
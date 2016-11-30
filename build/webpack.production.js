var webpack = require('webpack');
var config = require('./webpack.config');

// 压缩 js、css
config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
);

webpack(config, function (err, status) {
    if (err) {
        console.log(err);
    }
});
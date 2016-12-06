var webpack = require('webpack');
var config = require('./webpack.config');

// 压缩 js、css
console.log('webpack working');
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

webpack(config, function (err, status) {
    if (err) {
        console.log('fail! ', err);
    } else {
        console.log('done!');
    }
});

// 针对react router，nginx需要做的配置
// http://www.59m59s.com/blog/diao-zheng-nginxzheng-que-fu-wu-react-routerying-yong/
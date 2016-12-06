var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var utils = require('./utils');

var PORT = 8080;
var HOST = utils.getIP();
var args = process.argv;
var hot = args.indexOf('--hot') > -1;
var deploy = args.indexOf('--deploy') > -1;

// 本地环境静态资源路径
var localPublicPath = 'http://' + HOST + ':' + PORT + '/';

config.output.publicPath = localPublicPath;
config.entry.app.unshift('webpack-dev-server/client?' + localPublicPath);

// 开启热替换相关设置
if (hot === true) {
    config.entry.app.unshift('webpack/hot/only-dev-server');
    // 注意这里 loaders[0] 是处理 .js 文件的 loader
    config.module.loaders[0].loaders.unshift('react-hot-loader/webpack');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

var bodyParser = require('body-parser');
var app = new WebpackDevServer(webpack(config), {
    hot: hot,
    inline: true,
    compress: false,
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,
});

app.use(bodyParser.json()); // for parsing application/json
app.use('/api/get-teacher-basic-info', function (req, res) {
    var id = req.body.id || 1;// 请求的用户对应身份的id

    res.send({
        data: {
            id: 1,
            role: 3,
            name: 'yota' + id,
            selfIntro: '音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...',
            avatar: 'http://qmin91.com/file/MxcgkDYS576f41617a4b9',
            teachingAge: 8,
            certified: true
        },
        meta: {
            code: 0,
            msg: ""
        }

    });
})
app.use('/api/get-teacher-courses', function (req, res) {
    var tid = req.body.tid || 1;// 请求的老师id
    var postPage = req.body.page || 1;// 请求的老师id
    var totalPage = 3;// 分页总数
    var pageCount = 6;// 每页条数

    if (postPage > totalPage) {
        return res.send({
            data: {
                page: totalPage,
                totalPage: totalPage
            },
            meta: {
                code: 0,
                msg: ""
            }
        });
    } else {
        var courses = [];

        for (var i = 1; i <= pageCount; i++) {
            var cid = (postPage - 1) * pageCount + i;

            courses.push({
                cid: cid,
                cover: 'http://qmin91.com/file/rxKIZymR5793011349f41',
                title: cid + '课程标题',
                detail: cid + '课程信息课程信息课程信息课程信息课程信息课程信息课程信息'
            })
        }

        return res.send({
            data: {
                page: postPage,
                totalPage: totalPage,
                courses: courses
            },
            meta: {
                code: 0,
                msg: ""
            }
        });
    }

})
app.use('/api/get-recommend-teachers', function (req, res) {
    var postPage = req.body.page || 1;// 请求页码
    var totalPage = 3;// 分页总数
    var pageCount = 6;// 每页条数

    if (postPage > totalPage) {
        return res.send({
            page: totalPage,
            totalPage: totalPage
        });
    } else {
        var list = [];

        for (var i = 1; i <= pageCount; i++) {
            var id = (postPage - 1) * pageCount + i;

            list.push({
                id: id,
                role: i % 3 === 0 ? 3 : 4,
                name: 'yota' + id,
                selfIntro: '自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介',
                teachingAge: 4,
                starCount: 120,
                viewedCount: 230,
                certified: true,
                courses: [{
                    cid: 1000 + id,
                    name: '高一物理',
                    type: '1对1',
                    floorPrice: 120
                }, {
                        cid: 2000 + id,
                        name: '高二物理',
                        type: '1对2',
                        floorPrice: 130
                    }]
            })
        }

        return res.send({
            data: {
                page: postPage,
                totalPage: totalPage,
                list: list
            },
            meta: {
                code: 0,
                msg: ""
            }
        });
    }

})
app.use('/apis/mobile/getIndexRoleList', function (req, res) {
    var postPage = req.body.page || 1;// 请求页码
    var totalPage = 3;// 分页总数
    var pageCount = 6;// 每页条数

    if (postPage > totalPage) {
        return res.send({
            page: totalPage,
            totalPage: totalPage
        });
    } else {
        var list = [];

        for (var i = 1; i <= pageCount; i++) {
            var id = (postPage - 1) * pageCount + i;

            list.push({
                id: id,
                role: i % 3 === 0 ? 3 : 4,
                name: 'yota' + id,
                selfIntro: '自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介',
                teachingAge: 4,
                favCount: 120,
                viewedCount: 230,
                certified: true,
                courses: [{
                    cid: 1000 + id,
                    name: '高一物理',
                    type: '1对1',
                    floorPrice: 120
                }, {
                        cid: 2000 + id,
                        name: '高二物理',
                        type: '1对2',
                        floorPrice: 130
                    }]
            })
        }

        return res.send({
            data: {
                page: postPage,
                totalPage: totalPage,
                list: list
            },
            meta: {
                code: 0,
                msg: ""
            }
        });
    }

})
app.use('/apis/mobile/getSearchRoleList', function (req, res) {
    var postPage = req.body.page || 1;// 请求页码
    var totalPage = 3;// 分页总数
    var pageCount = 6;// 每页条数

    if (postPage > totalPage) {
        return res.send({
            page: totalPage,
            totalPage: totalPage
        });
    } else {
        var list = [];

        for (var i = 1; i <= pageCount; i++) {
            var id = (postPage - 1) * pageCount + i;

            list.push({
                id: id,
                role: i % 3 === 0 ? 3 : 4,
                name: 'yota' + id,
                selfIntro: '自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介',
                teachingAge: 4,
                favCount: 120,
                viewedCount: 230,
                certified: true,
                courses: [{
                    cid: 1000 + id,
                    name: '高一物理',
                    type: '1对1',
                    floorPrice: 120
                }, {
                        cid: 2000 + id,
                        name: '高二物理',
                        type: '1对2',
                        floorPrice: 130
                    }]
            })
        }

        return res.send({
            data: {
                page: postPage,
                totalPage: totalPage,
                list: list
            },
            meta: {
                code: 0,
                msg: ""
            }
        });
    }

})
app.use('/api/get-hot-teachers', function (req, res) {
    var postPage = req.body.page || 1;// 请求页码
    var totalPage = 3;// 分页总数
    var pageCount = 6;// 每页条数

    if (postPage > totalPage) {
        return res.send({
            page: totalPage,
            totalPage: totalPage
        });
    } else {
        var teachers = [];

        for (var i = 1; i <= pageCount; i++) {
            var tid = (postPage - 1) * pageCount + i;

            teachers.push({
                tid: tid,
                name: 'yota' + tid,
                selfIntro: '自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介',
                teachingAge: 4,
                starCount: 120,
                viewedCount: 230,
                certified: true,
                courses: [{
                    cid: 1000 + tid,
                    name: '高一物理',
                    type: '1对1',
                    floorPrice: 120
                }, {
                        cid: 2000 + tid,
                        name: '高二物理',
                        type: '1对2',
                        floorPrice: 130
                    }]
            })
        }

        return res.send({
            page: postPage,
            totalPage: totalPage,
            teachers: teachers
        });
    }

})

app.listen(PORT, HOST, function () {
    console.log(localPublicPath);
});

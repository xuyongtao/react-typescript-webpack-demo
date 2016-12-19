var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
// var utils = require('./utils');

var PORT = 8080;
// var HOST = utils.getIP();
var HOST = "127.0.0.1";
var args = process.argv;
var hot = args.indexOf('--hot') > -1;

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
app.use('/apis/mobile/getBasicInfo', function (req, res) {
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
app.use('/apis/mobile/getCourseList', function (req, res) {
    var tid = req.body.tid || 1;// 请求的老师id
    var postPage = req.body.page || 1;// 请求的老师id
    var totalPage = 3;// 分页总数
    var pageCount = 6;// 每页条数

    if (postPage > totalPage) {
        return res.send({
            data: {
                page: totalPage,
                total: totalPage * pageCount,
                perPage: pageCount,
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
                total: totalPage * pageCount,
                perPage: pageCount,
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
            total: totalPage * pageCount,
            perPage: pageCount,
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
                total: totalPage * pageCount,
                perPage: pageCount,
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
    var pageCount = 6;// 每页条数
    var totalPage = 3;// 分页总数

    if (postPage > totalPage) {
        return res.send({
            page: totalPage,
            total: totalPage * pageCount,
            perPage: pageCount,
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
                    floorPrice: '价格面议'
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
                total: totalPage * pageCount,
                perPage: pageCount,
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
            total: totalPage * pageCount,
            perPage: pageCount,
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
                total: totalPage * pageCount,
                perPage: pageCount,
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
            total: totalPage * pageCount,
            perPage: pageCount,
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
            total: totalPage * pageCount,
            perPage: pageCount,
            teachers: teachers
        });
    }

})
app.use('/apis/mobile/getStudioInfo/studioInfoIndex', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": ""
        },
        "data": {
            banners: [
                localPublicPath + 'images/banner.png',
                localPublicPath + 'images/banner.png'
            ],
            courses: [{
                cid: 1,
                title: "物理",
                cover: localPublicPath + 'images/default-course-cover.png',
                detail: "课程详情"
            }],
            teachers: [{
                avatar: "http://qmin91.com/file/MxcgkDYS576f41617a4b9",
                certified: true,
                id: 1,
                name: "yota3",
                role: 3,
                selfIntro: "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
                teachingAge: 8
            }],
            intro: '全民教育致力于打造人人乐用的学习服务平台，聚焦本土优质师资，通过更高效、更智能、更精准地匹配师生资源，为老师及学生提供全而专的教育信息和增值服务，通过移动互联网，全力创建一个专业、高效、智能、安全的高品质教育信息平台，让教与学变得更便捷、平等、高效。',
        }
    });
})
app.use('/apis/mobile/getStudioInfo/teacherList', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": ""
        },
        "data": {
            "page": 2,
            "total": 207,
            "perPage": 6,
            "teachers": [{
                avatar: "http://qmin91.com/file/MxcgkDYS576f41617a4b9",
                certified: true,
                id: 1,
                name: "yota3",
                role: 3,
                selfIntro: "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
                teachingAge: 8,
            }]

        }
    })
})
app.use('/apis/mobile/getPhotoList', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": ""
        },
        "data": {
            "photos": [
                {
                    "mediumSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7",
                    "originalSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7",
                }, {
                    "mediumSrc": "http://st.qmin91.com/file/BjClyLiU576b919ecfb2b",
                    "originalSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7",
                }, {
                    "mediumSrc": "http://st.qmin91.com/file/ncJWCPzR583bd174b124e",
                    "originalSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7",
                }, {
                    "mediumSrc": "http://st.qmin91.com/file/jcde8bsy577474d228a48",
                    "originalSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7",
                }, {
                    "mediumSrc": "http://st.qmin91.com/file/JbSIH4rJ577474d2704b6",
                    "originalSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7",
                }, {
                    "mediumSrc": "http://st.qmin91.com/file/FQBdbvVM577481a480618",
                    "originalSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7",
                }, {
                    "mediumSrc": "http://st.qmin91.com/file/NgqZ8kyR5769fcbf0f59f",
                    "originalSrc": "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7"
                }
            ]
        }
    })
})
app.use('/apis/mobile/getStudioInfo/introInfo', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": ""
        },
        "data": {
            "intro": "全民教育致力于打造人人乐用的学习服务平台，聚焦本土优质师资，通过更高效、更智能、更精准地匹配师生资源，为老师及学生提供全而专的教育信息和增值服务，通过移动互联网，全力创建一个专业、高效、智能、安全的高品质教育信息平台，让教与学变得更便捷、平等、高效。"
        }
    })
})
app.use('/apis/mobile/getTeacherInfo/introInfo', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": ""
        },
        "data": {
            "id": 1,
            "seniority": "最高学历，本科",
            "graduatedSchool": "毕业学校",
            "role": "身份",
            "studio": "单位机构",
            "intro": "个人介绍",
            "teachingCases": [{
                "startTime": "2015年9月",
                "endTime": "至今",
                "cont": "带领学生参加长江杯钢琴比赛；参加西安市高陵县建党90周年文艺演出，排演西安市高陵县国土局，交通局、建设局等单位。参加带领第四军",
            }, {
                    "startTime": "2015年9月",
                    "endTime": "至今",
                    "cont": "带领学生参加长江杯钢琴比赛；参加西安市高陵县建党90周年文艺演出，排演西安市高陵县国土局，交通局、建设局等单位。参加带领第四军",
                }, {
                    "startTime": "2015年9月",
                    "endTime": "至今",
                    "cont": "带领学生参加长江杯钢琴比赛；参加西安市高陵县建党90周年文艺演出，排演西安市高陵县国土局，交通局、建设局等单位。参加带领第四军",
                }]
        }
    })
})
app.use('/apis/mobile/getCourseInfo/detail', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": ""
        },
        "data": {
            id: 1,
            title: "钢琴一对一私教",
            cover: "http://192.168.2.55:8080/images/default-course-cover.png",
            cont: "钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教",
            prices: {
                unit: "学期",
                inDoor: 120,
                online: 130,
                outDoor: 140,
                other: 0,
            }
        }
    })
})
app.use('/apis/mobile/booking', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": ""
        },
    })
})
app.use('/apis/mobile/getKeyWordInputList', function (req, res) {
    return res.send({
        "meta": {
            "code": 0,
            "msg": "成功"
        },
        "data": {
            cats: [
                {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "高中-高一-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "高中-高二-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "高中-高三-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "初中-初一-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "初中-初二-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "初中-初三-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "初中-初三-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "初中-初三-数学",
                }, {
                    cat_id: 1,
                    cat_ids: "1-2-5",
                    cat_labels: "初中-初三-数学",
                }
            ],
            users: [
                {
                    id: 90,
                    role: 3,
                    name: "许泳涛"
                }, {
                    id: 100,
                    role: 4,
                    name: "培优机构"
                }
            ]
        }
    })
})

app.listen(PORT, HOST, function () {
    console.log(localPublicPath);
});

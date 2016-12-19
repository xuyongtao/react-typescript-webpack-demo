# 91mobile 接口文档

## 首页 getIndexRoleList 

### 接口地址
http://qmjy.dev/apis/mobile/getIndexRoleList

### 请求方式
post

### 请求参数
{
    page: 1,
    shortName: "st",
    pageSize: 6,
    isRecommend: true, //true为推荐排列 false为热门排列
}	

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        "total": 207,
        "perPage": 6,
        "list": [
            id: 1,
            role: 3, //老师为3，机构为4
            name: "yota",
            selfIntro: "自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介",
            teachingAge: 4,
            favCount: 120,
            viewedCount: 230,
            certified: true,//对应“机构认证”这个标签
            courses: [{
                cid: 1000,
                name: "高一物理",
                type: "1对1",
                floorPrice: 120
            }, {
                cid: 2000,
                name: "高二物理",
                type: "1对2",
                floorPrice: 130
            }]
        ]
    }
}



## 搜索页 getSearchRoleList

### 接口地址
http://qmjy.dev/apis/mobile/getSearchRoleList

### 请求方式
post

### 请求参数
{
    page: 1,
    pageSize: 6,
    catId: 1,
    orderByFavCount: true,
    orderByViewedCount: true,
    teachingWay: 0,
    teachingAge: 0,
    role: 0, // 0：不限，1：老师，2：在校生，3：机构，4：其他
    keyword: “物理”,
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
	    "total": 207,
        "perPage": 6,
        "page": 2,
        "list": [
            id: 1,
            role: 3, //老师为3，机构为4
            name: "yota",
            selfIntro: "自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介",
            teachingAge: 4,
            favCount: 120,
            viewedCount: 230,
            certified: true,//对应“机构认证”这个标签
            courses: [{
                cid: 1000,
                name: "高一物理",
                type: "1对1",
                floorPrice: 120
            }, {
                cid: 2000,
                name: "高二物理",
                type: "1对2",
                floorPrice: 130
            }]
        ]
    }
}




## 获取机构、老师基本信息接口 getBasicInfo

### 接口地址
http://qmjy.dev/apis/mobile/getBasicInfo

### 请求方式
post

### 请求参数
{
    id: 1, // 对应身份的teacher id或者studio id
    role: 3 //对应身份的role id
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        avatar: "http://qmin91.com/file/MxcgkDYS576f41617a4b9",
        certified: true,
        id: 1,
        name: "yota3",
        role: 3,
        selfIntro: "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
        teachingAge: 8,
    }
}



## 机构主页 studioInfoIndex

### 接口地址
http://qmjy.dev/apis/mobile/getStudioInfo/studioInfoIndex

### 请求方式
post

### 请求参数
{
    id: 1 //机构id
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        banners: ["1.png", "2.png", "3.png"],
        courses: [{
            cid: 1,
            title: "物理",
            cover: "1.png",
            detail: "课程详情"
        }],
        teachers: [{
            avatar: "http://qmin91.com/file/MxcgkDYS576f41617a4b9",
            certified: true,
            id: 1,
            name: "yota3",
            role: 3,
            selfIntro: "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
            teachingAge: 8,
        }],
        intro: "机构介绍",
    }
}



## 获取机构、老师课程列表 getCourseList

### 接口地址
http://qmjy.dev/apis/mobile/getCourseList

### 请求方式
post

### 请求参数
{
    id: 1, //机构id
    role: 3, //机构为4；老师为3
    page: 1,
    perPage: 6,
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        "page": 2,
        "total": 207,
        "perPage": 6,
        "courses": [{
            "cid": 1,
            "title": "物理",
            "cover": "1.png",
            "detail": "课程详情"
        }]
    }
}




## 获取机构、老师相册 getPhotoList

### 接口地址
http://qmjy.dev/apis/mobile/getPhotoList

### 请求方式
post

### 请求参数
{
    id: 1, //机构id
    role: 3 //机构为4；老师为3
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        "photos": [{
            "mediumSrc":  "1.png",
            "originalSrc":  "1.original.png"
        }]
    }
}




## 获取机构老师列表 teacherList

### 接口地址
http://qmjy.dev/apis/mobile/getStudioInfo/teacherList

### 请求方式
post

### 请求参数
{
    id: 1, //机构id
    page: 2,
    perPage: 6
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        "page": 2,
        "total": 207,
        "perPage": 6,
        "teachers":  [{
            avatar: "http://qmin91.com/file/MxcgkDYS576f41617a4b9",
            certified: true,
            id: 1,
            name: "yota3",
            role: 3,
            selfIntro: "音乐是打开智慧之门的金钥匙，学习钢琴能陶冶情操，提高艺术修养，有助...",
            teachingAge: 8,
        }]
    }
}



## 获取机构介绍 introInfo

### 接口地址
http://qmjy.dev/apis/mobile/getStudioInfo/introInfo

### 请求方式
post

### 请求参数
{
    id: 1 //机构id
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        "intro": "全民教育致力于打造人人乐用的学习服务平台，聚焦本土优质师资，通过更高效、更智能、更精准地匹配师生资源，为老师及学生提供全而专的教育信息和增值服务，通过移动互联网，全力创建一个专业、高效、智能、安全的高品质教育信息平台，让教与学变得更便捷、平等、高效。" 
    }
}




## 获取老师简介 introInfo

### 接口地址
http://qmjy.dev/apis/mobile/getTeacherInfo/introInfo

### 请求方式
post

### 请求参数
{
    id: 1 //老师id
}

### 返回数据
{
  	"meta": {
 		"code": 0,
 		"msg": ""
    },
    "data": {
        "id": 1,
        "seniority": "最高学历，本科",
        "graduatedSchool": "毕业学校"，
        "role": "身份",
        "studio": "单位机构",
        "intro": "个人介绍"，
        "teachingCases": [
            {
                "startTime": "2015年9月";
                "endTime": "至今";
                "cont": "带领学生参加长江杯钢琴比赛；参加西安市高陵县建党90周年文艺演出，排演西安市高陵县国土局，交通局、建设局等单位。参加带领第四军";
            }
        ]
    }
}




## 获取课程详细信息 detail

### 接口地址
http://qmjy.dev/apis/mobile/getCourseInfo/detail

### 请求方式
post

### 请求参数
{
    id: 1 //课程id
}

### 返回数据
{
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
                other: 120,
            }
        } 
}




## 课程详情页预约老师 booking

### 接口地址
http://qmjy.dev/apis/mobile/booking

### 请求方式
post

### 请求参数
{
    id: 1, //课程id
    role: 3, //老师为3，机构为4
    name: “许泳涛”,
    mobile: “13450258690”,
    mark: “老师我想报初一的奥数，请问怎么收费”,
}


### 返回数据
{
    "meta": {
        "code": 0,
        "msg": "预约成功"
    },
}   




## 搜索框关键字推荐 getKeyWordInputList

### 接口地址
http://qmjy.dev/apis/mobile/getKeyWordInputList

### 请求方式
post

### 请求参数
{
    keyword: "物理"
}

### 返回数据
{
    "meta": {
            "code": 0,
            "msg": ""
        },
		"data": {
            cats: [{
                cat_id: 1, 
                cat_ids:1-2-5,
                cat_labels: “高中-高一-数学”			
            },{
                cat_id: 1,
                cat_ids:1-2-3,
                cat_labels: “高中-高一-语文”			
            }],
            users: [{
                id: 1, //用户对应身份的id
                role: 3, //3为老师，4为机构
                name: “许泳涛”
            }, {
                id: 1, //用户对应身份的id
                role: 4, //3为老师，4为机构
                name: “培优机构”
            }]
        }
}




export const defaultAvatar = require("../../img/default-avatar.png");

export const publicPath = "http://192.168.2.55:8080/";

export const apis = {
    getIndexRoleList: `${publicPath}apis/mobile/getIndexRoleList`,
    getSearchRoleList: `${publicPath}apis/mobile/getSearchRoleList`,
    getBasicInfo: `${publicPath}apis/mobile/getBasicInfo`,
    getCourseList: `${publicPath}apis/mobile/getCourseList`,
    getStudioIndexPageInfo: `${publicPath}apis/mobile/getStudioInfo/studioInfoIndex`,
    getStudioTeacherList: `${publicPath}apis/mobile/getStudioInfo/teacherList`,
};

export enum Role { teacher = 3, studio };// 这里对应的是数据库的role表

export enum PriceUnitId { hour, term, course };

export const ModalOverlayBackgroundColor = "rgba(0, 0, 0, 0.7)";

export const PriceUnitMap: string[] = [];
PriceUnitMap[PriceUnitId.hour] = "课时";
PriceUnitMap[PriceUnitId.term] = "学期";
PriceUnitMap[PriceUnitId.course] = "课程";


export const catEntrances = [
    {
        name: "艺术",
        className: "art",
        cid: 1,
    }, {
        name: "体育",
        className: "sport",
        cid: 128,
    }, {
        name: "生活",
        className: "life",
        cid: 185,
    }, {
        name: "出国",
        className: "abroad",
        cid: 214,
    }, {
        name: "幼小",
        className: "child",
        cid: 242,
    }, {
        name: "初中",
        className: "middle-school",
        cid: 334,
    }, {
        name: "高中",
        className: "hight-school",
        cid: 531,
    }, {
        name: "大学",
        className: "college",
        cid: 456,
    }, {
        name: "语言",
        className: "language",
        cid: 490,
    }, {
        name: "其他",
        className: "other",
        cid: 520
    }
];

export const syntheticalFilterConditions = [
    {
        type: "授课方式",
        tid: 1,
        options: [{
            name: "不限",
            oid: 1,
        }, {
                name: "在线教学",
                oid: 2,
            }, {
                name: "老师上门",
                oid: 3,
            }, {
                name: "学生上门",
                oid: 4,
            }, {
                name: "协商地点",
                oid: 5,
            }]
    }, {
        type: "教龄",
        tid: 2,
        options: [{
            name: "不限",
            oid: 1,
        }, {
                name: "1年",
                oid: 2,
            }, {
                name: "2年",
                oid: 3,
            }, {
                name: "3年",
                oid: 4,
            }, {
                name: "4年",
                oid: 5,
            }]
    }, {
        type: "身份",
        tid: 3,
        options: [{
            name: "不限",
            oid: 1,
        }, {
                name: "老师",
                oid: 2,
            }, {
                name: "在校生",
                oid: 3,
            }, {
                name: "机构",
                oid: 4,
            }, {
                name: "其他",
                oid: 5,
            }]
    }];

const indexRouter = {
    isIndex: true,
    name: '推荐',
    to: '/',
}

const hotRouter = {
    name: '热门',
    to: '/hot',
}

const teacherIntro = {
    isIndex: true,
    name: '简介',
    to: '/',
}

const teacherCourses = {
    name: '课程',
    to: '/courses',
}

const teacherPhotos = {
    name: '相册',
    to: '/photos'
}

export const indexRouters = [indexRouter, hotRouter];
export const teacherRouters = [teacherIntro, teacherCourses, teacherPhotos];

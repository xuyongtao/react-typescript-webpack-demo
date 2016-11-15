import { combineReducers } from "redux";
import * as Lodash from "lodash";

import { Role } from "../common/config";

import {
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestRecommendListPost,
    ReceiveRecommendListPost,
} from "../interface/common";

import {
    REQUEST_BASIC_INFO_POST,
    RECEIVE_BASIC_INFO_POST,
    REQUEST_RECOMMENT_LIST_POST,
    RECEIVE_RECOMMENT_LIST_POST,
} from "../actions/common";

import {
    TeacherPostBasic,
    TeacherResBasic,
    CoursesPostBasic,
    CoursesResBasic,
    RecommendTeachersPostBasic,
    RecommendTeachersResBasic,
    HotTeachersPostBasic,
    HotTeachersResBasic,
} from "../interface/teacher";

import {
    REQUEST_COURSES_POST,
    RECEIVE_COURSES_POST,
    REQUEST_RECOMMENT_TEACHERS_POST,
    RECEIVE_RECOMMENT_TEACHERS_POST,
    REQUEST_HOT_TEACHERS_POST,
    RECEIVE_HOT_TEACHERS_POST,
} from "../actions/teacher"

function postBasicInfo(state = {
    isFetching: false,
    id: 0,
    role: Role.teacher,
}, action: {
    type: string,
    respontData?: ReceiveBasicInfoPost,
    requestData?: RequestBasicInfoPost,
}) {
    switch (action.type) {
        case REQUEST_BASIC_INFO_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
                role: action.requestData.role,
            })
        case RECEIVE_BASIC_INFO_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                id: action.respontData.id,
                role: action.respontData.role,
                roleType: action.respontData.roleType,
                name: action.respontData.name,
                avatar: action.respontData.avatar,
                selfIntro: action.respontData.selfIntro,
                teachingAge: action.respontData.teachingAge,
                certified: action.respontData.certified,
            })
        default:
            return state;
    }
}

function postRecommendList(state = {
    isFetching: false,
    page: 0
}, action: {
    type: string;
    responseData?: ReceiveRecommendListPost;
    requestData?: RequestRecommendListPost;
}) {
    switch (action.type) {
        case REQUEST_RECOMMENT_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                page: action.requestData.page,
            })
        case RECEIVE_RECOMMENT_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                page: action.responseData.page,
                totalPage: action.responseData.totalPage,
                list: action.responseData.list,
            })
        default:
            return state;
    }
}

function postCourses(state = {
    isFetching: false,
    tid: 0,
    page: 0,
}, action: {
    type: string,
    respontData?: CoursesResBasic,
    requestData?: CoursesPostBasic
}) {
    switch (action.type) {
        case REQUEST_COURSES_POST:

            return Lodash.assign({}, state, {
                isFetching: true,
                tid: action.requestData.tid,
                page: action.requestData.page,
            })
        case RECEIVE_COURSES_POST:

            return Lodash.assign({}, state, {
                isFetching: false,
                page: action.respontData.page,
                totalPage: action.respontData.totalPage,
                courses: action.respontData.courses
            })
        default:
            return state;
    }
}

function postHotTeachers(state = {
    isFetching: false,
    page: 0
}, action: {
    type: string,
    respontData?: HotTeachersResBasic,
    requestData?: HotTeachersPostBasic
}) {
    switch (action.type) {
        case REQUEST_HOT_TEACHERS_POST:

            return Lodash.assign({}, state, {
                isFetching: true,
                page: action.requestData.page,
            })
        case RECEIVE_HOT_TEACHERS_POST:

            return Lodash.assign({}, state, {
                isFetching: false,
                page: action.respontData.page,
                totalPage: action.respontData.totalPage,
                teachers: action.respontData.teachers
            })
        default:
            return state;
    }
}

const reducers = combineReducers({
    basicInfo: postBasicInfo,
    courseList: postCourses,
    recommendList: postRecommendList,
    hotTeachers: postHotTeachers,
})

export default reducers;  
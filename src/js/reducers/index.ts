import { combineReducers } from "redux";
import * as Lodash from "lodash";

import { Role } from "../common/config";

import {
    RequestCourseListPost,
    ReceiveCourseListPost,
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestRecommendListPost,
    ReceiveRecommendListPost,
    RequestHotListPost,
    ReceiveHotListPost,
    RequestSearchListPost,
    ReceiveSearchListPost,
} from "../interface/common";

import {
    REQUEST_BASIC_INFO_POST,
    RECEIVE_BASIC_INFO_POST,
    REQUEST_RECOMMENT_LIST_POST,
    RECEIVE_RECOMMENT_LIST_POST,
    REQUEST_HOT_LIST_POST,
    RECEIVE_HOT_LIST_POST,
    REQUEST_SEARCH_LIST_POST,
    RECEIVE_SEARCH_LIST_POST,
    REQUEST_COURSE_LIST_POST,
    RECEIVE_COURSE_LIST_POST,
} from "../actions/common";

import {
    RequestIndexPageInfoPost as RequestStudioIndexPageInfoPost,
    ReceiveIndexPageInfoPost as ReceiveStudioIndexPageInfoPost,
    RequestTeacherListPost,
    ReceiveTeacherListPost,
} from "../interface/studio";
import {
    REQUEST_INDEX_PAGE_INFO_POST as REQUEST_STUDIO_INDEX_PAGE_INFO_POST,
    RECEIVE_INDEX_PAGE_INFO_POST as RECEIVE_STUDIO_INDEX_PAGE_INFO_POST,
    REQUEST_TEACHER_LIST_POST,
    RECEIVE_TEACHER_LIST_POST,
} from "../actions/studio";

function postBasicInfo(state = {
    isFetching: false,
    id: 0,
    role: Role.teacher,
}, action: {
    type: string,
    responseData?: ReceiveBasicInfoPost,
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
                id: action.responseData.id,
                role: action.responseData.role,
                roleType: action.responseData.roleType,
                name: action.responseData.name,
                avatar: action.responseData.avatar,
                selfIntro: action.responseData.selfIntro,
                teachingAge: action.responseData.teachingAge,
                certified: action.responseData.certified,
            })
        default:
            return state;
    }
}

function postRecommendList(state = {
    isFetching: false,
    page: 0,
    pageSize: 0,
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
                pageSize: action.requestData.pageSize,
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

function postHotList(state = {
    isFetching: false,
    page: 0,
    pageSize: 0,
}, action: {
    type: string;
    responseData?: ReceiveRecommendListPost;
    requestData?: RequestRecommendListPost;
}) {
    switch (action.type) {
        case REQUEST_HOT_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                page: action.requestData.page,
                pageSize: action.requestData.pageSize,
            })
        case RECEIVE_HOT_LIST_POST:
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

function postCourseList(state = {
    isFetching: false,
    id: 0,
    role: Role.teacher,
    perPage: 8,
    page: 0,
}, action: {
    type: string,
    responseData?: ReceiveCourseListPost,
    requestData?: RequestCourseListPost
}) {
    switch (action.type) {
        case REQUEST_COURSE_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
                role: action.requestData.role,
                perPage: action.requestData.perPage,
                page: action.requestData.page,
            })
        case RECEIVE_COURSE_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                page: action.responseData.page,
                perPage: action.responseData.perPage,
                total: action.responseData.total,
                courses: action.responseData.courses,
            })
        default:
            return state;
    }
}

function postSearchList(state = {
    isFetching: false,
    page: 0,
    pageSize: 0,
}, action: {
    type: string;
    responseData?: ReceiveSearchListPost;
    requestData?: RequestSearchListPost;
}) {
    switch (action.type) {
        case REQUEST_SEARCH_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                page: action.requestData.page,
                pageSize: action.requestData.pageSize,
            })
        case RECEIVE_SEARCH_LIST_POST:
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

function postStudioIndexPageInfo(state = {
    isFetching: false,
    id: 0,
}, action: {
    type: string;
    requestData?: RequestStudioIndexPageInfoPost;
    responseData?: ReceiveStudioIndexPageInfoPost;
}) {
    switch (action.type) {
        case REQUEST_STUDIO_INDEX_PAGE_INFO_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
            });
        case RECEIVE_STUDIO_INDEX_PAGE_INFO_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                banners: action.responseData.banners,
                courses: action.responseData.courses,
                teachers: action.responseData.teachers,
                intro: action.responseData.intro,
            });
        default:
            return state;
    }
}

function postStudioTeacherList(state = {
    isFetching: false,
    id: 0,
}, action: {
    type: string;
    requestData?: RequestTeacherListPost;
    responseData?: ReceiveTeacherListPost;
}) {
    switch (action.type) {
        case REQUEST_TEACHER_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
                role: action.requestData.role,
                page: action.requestData.page,
                perPage: action.requestData.perPage,
            });
        case RECEIVE_TEACHER_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                page: action.responseData.page,
                total: action.responseData.total,
                perPage: action.responseData.perPage,
                teachers: action.responseData.teachers,
            })
        default:
            return state;
    }
}

const reducers = combineReducers({
    basicInfo: postBasicInfo,
    courseList: postCourseList,
    recommendList: postRecommendList,
    hotList: postHotList,
    searchList: postSearchList,
    studioIndexPageInfo: postStudioIndexPageInfo,
    studioTeacherList: postStudioTeacherList,
})

export default reducers;  
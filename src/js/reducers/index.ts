import { combineReducers } from "redux";
import * as Lodash from "lodash";

import { Role } from "../common/config";

import {
    CoursesPostBasic,
    CoursesResBasic,
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
} from "../actions/common";

import {
    REQUEST_COURSES_POST,
    RECEIVE_COURSES_POST,
} from "../actions/teacher";

import {
    RequestIndexPageInfoPost as RequestStudioIndexPageInfoPost,
    ReceiveIndexPageInfoPost as ReceiveStudioIndexPageInfoPost,
} from "../interface/studio";
import {
    REQUEST_INDEX_PAGE_INFO_POST as REQUEST_STUDIO_INDEX_PAGE_INFO_POST,
    RECEIVE_INDEX_PAGE_INFO_POST as RECEIVE_STUDIO_INDEX_PAGE_INFO_POST,
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

function postCourses(state = {
    isFetching: false,
    tid: 0,
    page: 0,
}, action: {
    type: string,
    responseData?: CoursesResBasic,
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
                page: action.responseData.page,
                totalPage: action.responseData.totalPage,
                courses: action.responseData.courses
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

const reducers = combineReducers({
    basicInfo: postBasicInfo,
    courseList: postCourses,
    recommendList: postRecommendList,
    hotList: postHotList,
    searchList: postSearchList,
    studioIndexPageInfo: postStudioIndexPageInfo,
})

export default reducers;  
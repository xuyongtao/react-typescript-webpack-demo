import { combineReducers } from "redux";
import * as Lodash from "lodash";

import { Role } from "../common/config";

import {
    RequestCourseListPost,
    ReceiveCourseListPost,
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestPhotoListPost,
    ReceivePhotoListPost,
    RequestRecommendListPost,
    ReceiveRecommendListPost,
    RequestHotListPost,
    ReceiveHotListPost,
    RequestSearchListPost,
    ReceiveSearchListPost,
    RequestCourseDetailPost,
    ReceiveCourseDetailPost,
    RequestBookingPost,
    ReceiveBookingPost,
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
    REQUEST_PHOTO_LIST_POST,
    RECEIVE_PHOTO_LIST_POST,
    REQUEST_COURSE_DETAIL_POST,
    RECEIVE_COURSE_DETAIL_POST,
    REQUEST_BOOKING_POST,
    RECEIVE_BOOKING_POST,
} from "../actions/common";

import {
    RequestIndexPageInfoPost as RequestStudioIndexPageInfoPost,
    ReceiveIndexPageInfoPost as ReceiveStudioIndexPageInfoPost,
    RequestTeacherListPost,
    ReceiveTeacherListPost,
    RequestIntroPost as RequestStudioIntroPost,
    ReceiveIntroPost as ReceiveStudioIntroPost,
} from "../interface/studio";
import {
    RequestTeacherIntroPost,
    ReceiveTeacherIntroPost,
} from "../interface/teacher";
import {
    REQUEST_INDEX_PAGE_INFO_POST as REQUEST_STUDIO_INDEX_PAGE_INFO_POST,
    RECEIVE_INDEX_PAGE_INFO_POST as RECEIVE_STUDIO_INDEX_PAGE_INFO_POST,
    REQUEST_TEACHER_LIST_POST,
    RECEIVE_TEACHER_LIST_POST,
    REQUEST_INTRO_POST as REQUEST_STUDIO_INTRO_POST,
    RECEIVE_INTRO_POST as RECEIVE_STUDIO_INTRO_POST,
} from "../actions/studio";
import {
    REQUEST_TEACHER_INTRO_POST,
    RECEIVE_TEACHER_INTRO_POST,
} from "../actions/teacher";

const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_START_PAGE = 1;

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
    page: DEFAULT_START_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
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
    page: DEFAULT_START_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
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
    perPage: DEFAULT_PAGE_SIZE,
    page: DEFAULT_START_PAGE,
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

function postPhotoList(state = {
    isFetching: false,
    page: DEFAULT_START_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
}, action: {
    type: string;
    requestData: RequestPhotoListPost;
    responseData: ReceivePhotoListPost;
}) {
    switch (action.type) {
        case REQUEST_PHOTO_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
                role: action.requestData.role,
            });
        case RECEIVE_PHOTO_LIST_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                photos: action.responseData.photos,
            });
        default:
            return state;
    }
}

function postSearchList(state = {
    isFetching: false,
    page: 1,
    pageSize: 8,
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

function postStudioIntro(state = {
    isFetching: false,
    id: 0,
}, action: {
    type: string;
    requestData?: RequestStudioIntroPost;
    responseData?: ReceiveStudioIntroPost;
}) {
    switch (action.type) {
        case REQUEST_STUDIO_INTRO_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
            });
        case RECEIVE_STUDIO_INTRO_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                intro: action.responseData.intro,
            })
        default:
            return state;
    }
}

function postTeacherIntro(state = {
    isFetching: false,
    id: 0,
}, action: {
    type: string;
    requestData?: RequestTeacherIntroPost;
    responseData?: ReceiveTeacherIntroPost;
}) {
    switch (action.type) {
        case REQUEST_TEACHER_INTRO_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
            });
        case RECEIVE_TEACHER_INTRO_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                id: action.responseData.id,
                seniority: action.responseData.seniority,
                graduatedSchool: action.responseData.graduatedSchool,
                role: action.responseData.role,
                studio: action.responseData.studio,
                intro: action.responseData.intro,
                teachingCases: action.responseData.teachingCases,
            })
        default:
            return state;
    }
}

function postCourseDetail(state = {
    isFetching: false,
    id: 0,
}, action: {
    type: string;
    requestData?: RequestCourseDetailPost;
    responseData?: ReceiveCourseDetailPost;
}) {
    switch (action.type) {
        case REQUEST_COURSE_DETAIL_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
            })
        case RECEIVE_COURSE_DETAIL_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
                id: action.responseData.id,
                title: action.responseData.title,
                cover: action.responseData.cover,
                cont: action.responseData.cont,
                prices: {
                    unit: action.responseData.prices.unit,
                    inDoor: action.responseData.prices.inDoor,
                    outDoor: action.responseData.prices.outDoor,
                    online: action.responseData.prices.online,
                    other: action.responseData.prices.other,
                }
            })
        default:
            return state;
    }
}

function postBooking(state = {
    isFetching: false,
}, action: {
    type: string;
    requestData?: RequestBookingPost;
    responseData?: ReceiveBookingPost;
}) {
    switch (action.type) {
        case REQUEST_BOOKING_POST:
            return Lodash.assign({}, state, {
                isFetching: true,
                id: action.requestData.id,
                name: action.requestData.name,
                mobile: action.requestData.mobile,
                mark: action.requestData.mark,
            })
        case RECEIVE_BOOKING_POST:
            return Lodash.assign({}, state, {
                isFetching: false,
            })
        default:
            return state;
    }
}

const reducers = combineReducers({
    basicInfo: postBasicInfo,
    courseList: postCourseList,
    photoList: postPhotoList,
    recommendList: postRecommendList,
    hotList: postHotList,
    searchList: postSearchList,
    studioIndexPageInfo: postStudioIndexPageInfo,
    studioTeacherList: postStudioTeacherList,
    studioIntro: postStudioIntro,
    teacherIntro: postTeacherIntro,
    courseDetail: postCourseDetail,
    booking: postBooking,
})

export default reducers;  
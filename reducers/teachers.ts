import { combineReducers } from 'redux';
import * as lodash from 'lodash';

import {
    TeacherPostBasic,
    TeacherResBasic,
    CoursesPostBasic,
    CoursesResBasic,
    RecommendTeachersPostBasic,
    RecommendTeachersResBasic,
    HotTeachersPostBasic,
    HotTeachersResBasic,
} from '../common/teacher';

import {
    REQUEST_COURSES_POST,
    RECEIVE_COURSES_POST,
    REQUEST_BASIC_INFO_POST,
    RECEIVE_BASIC_INFO_POST,
    REQUEST_RECOMMENT_TEACHERS_POST,
    RECEIVE_RECOMMENT_TEACHERS_POST,
    REQUEST_HOT_TEACHERS_POST,
    RECEIVE_HOT_TEACHERS_POST,
} from '../actions/teachers'

function postBasicInfo(state = {
    isFetching: false,
    tid: 0,
    avatar: '',
    name: '',
    selfIntro: ''
}, action: {
    type: string,
    respontData?: TeacherResBasic,
    requestData?: TeacherPostBasic
}) {
    switch (action.type) {
        case REQUEST_BASIC_INFO_POST:

            return lodash.assign({}, state, {
                isFetching: true,
                tid: action.requestData.tid
            })
        case RECEIVE_BASIC_INFO_POST:

            return lodash.assign({}, state, {
                isFetching: false,
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

            return lodash.assign({}, state, {
                isFetching: true,
                tid: action.requestData.tid,
                page: action.requestData.page,
            })
        case RECEIVE_COURSES_POST:

            return lodash.assign({}, state, {
                isFetching: false,
                page: action.respontData.page,
                totalPage: action.respontData.totalPage,
                courses: action.respontData.courses
            })
        default:
            return state;
    }
}

function postRecommendTeachers(state = {
    isFetching: false,
    page: 0
}, action: {
    type: string,
    respontData?: RecommendTeachersResBasic,
    requestData?: RecommendTeachersPostBasic
}) {
    switch (action.type) {
        case REQUEST_RECOMMENT_TEACHERS_POST:

            return lodash.assign({}, state, {
                isFetching: true,
                page: action.requestData.page,
            })
        case RECEIVE_RECOMMENT_TEACHERS_POST:

            return lodash.assign({}, state, {
                isFetching: false,
                page: action.respontData.page,
                totalPage: action.respontData.totalPage,
                teachers: action.respontData.teachers
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

            return lodash.assign({}, state, {
                isFetching: true,
                page: action.requestData.page,
            })
        case RECEIVE_HOT_TEACHERS_POST:

            return lodash.assign({}, state, {
                isFetching: false,
                page: action.respontData.page,
                totalPage: action.respontData.totalPage,
                teachers: action.respontData.teachers
            })
        default:
            return state;
    }
}

const teacherReducers = combineReducers({
    basicInfo: postBasicInfo,
    courseList: postCourses,
    recommendTeachers: postRecommendTeachers,
    hotTeachers: postHotTeachers,
})

export default teacherReducers; 
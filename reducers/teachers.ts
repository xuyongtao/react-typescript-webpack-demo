import { combineReducers } from 'redux';
import * as lodash from 'lodash';

import {
    TeacherPostBasic,
    TeacherBasic,
    CoursesPostBasic,
    CoursesResBasic
} from '../common/teacher';

import {
    REQUEST_COURSES_POST,
    RECEIVE_COURSES_POST,
    REQUEST_BASIC_INFO_POST,
    RECEIVE_BASIC_INFO_POST
} from '../actions/teachers'

function postBasicInfo(state = {
    isFetching: false,
    tid: 0,
    avatar: '',
    name: '',
    selfIntro: ''
}, action: {
    type: string,
    respontData?: TeacherBasic,
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
                selfIntro: action.respontData.selfIntro
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
                pageCount: action.respontData.pageCount,
                courses: action.respontData.courses
            })
        default:
            return state;
    }
}

const teacherReducers = combineReducers({
    basicInfo: postBasicInfo,
    courseList: postCourses
})

export default teacherReducers; 
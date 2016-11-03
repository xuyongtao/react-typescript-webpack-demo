import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { publicPath } from '../common/config';

// interface
import {
    TeacherResBasic,
    CoursesResBasic,
    RecommendTeachersResBasic,
    HotTeachersResBasic
} from '../common/teacher';

// reducers
import teacherReducers from '../reducers/teachers';
// actions
import {
    fetchCoursesPost,
    fetchBasicInfoPost,
    fetchRecommendTeachers,
    fetchHotTeachers,
} from '../actions/teachers';

interface stateBasic {
    basicInfo: TeacherResBasic,
    courseList: CoursesResBasic,
    recommendTeachers: RecommendTeachersResBasic,
    hotTeachers: HotTeachersResBasic
}


export const store = createStore(teacherReducers, {}, applyMiddleware(thunkMiddleware));

export function getTeacherBasicInfo(tid: number): PromiseLike<TeacherResBasic> {
    return store
        .dispatch(fetchBasicInfoPost(publicPath + 'api/get-teacher-basic-info', {
            tid
        }))
        .then(() => (store.getState() as stateBasic).basicInfo)
}

export function getTeacherCourses(tid: number, page = 1): PromiseLike<CoursesResBasic> {
    return store
        .dispatch(fetchCoursesPost(publicPath + 'api/get-teacher-courses', {
            tid,
            page
        }))
        .then(() => (store.getState() as stateBasic).courseList)
}

export function getRecommendTeachers(page = 1): PromiseLike<RecommendTeachersResBasic> {
    return store
        .dispatch(fetchRecommendTeachers(publicPath + 'api/get-recommend-teachers', { page }))
        .then(() => (store.getState() as stateBasic).recommendTeachers)
}

export function getHotTeachers(page = 1): PromiseLike<HotTeachersResBasic> {
    return store
        .dispatch(fetchHotTeachers(publicPath + 'api/get-hot-teachers', { page }))
        .then(() => (store.getState() as stateBasic).hotTeachers)
}

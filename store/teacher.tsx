import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { localPublicPath } from '../common/config';

// interface
import {
    TeacherResBasic,
    CoursesResBasic,
    RecommendTeachersResBasic,
} from '../common/teacher';

// reducers
import teacherReducers from '../reducers/teachers';
// actions
import {
    fetchCoursesPost,
    fetchBasicInfoPost,
    fetchRecommendTeachers,
} from '../actions/teachers';

interface stateBasic {
    basicInfo: TeacherResBasic,
    courseList: CoursesResBasic,
    recommendTeachers: RecommendTeachersResBasic,
}


export const store = createStore(teacherReducers, {}, applyMiddleware(thunkMiddleware));

export function getTeacherBasicInfo(): PromiseLike<TeacherResBasic> {
    return store
        .dispatch(fetchBasicInfoPost(localPublicPath + 'api/get-teacher-basic-info', {
            tid: 12
        }))
        .then(() => (store.getState() as stateBasic).basicInfo)
}

export function getTeacherCourses(): PromiseLike<CoursesResBasic> {
    return store
        .dispatch(fetchCoursesPost(localPublicPath + 'api/get-teacher-courses', {
            tid: 12,
            page: 1
        }))
        .then(() => (store.getState() as stateBasic).courseList)
}

export function getRecommendTeachers(page?: number): PromiseLike<RecommendTeachersResBasic> {
    return store
        .dispatch(fetchRecommendTeachers(localPublicPath + 'api/get-recommend-teachers', { page }))
        .then(() => (store.getState() as stateBasic).recommendTeachers)
}

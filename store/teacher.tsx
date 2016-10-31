import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';


// interface
import {
    TeacherBasic,
    CoursesResBasic,
    RecommendTeachersResBasic,
} from '../common/teacher';

interface stateBasic {
    basicInfo: TeacherBasic,
    courseList: CoursesResBasic,
    recommendTeachers: RecommendTeachersResBasic,
}

// reducers
import teacherReducers from '../reducers/teachers';
// actions
import {
    fetchCoursesPost,
    fetchBasicInfoPost,
    fetchRecommendTeachers,
} from '../actions/teachers';

console.log('built store...');

export const store = createStore(teacherReducers, {}, applyMiddleware(thunkMiddleware));

export function getTeacherBasicInfo(): PromiseLike<TeacherBasic> {
    return store
        .dispatch(fetchBasicInfoPost('http://192.168.2.55:8080/api/get-teacher-basic-info', {
            tid: 12
        }))
        .then(() => (store.getState() as stateBasic).basicInfo)
}

export function getTeacherCourses(): PromiseLike<CoursesResBasic> {
    return store
        .dispatch(fetchCoursesPost('http://192.168.2.55:8080/api/get-teacher-courses', {
            tid: 12,
            page: 1
        }))
        .then(() => (store.getState() as stateBasic).courseList)
}

export function getRecommendTeachers(): PromiseLike<RecommendTeachersResBasic> {
    console.log('running getRecommendTeachers');

    return store
        .dispatch(fetchRecommendTeachers('http://192.168.2.55:8080/api/get-recommend-teachers', {
            page: 1
        }))
        .then(() => (store.getState() as stateBasic).recommendTeachers)
}

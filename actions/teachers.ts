import { Dispatch } from 'redux';

import * as fetch from 'isomorphic-fetch';

import {
    CoursesPostBasic,
    CoursesResBasic,
    CourseBasic,
    TeacherPostBasic,
    TeacherResBasic,
    RecommendTeachersPostBasic,
    RecommendTeachersResBasic,
    HotTeachersPostBasic,
    HotTeachersResBasic,
} from '../common/teacher';


// 请求老师基本信息action
export const REQUEST_BASIC_INFO_POST = 'REQUEST_BASIC_INFO_POST';
function requestBasicInfoPost(data: TeacherPostBasic) {
    return {
        type: REQUEST_BASIC_INFO_POST,
        requestData: data
    }
}

export const RECEIVE_BASIC_INFO_POST = 'RECEIVE_BASIC_INFO_POST';
function receiveBasicInfoPost(data: TeacherResBasic) {
    return {
        type: RECEIVE_BASIC_INFO_POST,
        respontData: {
            tid: data.tid,
            name: data.name,
            avatar: data.avatar,
            selfIntro: data.selfIntro
        }
    }
}

export function fetchBasicInfoPost(url: string, data: TeacherPostBasic) {
    return function (dispatch: Dispatch<any>) {
        dispatch(requestBasicInfoPost(data));

        return fetch(url,
            {
                method: 'post',
                body: JSON.stringify({
                    tid: data.tid
                }),
            })
            .then(response => response.json())
            .then(data => {
                dispatch(receiveBasicInfoPost(data))
            })
    }
}
// end

// 请求老师课程列表信息action
export const REQUEST_COURSES_POST = 'REQUEST_COURSES_POST';
function requestCoursesPost(data: CoursesPostBasic) {
    return {
        type: REQUEST_COURSES_POST,
        requestData: data
    }
}

export const RECEIVE_COURSES_POST = 'RECEIVE_COURSES_POST';
function receiveCoursesPost(data: CoursesResBasic) {
    return {
        type: RECEIVE_COURSES_POST,
        respontData: data
    }
}

export function fetchCoursesPost(url: string, data: CoursesPostBasic) {
    return function (dispatch: Dispatch<any>) {
        dispatch(requestCoursesPost(data));

        return fetch(url,
            {
                method: 'post',
                body: JSON.stringify({
                    tid: data.tid,
                    page: data.page
                }),
            })
            .then(response => response.json())
            .then(data => {
                dispatch(receiveCoursesPost(data))
            })
    }
}
// end

// 请求推荐的老师action
export const REQUEST_RECOMMENT_TEACHERS_POST = 'REQUEST_RECOMMENT_TEACHERS_POST';
function requestRecommendTeachersPost(data: RecommendTeachersPostBasic) {
    return {
        type: REQUEST_RECOMMENT_TEACHERS_POST,
        requestData: data,
    }
}

export const RECEIVE_RECOMMENT_TEACHERS_POST = 'RECEIVE_RECOMMENT_TEACHERS_POST';
function receiveRecommendTeachersPost(data: RecommendTeachersResBasic) {
    return {
        type: RECEIVE_RECOMMENT_TEACHERS_POST,
        respontData: data
    }
}

export function fetchRecommendTeachers(url: string, data: RecommendTeachersPostBasic) {
    return function (dispatch: Dispatch<any>) {
        dispatch(requestRecommendTeachersPost(data));

        return fetch(url,
            {
                method: 'post',
                body: JSON.stringify({
                    page: data.page
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {

                dispatch(receiveRecommendTeachersPost(data))
            })
    }
}
// end

// 请求热门的老师action
export const REQUEST_HOT_TEACHERS_POST = 'REQUEST_HOT_TEACHERS_POST';
function requestHotTeachersPost(data: HotTeachersPostBasic) {
    return {
        type: REQUEST_HOT_TEACHERS_POST,
        requestData: data,
    }
}

export const RECEIVE_HOT_TEACHERS_POST = 'RECEIVE_HOT_TEACHERS_POST';
function receiveHotTeachersPost(data: HotTeachersResBasic) {
    return {
        type: RECEIVE_HOT_TEACHERS_POST,
        respontData: data
    }
}

export function fetchHotTeachers(url: string, data: HotTeachersPostBasic) {
    return function (dispatch: Dispatch<any>) {
        dispatch(requestHotTeachersPost(data));

        return fetch(url,
            {
                method: 'post',
                body: JSON.stringify({
                    page: data.page
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                dispatch(receiveHotTeachersPost(data))
            })
    }
}
// end

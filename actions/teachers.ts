import { Dispatch } from 'redux';

import * as fetch from 'isomorphic-fetch';

import {
    CoursesPostBasic,
    CoursesResBasic,
    CourseBasic,
    TeacherPostBasic,
    TeacherBasic
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
function receiveBasicInfoPost(data: TeacherBasic) {
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
                mode: 'cors',
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
                mode: 'cors',
            })
            .then(response => response.json())
            .then(data => {
                dispatch(receiveCoursesPost(data))
            })
    }
}
// end

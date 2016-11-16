import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import { api } from "../common/utils";

import {
    CoursesPostBasic,
    CoursesResBasic,
    CourseBasic,
} from '../interface/teacher';

// TODO: 以下未对请求出现错误做处理
// 请求老师课程列表信息action
export const REQUEST_COURSES_POST = 'REQUEST_COURSES_POST';
export const RECEIVE_COURSES_POST = 'RECEIVE_COURSES_POST';

function requestCoursesPost(data: CoursesPostBasic) {
    return {
        type: REQUEST_COURSES_POST,
        requestData: data
    }
}
function receiveCoursesPost(data: CoursesResBasic) {
    return {
        type: RECEIVE_COURSES_POST,
        responseData: data
    }
}
export function fetchCoursesPost(url: string, data: CoursesPostBasic) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestCoursesPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveCoursesPost(<CoursesResBasic>res.data));
            })
    }
}
// end

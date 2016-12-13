import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import { api } from "../common/utils";

export const REQUEST_TEACHER_INTRO_POST = "REQUEST_TEACHER_INTRO_POST";
export const RECEIVE_TEACHER_INTRO_POST = "RECEIVE_TEACHER_INTRO_POST";

import {
    RequestCourseListPost,
    ReceiveCourseListPost,
    CourseBasic,
} from "../interface/common";

import {
    RequestTeacherIntroPost,
    ReceiveTeacherIntroPost,
} from "../interface/teacher";

function requestIntroPost(data: RequestTeacherIntroPost) {
    return {
        type: REQUEST_TEACHER_INTRO_POST,
        requestData: data,
    }
}
function receiveIntroPost(data: ReceiveTeacherIntroPost) {
    return {
        type: RECEIVE_TEACHER_INTRO_POST,
        responseData: data
    }
}
export function fetchTeacherIntro({
    url,
    data,
}: {
        url: string;
        data: RequestTeacherIntroPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestIntroPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveIntroPost(<ReceiveTeacherIntroPost>res.data));
            })
    }
}
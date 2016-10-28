import { Dispatch } from 'redux';

import * as fetch from 'isomorphic-fetch';

import { TeacherPostBasic, TeacherBasic } from '../common/teacher';


// 请求老师基本信息action
export const REQUEST_BASIC_INFO_POSTS = 'REQUEST_BASIC_INFO_POSTS';
function requestBasicInfoPosts(data: TeacherPostBasic) {
    return {
        type: REQUEST_BASIC_INFO_POSTS,
        requestData: data
    }
}

export const RECEIVE_BASIC_INFO_POSTS = 'RECEIVE_BASIC_INFO_POSTS';
function receiveBasicInfoPosts(data: TeacherBasic) {
    return {
        type: RECEIVE_BASIC_INFO_POSTS,
        respontData: {
            tid: data.tid,
            name: data.name,
            avatar: data.avatar,
            selfIntro: data.selfIntro
        }
    }
}

export function fetchBasicInfoPosts(url: string, data: TeacherPostBasic) {
    return function (dispatch: Dispatch<any>) {
        dispatch(requestBasicInfoPosts(data));

        return fetch(url,
            {
                method: 'get',
                body: JSON.stringify({
                    tid: data.tid
                })
            })
            .then(response => response.json())
            .then(data => {
                dispatch(receiveBasicInfoPosts(data))
            })
    }
}
// end


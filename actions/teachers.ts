import { Dispatch } from 'redux';

import * as fetch from 'isomorphic-fetch';

import { UserBasic } from '../common/teacher';


export const REQUEST_BASIC_INFO_POSTS = 'REQUEST_BASIC_INFO_POSTS';
function requestBasicInfoPosts(data: any) {
    return {
        type: REQUEST_BASIC_INFO_POSTS,
        data
    }
}

export const RECEIVE_BASIC_INFO_POSTS = 'RECEIVE_BASIC_INFO_POSTS';
function receiveBasicInfoPosts(data: UserBasic) {
    return {
        type: RECEIVE_BASIC_INFO_POSTS,
        data: {
            name: data.name,
            avatar: data.avatar,
            selfIntro: data.selfIntro
        }
    }
}

export function fetchBasicInfoPosts(url: string, data: any) {
    return function (dispatch: Dispatch<any>) {
        dispatch(requestBasicInfoPosts(data));

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch(receiveBasicInfoPosts(data))
            })
    }
}


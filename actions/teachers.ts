import { Promise } from 'thenfail';

export const REQUEST_BASIC_INFO_POSTS = 'REQUEST_BASIC_INFO_POSTS';
export const REQUEST_INTRO_POSTS = 'REQUEST_INTRO_POSTS';
export const REQUEST_COURSE_POSTS = 'REQUEST_COURSE_POSTS';
export const REQUEST_PHOTOS_POSTS = 'REQUEST_PHOTOS_POSTS';

export const RECEIVE_BASIC_INFO_POSTS = 'RECEIVE_BASIC_INFO_POSTS';
export const RECEIVE_INTRO_POSTS = 'RECEIVE_INTRO_POSTS';
export const RECEIVE_COURSE_POSTS = 'RECEIVE_COURSE_POSTS';
export const RECEIVE_PHOTOS_POSTS = 'RECEIVE_PHOTOS_POSTS';

export function requestBasicInfoPosts(data: any) {
    return {
        type: REQUEST_BASIC_INFO_POSTS,
        data
    }
}

export function receiveBasicInfoPosts(json: any) {
    return {
        type: RECEIVE_BASIC_INFO_POSTS,
        posts: json['data'],
        receivedAt: Date.now()
    }
}

export function fetchBasicInfoPosts(url: string, data: any) {
    return function (dispatch: any) {
        dispatch(requestBasicInfoPosts(data));

        // return Promise
        //     .then(() => {
        //         return $.ajax({
        //             url,
        //             method: 'post',
        //             data
        //         })
        //     })
        //     .then((response: any) => response.json())
        //     .then((json: any) => 
        //         dispatch(receiveBasicInfoPosts(json))
        //     )
    }
}

export function requestIntroPosts(data: any) {
    return {
        type: REQUEST_INTRO_POSTS,
        data
    }
}

export function requestCoursePosts(data: any) {
    return {
        type: REQUEST_COURSE_POSTS,
        data
    }
}

export function requestPhotosPosts(data: any) {
    return {
        type: REQUEST_PHOTOS_POSTS,
        data
    }
}



export function receiveIntroPosts(respon: any) {
    return {
        type: RECEIVE_INTRO_POSTS,
        posts: respon['data'],
        receivedAt: Date.now()
    }
}

export function receiveCoursePosts(respon: any) {
    return {
        type: RECEIVE_COURSE_POSTS,
        posts: respon['data'],
        receivedAt: Date.now()
    }
}

export function receivePhotosPosts(respon: any) {
    return {
        type: RECEIVE_PHOTOS_POSTS,
        posts: respon['data'],
        receivedAt: Date.now()
    }
}



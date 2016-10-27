import { combineReducers } from 'redux';
import * as lodash from 'lodash';


import {
    REQUEST_BASIC_INFO_POSTS,
    REQUEST_INTRO_POSTS,
    REQUEST_COURSE_POSTS,
    REQUEST_PHOTOS_POSTS,
    RECEIVE_BASIC_INFO_POSTS,
    RECEIVE_INTRO_POSTS,
    RECEIVE_COURSE_POSTS,
    RECEIVE_PHOTOS_POSTS
} from '../actions/teachers'

function postsBasicInfo(state: any = {
    isFetching: false
}, action: string) {
    switch (action) {
        case REQUEST_BASIC_INFO_POSTS:
            console.log('test......');
            return lodash.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_BASIC_INFO_POSTS:
            return lodash.assign({}, state, {
                isFetching: false,

            })
        default:
            return state;
    }
}

const app = combineReducers({
    postsBasicInfo
})

export default app; 
import { combineReducers } from 'redux';
import * as lodash from 'lodash';

import { UserBasic } from '../common/teacher';

import {
    REQUEST_BASIC_INFO_POSTS,
    RECEIVE_BASIC_INFO_POSTS
} from '../actions/teachers'

function postsBasicInfo(state: any = {
    isFetching: false,
    avatar: '',
    name: '',
    selfIntro: ''
}, action: {
    type: string,
    data: UserBasic
}) {
    switch (action.type) {
        case REQUEST_BASIC_INFO_POSTS:
            console.log('test......');

            return lodash.assign({}, state, {
                isFetching: true
            })
        case RECEIVE_BASIC_INFO_POSTS:
            return lodash.assign({}, state, {
                isFetching: false,
                name: action.data.name,
                avatar: action.data.avatar,
                selfIntro: action.data.selfIntro
            })
        default:
            return state;
    }
}

const teacherReducers = combineReducers({
    basicInfo: postsBasicInfo
})

export default teacherReducers; 
import { combineReducers } from 'redux';
import * as lodash from 'lodash';

import { TeacherPostBasic, TeacherBasic } from '../common/teacher';

import {
    REQUEST_BASIC_INFO_POSTS,
    RECEIVE_BASIC_INFO_POSTS
} from '../actions/teachers'

function postsBasicInfo(state = {
    isFetching: false,
    tid: 0,
    avatar: '',
    name: '',
    selfIntro: ''
}, action: {
    type: string,
    respontData?: TeacherBasic,
    requestData?: TeacherPostBasic
}) {
    switch (action.type) {
        case REQUEST_BASIC_INFO_POSTS:

            return lodash.assign({}, state, {
                isFetching: true,
                tid: action.requestData.tid
            })
        case RECEIVE_BASIC_INFO_POSTS:

            return lodash.assign({}, state, {
                // isFetching: false,
                name: action.respontData.name,
                avatar: action.respontData.avatar,
                selfIntro: action.respontData.selfIntro
            })
        default:
            return state;
    }
}

const teacherReducers = combineReducers({
    basicInfo: postsBasicInfo
})

export default teacherReducers; 
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { Promise } from "thenfail";
import { apis, publicPath } from "../common/config";

// interface
import {
    CoursesResBasic,
} from "../interface/teacher";
import {
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestRecommendListPost,
    ReceiveRecommendListPost,
    RequestHotListPost,
    ReceiveHotListPost,
} from "../interface/common";

// reducers
import reducers from "../reducers/index";
// actions
import {
    fetchBasicInfoPost,
    fetchRecommendList,
    fetchHotList,
} from "../actions/common";
import {
    fetchCoursesPost,
} from "../actions/teacher";

interface stateBasic {
    basicInfo: ReceiveBasicInfoPost,
    courseList: CoursesResBasic,
    recommendList: ReceiveRecommendListPost,
    hotList: ReceiveHotListPost,
}


export const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));

export function getBasicInfo(id: number, role: number): Promise<ReceiveBasicInfoPost> {
    return store
        .dispatch(fetchBasicInfoPost({
            url: publicPath + "api/get-teacher-basic-info",
            data: { id, role }
        }))
        .then(() => (store.getState() as stateBasic).basicInfo)
}

export function getTeacherCourses(tid: number, page = 1): PromiseLike<CoursesResBasic> {
    return store
        .dispatch(fetchCoursesPost(publicPath + "api/get-teacher-courses", {
            tid,
            page
        }))
        .then(() => (store.getState() as stateBasic).courseList)
}

export function getRecommendList(page = 1, pageSize = 8, isRecommend = true): Promise<ReceiveRecommendListPost> {
    return store
        .dispatch(fetchRecommendList({
            url: apis.getIndexRoleList,
            data: {
                page,
                pageSize,
                isRecommend,
            }
        }))
        .then(() => (store.getState() as stateBasic).recommendList)
}

export function getHotList(page = 1, pageSize = 8, isRecommend = false): Promise<ReceiveHotListPost> {
    return store
        .dispatch(fetchHotList({
            url: apis.getIndexRoleList,
            data: {
                page,
                pageSize,
                isRecommend,
            }
        }))
        .then(() => (store.getState() as stateBasic).hotList)
}

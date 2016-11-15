import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { Promise } from "thenfail";
import { publicPath } from "../common/config";

// interface
import {
    TeacherResBasic,
    CoursesResBasic,
    RecommendTeachersResBasic,
    HotTeachersResBasic
} from "../interface/teacher";
import {
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestRecommendListPost,
    ReceiveRecommendListPost,
} from "../interface/common";

// reducers
import reducers from "../reducers/index";
// actions
import {

    fetchBasicInfoPost,
    fetchRecommendList,
} from "../actions/common";
import {
    fetchCoursesPost,
    fetchRecommendTeachers,
    fetchHotTeachers,
} from "../actions/teacher";

interface stateBasic {
    basicInfo: ReceiveBasicInfoPost,
    courseList: CoursesResBasic,
    recommendList: ReceiveRecommendListPost,
    hotTeachers: HotTeachersResBasic
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

export function getRecommendList(page = 1): Promise<ReceiveRecommendListPost> {
    return store
        .dispatch(fetchRecommendList({
            url: publicPath + "api/get-recommend-teachers",
            data: { page }
        }))
        .then(() => (store.getState() as stateBasic).recommendList)
}

export function getHotTeachers(page = 1): PromiseLike<HotTeachersResBasic> {
    return store
        .dispatch(fetchHotTeachers(publicPath + "api/get-hot-teachers", { page }))
        .then(() => (store.getState() as stateBasic).hotTeachers)
}

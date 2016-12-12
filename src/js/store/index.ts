import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import { Promise } from "thenfail";
import { apis, Role } from "../common/config";

// interface
import {
    ReceiveCourseListPost,
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestPhotoListPost,
    ReceivePhotoListPost,
    RequestRecommendListPost,
    ReceiveRecommendListPost,
    RequestHotListPost,
    ReceiveHotListPost,
    RequestSearchListPost,
    ReceiveSearchListPost,
    RequestCourseDetailPost,
    ReceiveCourseDetailPost,
    RequestBookingPost,
    ReceiveBookingPost,
} from "../interface/common";
import {
    RequestIndexPageInfoPost as RequestStudioIndexPageInfoPost,
    ReceiveIndexPageInfoPost as ReceiveStudioIndexPageInfoPost,
    RequestTeacherListPost,
    ReceiveTeacherListPost,
    RequestIntroPost,
    ReceiveIntroPost,
} from "../interface/studio";

// reducers
import reducers from "../reducers/index";
// actions
import {
    fetchBasicInfoPost,
    fetchCourseListPost,
    fetchPhotoList,
    fetchRecommendList,
    fetchHotList,
    searchList,
    fetchCourseDetail,
    postBooking,
} from "../actions/common";

import {
    fetchIndexPageInfo as fetchStudioIndexPageInfo,
    fetchTeacherList as fetchStudioTeacherList,
    fetchStudioIntro,
} from "../actions/studio";

interface stateBasic {
    basicInfo: ReceiveBasicInfoPost,
    courseList: ReceiveCourseListPost,
    photoList: ReceivePhotoListPost,
    recommendList: ReceiveRecommendListPost,
    hotList: ReceiveHotListPost,
    searchList: ReceiveSearchListPost,
    studioIndexPageInfo: ReceiveStudioIndexPageInfoPost,
    studioTeacherList: ReceiveTeacherListPost,
    studioIntro: ReceiveIntroPost,
    courseDetail: ReceiveCourseDetailPost,
    bookingResult: ReceiveBookingPost,
}


export const store = createStore(reducers, {}, applyMiddleware(thunkMiddleware));

export function getBasicInfo(id: number, role: number): Promise<ReceiveBasicInfoPost> {
    return store
        .dispatch(fetchBasicInfoPost({
            url: apis.getBasicInfo,
            data: { id, role }
        }))
        .then(() => (store.getState() as stateBasic).basicInfo)
}

export function getCourseList({
    id,
    page = 1,
    perPage = 8,
    role = Role.teacher,
}: {
        id: number;
        page: number;
        perPage?: number;
        role: number;
    }): PromiseLike<ReceiveCourseListPost> {
    return store
        .dispatch(fetchCourseListPost(apis.getCourseList, { id, page, perPage, role }))
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

export function search(data: RequestSearchListPost): Promise<ReceiveSearchListPost> {
    return store
        .dispatch(searchList({
            url: apis.getSearchRoleList,
            data: {
                page: data.page,
                pageSize: data.pageSize,
                catId: data.catId,
                orderByFavCount: data.orderByFavCount,
                orderByViewedCount: data.orderByViewedCount,
                teachingWay: data.teachingWay,
                teachingAge: data.teachingAge,
                role: data.role,
                keyword: data.keyword,
            }
        }))
        .then(() => (store.getState() as stateBasic).searchList)
}

export function getStudioIndexPageInfo(id: number): Promise<ReceiveStudioIndexPageInfoPost> {
    return store
        .dispatch(fetchStudioIndexPageInfo({
            url: apis.getStudioIndexPageInfo,
            data: { id }
        }))
        .then(() => (store.getState() as stateBasic).studioIndexPageInfo);
}

export function getStudioTeacherList(data: RequestTeacherListPost): Promise<ReceiveTeacherListPost> {
    return store
        .dispatch(fetchStudioTeacherList({
            url: apis.getStudioTeacherList,
            data
        }))
        .then(() => (store.getState() as stateBasic).studioTeacherList);
}

export function getPhotoList(data: RequestPhotoListPost): Promise<ReceivePhotoListPost> {
    return store
        .dispatch(fetchPhotoList(apis.getPhotoList, data))
        .then(() => (store.getState() as stateBasic).photoList);
}

export function getStudioIntro(id: number): Promise<ReceiveIntroPost> {
    return store
        .dispatch(fetchStudioIntro({
            url: apis.getStudioIntro,
            data: { id }
        }))
        .then(() => (store.getState() as stateBasic).studioIntro);
}

export function getCourseDetail(id: number): Promise<ReceiveCourseDetailPost> {
    return store
        .dispatch(fetchCourseDetail({
            url: apis.getCourseDetailInfo,
            data: { id }
        }))
        .then(() => (store.getState() as stateBasic).courseDetail);
}

export function booking({
    id,
    name,
    mobile,
    mark,
}: {
        id: number;
        name: string;
        mobile: string;
        mark: string;
    }): Promise<ReceiveBookingPost> {
    return store
        .dispatch(postBooking({
            url: apis.booking,
            data: { id, name, mobile, mark }
        }))
        .then(() => (store.getState() as stateBasic).bookingResult);
}
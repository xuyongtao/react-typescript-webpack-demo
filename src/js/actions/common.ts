import { Dispatch } from "redux";
import * as fetch from "isomorphic-fetch";
import { api } from "../common/utils";

import {
    RequestBasicInfoPost,
    ReceiveBasicInfoPost,
    RequestCourseListPost,
    ReceiveCourseListPost,
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
    RequestSuggestionPost,
    ReceiveSuggestionPost,
} from "../interface/common";

export const REQUEST_BASIC_INFO_POST = "REQUEST_BASIC_INFO_POST";
export const RECEIVE_BASIC_INFO_POST = "RECEIVE_BASIC_INFO_POST";
export const REQUEST_COURSE_LIST_POST = 'REQUEST_COURSE_LIST_POST';
export const RECEIVE_COURSE_LIST_POST = 'RECEIVE_COURSE_LIST_POST';
export const REQUEST_PHOTO_LIST_POST = 'REQUEST_PHOTO_LIST_POST';
export const RECEIVE_PHOTO_LIST_POST = 'RECEIVE_PHOTO_LIST_POST';
export const REQUEST_RECOMMENT_LIST_POST = 'REQUEST_RECOMMENT_LIST_POST';
export const RECEIVE_RECOMMENT_LIST_POST = 'RECEIVE_RECOMMENT_LIST_POST';
export const REQUEST_HOT_LIST_POST = 'REQUEST_HOT_LIST_POST';
export const RECEIVE_HOT_LIST_POST = 'RECEIVE_HOT_LIST_POST';
export const REQUEST_SEARCH_LIST_POST = 'REQUEST_SEARCH_LIST_POST';
export const RECEIVE_SEARCH_LIST_POST = 'RECEIVE_SEARCH_LIST_POST';
export const REQUEST_COURSE_DETAIL_POST = 'REQUEST_COURSE_DETAIL_POST';
export const RECEIVE_COURSE_DETAIL_POST = 'RECEIVE_COURSE_DETAIL_POST';
export const REQUEST_BOOKING_POST = 'REQUEST_BOOKING_POST';
export const RECEIVE_BOOKING_POST = 'RECEIVE_BOOKING_POST';
export const REQUEST_SUGGESTION_POST = 'REQUEST_SUGGESTION_POST';
export const RECEIVE_SUGGESTION_POST = 'RECEIVE_SUGGESTION_POST';

function requestBasicInfoPost(data: RequestBasicInfoPost) {
    return {
        type: REQUEST_BASIC_INFO_POST,
        requestData: data,
    }
}
function receiveBasicInfoPost(data: ReceiveBasicInfoPost) {
    return {
        type: RECEIVE_BASIC_INFO_POST,
        responseData: data,
    }
}
export function fetchBasicInfoPost({
    url,
    data,
}: {
        url: string;
        data: RequestBasicInfoPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestBasicInfoPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveBasicInfoPost(<ReceiveBasicInfoPost>res.data));
            })
    }
}

function requestCourseListPost(data: RequestCourseListPost) {
    return {
        type: REQUEST_COURSE_LIST_POST,
        requestData: data
    }
}
function receiveCourseListPost(data: ReceiveCourseListPost) {
    return {
        type: RECEIVE_COURSE_LIST_POST,
        responseData: data
    }
}
export function fetchCourseListPost(url: string, data: RequestCourseListPost) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestCourseListPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveCourseListPost(<ReceiveCourseListPost>res.data));
            })
    }
}

function requestPhotoListPost(data: RequestPhotoListPost) {
    return {
        type: REQUEST_PHOTO_LIST_POST,
        requestData: data
    }
}
function receivePhotoListPost(data: ReceivePhotoListPost) {
    return {
        type: RECEIVE_PHOTO_LIST_POST,
        responseData: data
    }
}
export function fetchPhotoList(url: string, data: RequestPhotoListPost) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestPhotoListPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receivePhotoListPost(<ReceivePhotoListPost>res.data));
            })
    }
}

function requestRecommendListPost(data: RequestRecommendListPost) {
    return {
        type: REQUEST_RECOMMENT_LIST_POST,
        requestData: data,
    }
}
function receiveRecommendListPost(data: ReceiveRecommendListPost) {
    return {
        type: RECEIVE_RECOMMENT_LIST_POST,
        responseData: data
    }
}
export function fetchRecommendList({
    url,
    data,
}: {
        url: string;
        data: RequestRecommendListPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestRecommendListPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveRecommendListPost(<ReceiveRecommendListPost>res.data));
            })
    }
}

function requestHotListPost(data: RequestHotListPost) {
    return {
        type: REQUEST_HOT_LIST_POST,
        requestData: data,
    }
}
function receiveHotListPost(data: ReceiveHotListPost) {
    return {
        type: RECEIVE_HOT_LIST_POST,
        responseData: data
    }
}
export function fetchHotList({
    url,
    data,
}: {
        url: string;
        data: RequestHotListPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestHotListPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveHotListPost(<ReceiveHotListPost>res.data));
            })
    }
}

function requestSearchListPost(data: RequestSearchListPost) {
    return {
        type: REQUEST_SEARCH_LIST_POST,
        requestData: data,
    }
}
function receiveSearchListPost(data: ReceiveSearchListPost) {
    return {
        type: RECEIVE_SEARCH_LIST_POST,
        responseData: data
    }
}
export function searchList({
    url,
    data,
}: {
        url: string;
        data: RequestSearchListPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestSearchListPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveSearchListPost(<ReceiveSearchListPost>res.data));
            })
    }
}

function requestCourseDetailPost(data: RequestCourseDetailPost) {
    return {
        type: REQUEST_COURSE_DETAIL_POST,
        requestData: data,
    }
}
function receiveCourseDetailPost(data: ReceiveCourseDetailPost) {
    return {
        type: RECEIVE_COURSE_DETAIL_POST,
        responseData: data,
    }
}
export function fetchCourseDetail({
    url,
    data,
}: {
        url: string;
        data: RequestCourseDetailPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestCourseDetailPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveCourseDetailPost(<ReceiveCourseDetailPost>res.data));
            })
    }
}

function requestBookingPost(data: RequestBookingPost) {
    return {
        type: REQUEST_BOOKING_POST,
        requestData: data,
    }
}
function receiveBookingPost(data: ReceiveBookingPost) {
    return {
        type: RECEIVE_BOOKING_POST,
        responseData: data,
    }
}
export function postBooking({
    url,
    data
}: {
        url: string;
        data: RequestBookingPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestBookingPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveBookingPost(<ReceiveBookingPost>res.data));
            })
    }
}

function requestSuggestionPost(data: RequestSuggestionPost) {
    return {
        type: REQUEST_SUGGESTION_POST,
        requestData: data,
    }
}
function receiveSuggestionPost(data: ReceiveSuggestionPost) {
    return {
        type: RECEIVE_SUGGESTION_POST,
        responseData: data,
    }
}
export function postSuggestion({
    url,
    data
}: {
        url: string;
        data: RequestSuggestionPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestSuggestionPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveSuggestionPost(<ReceiveSuggestionPost>res.data));
            })
    }
}

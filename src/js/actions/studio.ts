import { Dispatch } from "redux";
import * as fetch from "isomorphic-fetch";
import { api } from "../common/utils";

export const REQUEST_INDEX_PAGE_INFO_POST = "REQUEST_INDEX_PAGE_INFO_POST";
export const RECEIVE_INDEX_PAGE_INFO_POST = "RECEIVE_INDEX_PAGE_INFO_POST";

import {
    RequestIndexPageInfoPost,
    ReceiveIndexPageInfoPost,
} from "../interface/studio";

function requestIndexPageInfoPost(data: RequestIndexPageInfoPost) {
    return {
        type: REQUEST_INDEX_PAGE_INFO_POST,
        requestData: data,
    }
}
function receiveIndexPageInfoPost(data: ReceiveIndexPageInfoPost) {
    return {
        type: RECEIVE_INDEX_PAGE_INFO_POST,
        responseData: data
    }
}
export function fetchIndexPageInfo({
    url,
    data,
}: {
        url: string;
        data: RequestIndexPageInfoPost;
    }) {
    return (dispatch: Dispatch<any>) => {
        dispatch(requestIndexPageInfoPost(data));

        return api
            .post(url, data)
            .then(res => {
                dispatch(receiveIndexPageInfoPost(<ReceiveIndexPageInfoPost>res.data));
            })
    }
}
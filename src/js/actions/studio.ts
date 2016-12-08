import { Dispatch } from "redux";
import * as fetch from "isomorphic-fetch";
import { api } from "../common/utils";

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
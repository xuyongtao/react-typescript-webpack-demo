import * as fetch from "isomorphic-fetch";
import { Promise as Promise1 } from "thenfail";
import * as qs from "query-string";

import Notification from "../../components/notification";

interface Dictionary<T> {
    [key: string]: T
}
type DataType = Dictionary<any>;
interface Response {
    data: DataType,
    meta: {
        code: number;
        msg: string;
    }
}

class ResponseError extends Error {
    constructor(code: number, message: string) {
        super(message);
    }
}

function request({
    method = "GET",
    url,
    data = {}
}: {
        method?: string;
        url: string;
        data: DataType;
    }): Promise<any> {
    if (method == "GET") {
        let query = data && qs.stringify(data);
        if (query) {
            url = url + (url.indexOf('?') > -1 ? `&${query}` : `?${query}`);
        }
    }

    return fetch(url, {
        method: method.toLowerCase(),
        body: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then((res): any => {
            if (res.meta && res.meta.code != 0) {
                console.log(res.meta.msg + ' error code is ' + res.meta.code);

                throw new Error(res.meta.msg);
            }

            if (res.meta && res.meta.redirect) {
                window.location.href = res.meta.redirect;
            }

            return res;
        })
}

export const api = {
    get: (url: string, data?: DataType) => {

        return Promise1
            .resolve(request({
                method: "GET",
                url,
                data
            }))
            .fail((error: Error) => {
                if (error.name === "SyntaxError" && error.message === "Unexpected end of JSON input") {
                    error.message = "网络或服务器错误";
                }

                Notification.info({
                    content: error.message || "请求数据失败",
                });
            })
    },
    post: (url: string, data?: DataType) => {

        return Promise1
            .resolve(request({
                method: "POST",
                url,
                data
            }))
            .fail((error: Error) => {
                if (error.name === "SyntaxError" && error.message === "Unexpected end of JSON input") {
                    error.message = "网络或服务器错误";
                }

                Notification.info({
                    content: error.message || "请求数据失败",
                });
            })
    }
}

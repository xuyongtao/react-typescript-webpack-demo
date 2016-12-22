import * as fetch from "isomorphic-fetch";
import { Promise } from "thenfail";
import * as qs from "query-string";

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
    }) {
    if (method == "GET") {
        let query = data && qs.stringify(data);
        if (query) {
            url = url + (url.indexOf('?') > -1 ? `&${query}` : `?${query}`);
        }
    }

    return Promise
        .resolve(fetch(url, {
            method: method.toLowerCase(),
            body: JSON.stringify(data),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }))
        .then(response => {
            if (response.status > 400) {
                console.log("Bad response from server, the response status code is " + response.status);

                throw new Error("服务器错误");
            } else {
                return response.json();
            }
        })
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
        return request({
            method: "GET",
            url,
            data
        });
    },
    post: (url: string, data?: DataType) => {
        return request({
            method: "POST",
            url,
            data
        })
    }
}

// function errorModal(message: string) {
//     return new Promise((resolve, reject) => {
//         notification.notice({
//             content: message,
//             onClose: () => {
//                 resolve();
//             }
//         });
//     })
//         .then(() => {
//             throw new Error(message);
//         })
// }

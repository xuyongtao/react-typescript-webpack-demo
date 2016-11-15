import * as fetch from "isomorphic-fetch";
import { Promise } from "thenfail";

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
    return Promise
        .resolve(fetch(url, {
            method: method.toLowerCase(),
            body: JSON.stringify(data),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }))
        .then(response => response.json())
        .then((res): Response => {
            if (res.meta && res.meta.code != 0) {
                throw new ResponseError(res.meta.code, res.meta.msg);
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

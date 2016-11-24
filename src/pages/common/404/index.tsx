import "./index.less";

import * as React from "react";

console.log('load 404 page');

export default class NotFound extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>404</div>
        )
    }
} 
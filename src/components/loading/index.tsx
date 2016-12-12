require("./index.less");
import * as React from "react";

export default class Loading extends React.Component<any, any> {
    render() {
        return (
            <div id="loading">
                <img src={ require('./loading.gif') } alt="加载中"/>
                <p>加载中</p>
            </div>
        )
    }
}
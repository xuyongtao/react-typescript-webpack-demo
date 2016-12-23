import "./index.less";

import * as React from "react";
import { Link } from "react-router";

export default class Banner extends React.Component<any, any> {
    render() {
        return (
            <div id="banner">
                <header>
                    <Link to="/">
                        <img src={ require("../../img/logo.png") } alt="全民教育网" className="logo"/>
                    </Link>
                </header>
                <img src={ require("../../img/banner.png") } alt="找老师上全民教育" className="banner"/>
            </div>
        )
    }
}
import * as React from "react";
import { Component } from "react";
import { render } from "react-dom";
import { Link, IndexLink, browserHistory } from "react-router";

export default class NavBar extends Component<any, any> {
    render() {
        const props = this.props;

        return (
            <div className="nav-bar">
                <span className="iconfont btn-back" onClick={ browserHistory.goBack } dangerouslySetInnerHTML={{__html: '&#xe600;'}}></span>
                <h1>{ props.pageTitle }</h1>
            </div>
        )
    }
}


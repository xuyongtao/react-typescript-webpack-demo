require("./index.less");

import * as React from "react";
import { render } from "react-dom";
import { Link, browserHistory } from 'react-router';

interface NavBarProps {
    pageTitle: string;
    pathToJump?: string;
}

export default class NavBar extends React.Component<NavBarProps, any> {
    static propTypes = {
        pageTitle: React.PropTypes.string.isRequired,
        pathToJump: React.PropTypes.string,
    }

    constructor(props: NavBarProps, context: any) {
        super(props, context);
    }

    handlerJump() {
        // if (this.props.pathToJump) {
        //     browserHistory.push(this.props.pathToJump);
        // } else {
        //     browserHistory.goBack();
        // }
        browserHistory.goBack();
    }

    render() {
        return (
            <div className="nav-bar">
                <span className="iconfont btn-back" onClick={ this.handlerJump.bind(this) }>{ String.fromCharCode(parseInt("e600", 16)) }</span>
                <span className="index-entrance">
                    <Link to="/">首页</Link>
                </span>
                <h1>{ this.props.pageTitle }</h1>
            </div>
        )
    }
}


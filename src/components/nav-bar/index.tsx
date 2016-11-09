import './index.less';

import * as React from "react";
import { render } from "react-dom";
import { browserHistory } from 'react-router';

interface PageBasic {
    pageTitle: string
}

export default class NavBar extends React.Component<any, any> {
    constructor(props: PageBasic, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="nav-bar">
                <span className="iconfont btn-back" onClick={ browserHistory.goBack } dangerouslySetInnerHTML={{ __html: '&#xe600;' }}></span>
                <h1>{ this.props.pageTitle }</h1>
            </div>
        )
    }
}


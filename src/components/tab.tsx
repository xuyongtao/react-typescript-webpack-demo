import './tab.less';

import * as React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

export default class Tab extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

    }

    static PropTypes = {
        name: React.PropTypes.string.isRequired,
        isActived: React.PropTypes.bool.isRequired,
        index: React.PropTypes.number.isRequired,
        clickHandler: React.PropTypes.func,
    }

    switchHandler(index: number) {
        this.props.clickHandler(index);
    }

    render() {
        return (
            <li className={ this.props.isActived ? 'active' : ''} onClick={ this.switchHandler.bind(this, this.props.index) } >{ this.props.name }</li>
        )
    }


}
import './tab.less';

import * as React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

export default class Tab extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    static defaultProps = {
        isIndex: false,
    };

    static PropTypes = {
        isIndex: React.PropTypes.bool.isRequired,
        name: React.PropTypes.string.isRequired,
        to: React.PropTypes.string.isRequired,
        tabs: React.PropTypes.object.isRequired,
    }

    render() {
        if (!this.props.isIndex) {
            return (
                <li style={ this.props.tabStyle }><Link to={ this.props.to } activeClassName="active">{ this.props.name }</Link></li>
            )
        } else {
            return (
                <li style={ this.props.tabStyle }><IndexLink to="/" activeClassName="active">{ this.props.name }</IndexLink></li>
            )
        }
    }
}
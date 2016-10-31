import './tabs-bar.less';

import * as React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, browserHistory, Link, IndexLink } from 'react-router';

interface TabBasic {
    isIndex: boolean,
    to: string,
    name: string,
    tabStyle: any,
}

class Tab extends React.Component<any, any> {
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

export default class TabsBar extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    static PropTypes = {
        tabs: React.PropTypes.object.isRequired,
    }

    render() {
        let tabStyle = {
            width: 100 / (this.props.tabs.length) + '%'
        };

        return (
            <div className="pannels">
                <ul className="tabs">
                    { this.props.tabs.map((tab: TabBasic, index: number) => {
                        return (
                            <Tab key={ tab.to } tabStyle={ tabStyle } { ...tab }/>
                        )
                    }) }
                </ul>
                { this.props.children }
            </div>
        )
    }
}




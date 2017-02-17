import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import Tab from './tab';

interface TabBasic {
    isIndex: boolean,
    to: string,
    name: string,
    tabStyle: any,
}

export default class TabsBar extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    static propTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    }

    render() {
        return (
            <div className={ `tabs tabs-${this.props.tabs.length}` }>
                { this.props.tabs.map((tab: TabBasic, index: number) => {
                    let tabProps = {
                        key: index,
                        name: tab.name,
                        to: tab.to,
                        isIndex: tab.isIndex || false,
                    };

                    return (
                        <Tab { ...tabProps } />
                    )
                }) }
            </div>
        )
    }
}




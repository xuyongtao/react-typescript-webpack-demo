import './tabs-bar.less';

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




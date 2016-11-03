import './tabs-bar.less';

import * as React from "react";
import { render } from "react-dom";

import Tab from './tab';
import { numberMap } from '../../common/config';

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

    static PropTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        currentTab: React.PropTypes.number.isRequired,
        clickHandler: React.PropTypes.func,
    }

    render() {
        return (
            <div className="pannels">
                <ul className={ "tabs tabs-" + numberMap[this.props.tabs.length]}>
                    { this.props.tabs.map((tab: TabBasic, index: number) => {
                        return (
                            <Tab key={ index } name={ tab.name } index={ index } isActived={ this.props.currentTab === index } clickHandler={ this.props.clickHandler }/>
                        )
                    }) }
                </ul>
            </div>
        )
    }
}




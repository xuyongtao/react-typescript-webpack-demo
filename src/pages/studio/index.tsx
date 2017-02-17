import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { browserHistory, Link } from 'react-router';

import Promise from "thenfail";
import * as classNames from "classnames";

import NavBar from "../../components/nav-bar";
import BasicInfo from "../../components/basic-info";
import Index from "./index/index";
import Intro from "./intro/index";
import Courses from "./courses/index";
import Teachers from "./teachers/index";
import Photos from "./photos/index";

import { getBasicInfo } from "../../js/store/index";
import { Role, defaultAvatar } from "../../js/common/config";
import { BasicInfo as StudioBasicInfo } from "../../js/interface/common";

interface TabBasic {
    isIndex?: boolean;
    to?: string;
    name: string;
    tabStyle?: any;
}

interface TabsBarProps {
    currentTabIndex: number;
    tabs: TabBasic[];
    onClick(index: number): void;
}

class TabsBar extends React.Component<TabsBarProps, any> {
    constructor(props: TabsBarProps, context: any) {
        super(props, context);
    }

    static PropTypes = {
        tabs: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        onClick: React.PropTypes.func,
    }

    render() {
        return (
            <div className={ `tabs tabs-${this.props.tabs.length}` }>
                {
                    this.props.tabs.map((tab: TabBasic, index: number) => {
                        return (
                            <Link
                                key={ index }
                                className={ classNames({
                                    active: index === this.props.currentTabIndex
                                }) }
                                onClick={ this.props.onClick.bind(this, index) }
                                >{ tab.name }</Link>
                        )
                    })
                }
            </div>
        )
    }
}

interface StudioIndexProps {
    params: {
        sid: string;
    }
}

interface StudioIndexState {
    studio?: {
        id?: number;
        role?: number;
        name?: string;
        avatar?: string;
        selfIntro?: string;
    },
    currentTabIndex?: number;
}

export default class StudioIndex extends React.Component<StudioIndexProps, StudioIndexState> {
    constructor(props: StudioIndexProps, context: StudioIndexState) {
        super(props, context);

        this.state = {
            studio: {
                id: Number(this.props.params.sid),
                role: Role.studio,
                name: "未设置机构名称",
                avatar: defaultAvatar,
                selfIntro: "未设置机构简介",
            },
            currentTabIndex: 0,
        }
    }

    private studioInfo: StudioBasicInfo = {};

    componentDidMount() {
        // 获取机构基本信息请求

        getBasicInfo(Number(this.props.params.sid), Role.studio)
            .then(res => {
                this.setState({
                    studio: {
                        id: res.id,
                        role: res.role,
                        name: res.name,
                        avatar: res.avatar,
                        selfIntro: res.selfIntro,
                    }
                });
            })
    }

    handleTabClick(currentTabIndex: number) {
        this.setState({ currentTabIndex })
    }

    render() {
        let { studio, currentTabIndex } = this.state;
        const sid = this.props.params.sid;
        const navBarProps = {
            pageTitle: "机构主页",
            pathToJump: `/studio/${sid}`,
        }
        const tabsBarProps = {
            tabs: [
                {
                    name: "主页",
                    to: `/studio/${sid}`,
                    isIndex: true
                }, {
                    name: "课程",
                    to: `/studio/${sid}/courses`
                }, {
                    name: "老师",
                    to: `/studio/${sid}/teachers`
                }, {
                    name: "相册",
                    to: `/studio/${sid}/photos`
                }, {
                    name: "介绍",
                    to: `/studio/${sid}/intro`
                },
            ],
            onClick: this.handleTabClick.bind(this),
            currentTabIndex,
        };

        return (
            <div>
                <NavBar { ...navBarProps } />
                <div className="studio-basic-info">
                    <BasicInfo { ...studio } />
                </div>
                <TabsBar { ...tabsBarProps } />
                { currentTabIndex === 0 ? <Index params={ { sid } } /> : null }
                { currentTabIndex === 1 ? <Courses params={ { sid } } /> : null }
                { currentTabIndex === 2 ? <Teachers params={ { sid } } /> : null }
                { currentTabIndex === 3 ? <Photos params={ { sid } } /> : null }
                { currentTabIndex === 4 ? <Intro params={ { sid } } /> : null }
            </div>
        )
    }
}
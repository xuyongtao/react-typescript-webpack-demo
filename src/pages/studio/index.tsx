import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { browserHistory, Link } from 'react-router';

import Promise from "thenfail";
import * as classNames from "classnames";

import NavBar from "../../components/nav-bar";
import BasicInfo from "../../components/basic-info";
import Index, { StudioIndexDataBasic } from "./index/index";
import Intro from "./intro/index";
import Courses, { StudioCoursesDataBasic } from "./courses/index";
import Teachers, { StudioTeachersDataBasic } from "./teachers/index";
import Photos, { StudioPhotosDataBasic } from "./photos/index";

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

    static propTypes = {
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
    studioIndexData?: StudioIndexDataBasic;
    studioCoursesData?: StudioCoursesDataBasic;
    studioTeachersData?: StudioTeachersDataBasic;
    studioPhotosData?: StudioPhotosDataBasic;
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
            studioCoursesData: null,
            studioTeachersData: null,
            studioPhotosData: null,
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
        this.setState({ currentTabIndex });
    }

    handleSaveStudioIndexData(studioIndexData: StudioIndexDataBasic) {
        this.setState({ studioIndexData });
    }

    handleSaveStudioCoursesData(studioCoursesData: StudioCoursesDataBasic) {
        this.setState({ studioCoursesData });
    }

    handleSaveStudioTeachersData(studioTeachersData: StudioTeachersDataBasic) {
        this.setState({ studioTeachersData });
    }

    handleSaveStudioPhotosData(studioPhotosData: StudioPhotosDataBasic) {
        this.setState({ studioPhotosData });
    }

    render() {
        let { studio, currentTabIndex, studioIndexData, studioCoursesData, studioTeachersData, studioPhotosData } = this.state;
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
        let indexComponentProps = {
            params: { sid },
            initData: studioIndexData,
            handleSaveStudioIndexData: this.handleSaveStudioIndexData.bind(this),
        };
        let coursesComponentProps = {
            params: { sid },
            initData: studioCoursesData,
            handleSaveStudioCoursesData: this.handleSaveStudioCoursesData.bind(this),
        };
        let teachersComponentProps = {
            params: { sid },
            initData: studioTeachersData,
            handleSaveStudioTeachersData: this.handleSaveStudioTeachersData.bind(this),
        };
        let photosComponentProps = {
            params: { sid },
            initData: studioPhotosData,
            handleSaveStudioPhotosData: this.handleSaveStudioPhotosData.bind(this),
        };
        let introComponentProps = {
            params: { sid },
            initIntro: studioIndexData ? studioIndexData.intro : '',
        };

        return (
            <div>
                <NavBar { ...navBarProps } />
                <div className="studio-basic-info">
                    <BasicInfo { ...studio } />
                </div>
                <TabsBar { ...tabsBarProps } />
                { currentTabIndex === 0 ? <Index { ...indexComponentProps } /> : null }
                { currentTabIndex === 1 ? <Courses { ...coursesComponentProps } /> : null }
                { currentTabIndex === 2 ? <Teachers { ...teachersComponentProps } /> : null }
                { currentTabIndex === 3 ? <Photos { ...photosComponentProps } /> : null }
                { currentTabIndex === 4 ? <Intro { ...introComponentProps } /> : null }
            </div>
        )
    }
}
import "./index.less";

import * as React from "react";
import { Link } from "react-router";
import { render } from "react-dom";
import * as Lodash from "lodash";
import * as classNames from "classnames";

import NavBar from "../../components/nav-bar";
import BasicInfo from "../../components/basic-info";
import Intro from "./intro/index";
import Courses from "./courses/index";
import Photos from "./photos/index";
import { Role } from "../../js/common/config";

import { getBasicInfo } from "../../js/store/index";
import { ReceiveBasicInfoPost } from "../../js/interface/common";

interface TeacherIndexProps {
    params: {
        tid: number;
    }
}

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

interface TeacherIndexState {
    currentTabIndex?: number,
    teacher?: {
        id: number,
        role: number,
        name: string,
        avatar: string,
        selfIntro: string,
        teachingAge: number,
        certified: boolean,
    }
}

export default class TeacherIndex extends React.Component<any, TeacherIndexState> {
    constructor(props: any, context: TeacherIndexState) {
        super(props, context);

        this.state = {
            currentTabIndex: 0,
            teacher: {
                id: 0,
                role: Role.teacher,
                name: "",
                avatar: "",
                selfIntro: "",
                teachingAge: 1,
                certified: false,
            }
        }
    }

    componentDidMount() {
        getBasicInfo(this.props.params.tid, Role.teacher)
            .then(res => {
                this.setState({
                    teacher: {
                        id: res.id,
                        role: Role.teacher,
                        name: res.name,
                        avatar: res.avatar,
                        selfIntro: res.selfIntro,
                        teachingAge: res.teachingAge,
                        certified: res.certified,
                    }
                })
            })
    }

    handleTabClick(currentTabIndex: number) {
        this.setState({ currentTabIndex });
    }

    render() {
        let tid = this.props.params.tid;
        let { teacher, currentTabIndex } = this.state;

        let tabsBarProps = {
            tabs: [
                {
                    name: "简介",
                    to: `/teacher/${tid}/`,
                    isIndex: true
                }, {
                    name: "课程",
                    to: `/teacher/${tid}/courses`
                }, {
                    name: "相册",
                    to: `/teacher/${tid}/photos`
                }
            ],
            onClick: this.handleTabClick.bind(this),
            currentTabIndex,
        }


        return (
            <div>
                <NavBar pageTitle="老师主页" />
                <BasicInfo { ...teacher } />
                <TabsBar { ...tabsBarProps } />
                { currentTabIndex === 0 ? <Intro params={ { tid } } /> : null }
                { currentTabIndex === 1 ? <Courses params={ { tid } } /> : null }
                { currentTabIndex === 2 ? <Photos params={ { tid } } /> : null }
            </div>
        )
    }
}
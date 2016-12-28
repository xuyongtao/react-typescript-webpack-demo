import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { browserHistory } from 'react-router';

import Promise from "thenfail";

import NavBar from "../../components/nav-bar";
import TabsBar from "../../components/tabs-bar";
import BasicInfo from "../../components/basic-info";

import { getBasicInfo } from "../../js/store/index";
import { Role, defaultAvatar } from "../../js/common/config";
import { BasicInfo as StudioBasicInfo } from "../../js/interface/common";

interface StudioIndexProps {
    params: {
        sid: string;
    }
}

interface StudioIndexState {
    id?: number;
    role?: number;
    name?: string;
    avatar?: string;
    selfIntro?: string;
}

export default class StudioIndex extends React.Component<StudioIndexProps, StudioIndexState> {
    constructor(props: StudioIndexProps, context: StudioIndexState) {
        super(props, context);

        this.state = {
            id: Number(this.props.params.sid),
            role: Role.studio,
            name: "未设置机构名称",
            avatar: defaultAvatar,
            selfIntro: "未设置机构简介",
        }
    }

    private studioInfo: StudioBasicInfo = {};

    componentDidMount() {
        // 获取机构基本信息请求

        getBasicInfo(Number(this.props.params.sid), Role.studio)
            .then(res => {
                this.setState({
                    id: res.id,
                    role: res.role,
                    name: res.name,
                    avatar: res.avatar,
                    selfIntro: res.selfIntro,
                });
            })
    }

    render() {
        const sid: number = Number(this.props.params.sid);
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
        };

        return (
            <div>
                <NavBar { ...navBarProps } />
                <div className="studio-basic-info">
                    <BasicInfo { ...this.state } />
                </div>
                <TabsBar { ...tabsBarProps } />
                { this.props.children }
            </div>
        )
    }
}
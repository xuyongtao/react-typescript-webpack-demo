import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import NavBar from "../../components/nav-bar";
import TabsBar from "../../components/tabs-bar";
import BasicInfo from "../../components/basic-info";
import { Role } from "../../../common/config";

export default class StudioIndex extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        let sid: number = this.props.params.sid;

        let tabsBarProps = {
            tabs: [
                {
                    name: "主页",
                    to: `/studio/${sid}/`,
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
        }
        let studioProps = {
            id: 2,
            role: Role.studio,
            avatar: "",
            name: "机构1",
            selfIntro: "机构1简介机构1简介机构1简介机构1简介机构1简介机构1简介机构1简介",
        }

        return (
            <div>
                <NavBar pageTitle="机构主页" />
                <BasicInfo { ...studioProps } />
                <TabsBar { ...tabsBarProps } />
                { this.props.children }
            </div>
        )
    }
}
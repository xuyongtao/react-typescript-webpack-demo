import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as Lodash from "lodash";

import NavBar from "../../components/nav-bar";
import TabsBar from "../../components/tabs-bar";
import BasicInfo from "../../components/basic-info";
import { Role } from "../../../common/config";

export default class TeacherIndex extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            currentTab: 0
        }


    }

    switchHandler(tabIndex: number) {
        this.setState({
            currentTab: tabIndex,
        })


    }

    componentDidMount() {
        console.log(this.props.params);
    }

    render() {
        let tid: number = this.props.params.tid;

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
        }

        let teacherProps = {
            id: 2,
            role: Role.studio,
            avatar: "",
            name: "老师1",
            selfIntro: "老师1简介老师1简介老师1简介老师1简介老师1简介老师1简介老师1简介",
        }

        return (
            <div>
                <NavBar pageTitle="老师主页" />
                <BasicInfo { ...teacherProps } />
                <TabsBar { ...tabsBarProps } />
                { this.props.children }
            </div>
        )
    }
}
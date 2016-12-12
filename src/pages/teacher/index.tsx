require("./index.less");

import * as React from "react";
import { render } from "react-dom";
import * as Lodash from "lodash";

import NavBar from "../../components/nav-bar";
import TabsBar from "../../components/tabs-bar";
import BasicInfo from "../../components/basic-info";
import { Role } from "../../js/common/config";

import { getBasicInfo } from "../../js/store/index";
import { ReceiveBasicInfoPost } from "../../js/interface/common";

interface TeacherIndexProps {
    params: {
        tid: number;
    }
}

export default class TeacherIndex extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
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

        return (
            <div>
                <NavBar pageTitle="老师主页" />
                <BasicInfo { ...this.state.teacher } />
                <TabsBar { ...tabsBarProps } />
                { this.props.children }
            </div>
        )
    }
}
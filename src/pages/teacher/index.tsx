import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import NavBar from "../../components/nav-bar";
import TabsBar from "../../components/tabs-bar";
import BasicInfo from "../../components/teacher/basic-info";
import TeacherIntro from "./intro/index";
import TeacherCourses from "./courses/index";
import TeacherPhotos from "./photos/index";

import { teacherRouters } from "../../../common/routers";

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
            tabs: teacherRouters,
            currentTab: this.state.currentTab,
            clickHandler: this.switchHandler.bind(this),
        }

        return (
            <div>
                <NavBar pageTitle="老师主页" />
                <BasicInfo tid={ tid } />
                <TabsBar { ...tabsBarProps } />
                <TeacherIntro tid={ tid } hidden={ this.state.currentTab !== 0 } />
                <TeacherCourses tid={ tid } hidden={ this.state.currentTab !== 1 } />
                <TeacherPhotos tid={ tid } hidden={ this.state.currentTab !== 2 } />
            </div>
        )
    }
}
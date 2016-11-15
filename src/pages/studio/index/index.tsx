import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

import Course from "../../../components/course/index";
import BasicInfo from "../../../components/basic-info/index";
import IntroPanel from "../intro/index";
import { Role } from "../../../js/common/config";

interface IntroProps {
    params: {
        sid: number;
    }
}

export default class Intro extends React.Component<IntroProps, any> {
    constructor(props: IntroProps) {
        super(props);
    }

    render() {
        const courses = [{
            cid: 1,
            title: "课程1",
            cover: "",
            detail: "课程详情1课程详情1课程详情1课程详情1课程详情1",
        }, {
                cid: 2,
                title: "课程2",
                cover: "",
                detail: "课程详情2课程详情2课程详情2课程详情2课程详情2",
            }];

        const teachers = [{
            tid: 1,
            name: "yota1",
            selfIntro: "自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介",
            teachingAge: 4,
            avatar: "",
        }, {
                tid: 2,
                name: "yota2",
                selfIntro: "自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介",
                teachingAge: 4,
                avatar: "",
            }];

        return (
            <div className="studio-index-page">
                <div className="hot-courses">
                    <div className="title">
                        <h2>热门课程</h2>
                        <Link className="link-more" to={ `/studio/${this.props.params.sid}/courses` }>更多</Link>
                    </div>
                    <ul className="course-list">
                        { courses.map((course, index) => {
                            let courseProps = {
                                cid: course.cid,
                                title: course.title,
                                cover: course.cover,
                                detail: course.detail,
                            }
                            return (
                                <Course key={ index } { ...courseProps } />
                            )
                        }) }
                    </ul>
                </div>
                <div className="hot-teachers">
                    <div className="title">
                        <h2>热门老师</h2>
                        <Link className="link-more" to={ `/studio/${this.props.params.sid}/teachers` }>更多</Link>
                    </div>
                    <ul className="teacher-list">
                        { teachers.map((teacher, index) => {
                            let teacherProps = {
                                id: teacher.tid,
                                role: Role.teacher,
                                avatar: teacher.avatar,
                                name: teacher.name,
                                teachingAge: teacher.teachingAge,
                                selfIntro: teacher.selfIntro,
                            }

                            return (
                                <BasicInfo key={ index } { ...teacherProps } />
                            )
                        }) }
                    </ul>
                </div>
                <div className="intro">
                    <div className="title">
                        <h2>机构介绍</h2>
                        <Link className="link-more" to={ `/studio/${this.props.params.sid}/intro` }>更多</Link>
                    </div>
                    <div className="intro-cont">
                        全民教育致力于打造人人乐用的学习服务平台，聚焦本土优质师资，通过更高效、更智能、更精准地匹配师生资源，为老师及学生提供全而专的教育信息和增值服务，通过移动互联网，全力创建一个专业、高效、智能、安全的高品质教育信息平台，让教与学变得更便捷、平等、高效。
                    </div>
                </div>
            </div>
        )
    }
}
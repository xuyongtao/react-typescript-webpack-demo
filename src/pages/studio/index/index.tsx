import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

import Course from "../../../components/course/index";
import BasicInfo from "../../../components/basic-info/index";
import Carousel from "../../../components/carousel/index";
import EmptyList from "../../../components/empty-list/index";
import IntroPanel from "../intro/index";
import { Role } from "../../../js/common/config";

import { getStudioIndexPageInfo } from "../../../js/store/index";
import { ReceiveIndexPageInfoPost } from "../../../js/interface/studio";

interface IndexPageProps {
    params: {
        sid: number;
    }
}

interface IndexPageState extends ReceiveIndexPageInfoPost {

}

export default class IndexPage extends React.Component<IndexPageProps, IndexPageState> {
    constructor(props: IndexPageProps) {
        super(props);

        this.state = {
            banners: [],
            courses: [],
            teachers: [],
            intro: "",
        }
    }

    componentDidMount() {
        getStudioIndexPageInfo(this.props.params.sid)
            .then(res => {
                this.setState({
                    banners: res.banners,
                    courses: res.courses,
                    teachers: res.teachers,
                    intro: res.intro,
                })
            })
    }

    render() {
        const { courses, teachers, intro, banners } = this.state;

        const CarouselProps = {
            pics: banners,
        };

        if (!banners.length && !courses.length && !teachers.length && !intro) {
            return (
                <EmptyList tip="该机构暂未完善信息" />
            )
        } else {
            return (
                <div className="studio-index-page">

                    { banners.length ?
                        <Carousel { ...CarouselProps } /> :
                        null
                    }


                    { courses.length ?
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
                                        <li key={ index }>
                                            <Course { ...courseProps } />
                                        </li>
                                    )
                                }) }
                            </ul>
                        </div> :
                        null
                    }

                    { teachers.length ?
                        <div className="hot-teachers">
                            <div className="title">
                                <h2>热门老师</h2>
                                <Link className="link-more" to={ `/studio/${this.props.params.sid}/teachers` }>更多</Link>
                            </div>
                            <ul className="teacher-list">
                                { teachers.map((teacher, index) => {
                                    let teacherProps = {
                                        id: teacher.id,
                                        role: Role.teacher,
                                        avatar: teacher.avatar,
                                        name: teacher.name,
                                        teachingAge: teacher.teachingAge,
                                        selfIntro: teacher.selfIntro,
                                    }

                                    return (
                                        <li key={ index }>
                                            <BasicInfo { ...teacherProps } />
                                        </li>
                                    )
                                }) }
                            </ul>
                        </div> :
                        null
                    }

                    { intro ?
                        <div className="intro">
                            <div className="title">
                                <h2>机构介绍</h2>
                            </div>
                            <div className="intro-cont">
                                { intro }
                            </div>
                        </div> :
                        null
                    }


                </div>
            )
        }

    }
}
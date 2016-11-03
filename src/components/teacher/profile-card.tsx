import './profile-card.less';

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

import { defaultAvatar } from "../../../common/config";
// interface
import { HotTeacherBasic } from "../../../common/teacher";

interface ProfileBasic {
    avatar?: string,
    name: string,
    selfIntro?: string,
    certified: boolean,
    starCount: number,
    viewedCount: number,
    teachingAge: number,
}
interface CourseBasic {
    cid: number,
    name: string,
    type?: string,
    floorPrice?: number,
}

class Course extends React.Component<any, any> {
    constructor(props: CourseBasic, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="course">
                <span className="type">课程类型: { this.props.type }</span>
                <span className="other">
                    { this.props.name }
                    <strong>￥{ this.props.floorPrice }</strong>起/课时
                </span>
            </div>
        )
    }
}

class CourseList extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="course-list">
                { this.props.courses.map((course: CourseBasic, index: number) => {
                    return (
                        <Course key={ course.cid } { ...course } />
                    )
                }) }
            </div>
        )
    }
}

export default class ProfileCard extends React.Component<any, any> {
    constructor(props: HotTeacherBasic, context: any) {
        super(props, context);
    }

    static defaultProps = {
        avatar: defaultAvatar,
    };

    static PropTypes = {
        tid: React.PropTypes.number.isRequired,
        avatar: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        selfIntro: React.PropTypes.string,
        courses: React.PropTypes.arrayOf(React.PropTypes.object)
    }

    render() {
        return (
            <Link className="profile-card" to={ '/teacher/' + this.props.tid }>
                <div className="profile">
                    <img className="avatar" src={ this.props.avatar } alt={ this.props.name }/>
                    <div className="detail">
                        <div>
                            <strong>{ this.props.name }</strong>
                            { this.props.teachingAge ? <span className="label-teaching-age">{ this.props.teachingAge }年教龄</span> : null }
                            { this.props.certified ? <span className="label-certified">机构认证</span> : null }
                        </div>
                        <p className="intro">{ this.props.selfIntro }</p>
                        <div className="counts">
                            <span><i className="iconfont iconstar"></i>{ this.props.starCount }</span>
                            <span><i className="iconfont iconviewed"></i>{ this.props.viewedCount }</span>
                        </div>
                    </div>
                </div>
                { this.props.courses && this.props.courses.length ? <CourseList courses={ this.props.courses } /> : null }
            </Link>
        )
    }
}


import './index.less';

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";
import UserLabel from "../user-label";

import { defaultAvatar, Role } from "../../js/common/config";
// interface
import { RecommendBasic } from "../../js/interface/common";

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
    static propTypes = {
        cid: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        floorPrice: React.PropTypes.number,
    }
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

interface CourseListProps {
    courses?: CourseBasic[],
}
class CourseList extends React.Component<CourseListProps, any> {
    static propTypes = {
        courses: React.PropTypes.array,
    }
    constructor(props: CourseListProps, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="course-list">
                { this.props.courses.map((course, index) => {
                    return (
                        <Course key={ course.cid } { ...course } />
                    )
                }) }
            </div>
        )
    }
}

interface ProfileCardProps extends RecommendBasic {

}
export default class ProfileCard extends React.Component<ProfileCardProps, any> {
    static defaultProps = {
        avatar: defaultAvatar,
    }

    static PropTypes = {
        id: React.PropTypes.number.isRequired,
        role: React.PropTypes.number.isRequired,
        avatar: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        selfIntro: React.PropTypes.string,
        starCount: React.PropTypes.number,
        viewedCount: React.PropTypes.number,
        teachingAge: React.PropTypes.number,
        certified: React.PropTypes.bool,
        courses: React.PropTypes.arrayOf(React.PropTypes.object)
    }
    constructor(props: ProfileCardProps, context: any) {
        super(props, context);
    }

    render() {
        return (
            <Link className="profile-card" to={ `${this.props.role === Role.teacher ? "/teacher/" : "/studio/"}` + this.props.id }>
                <div className="profile">
                    <img className="avatar" src={ this.props.avatar } alt={ this.props.name }/>
                    <div className="detail">
                        <div>
                            <strong>{ this.props.name }</strong>
                            { this.props.teachingAge ? <UserLabel classname="label-teaching-age" label={ this.props.teachingAge + '年教龄' } /> : null }
                            { this.props.certified ? <UserLabel classname="label-certified" label="机构认证" /> : null }
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


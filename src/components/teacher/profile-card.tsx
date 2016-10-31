import './profile-card.less';

import * as React from "react";
import { render } from "react-dom";

import { defaultAvatar } from "../../../common/config";

// interface
import { RecommendTeacherBasic } from "../../../common/teacher";

interface ProfileBasic {
    avatar?: string,
    name: string,
    selfIntro?: string,
}

interface CourseBasic {
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
                    <Course { ...course } />
                }) }
            </div>
        )
    }
}

export default class ProfileCard extends React.Component<any, any> {
    constructor(props: RecommendTeacherBasic, context: any) {
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
            <div className="profile-card">
                <div className="profile">
                    <img src={ this.props.avatar } alt={ this.props.name }/>
                    <div>
                        <strong>{ this.props.name }</strong><i></i>
                        <p>{ this.props.selfIntro }</p>
                    </div>
                </div>

                { this.props.courses && this.props.courses.length ? <CourseList courses={ this.props.courses } /> : null }

            </div>
        )
    }
}


import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";
import UserLabel from "../user-label";

import { defaultAvatar, Role, PriceUnitId, PriceUnitMap } from "../../js/common/config";
// interface
import { RecommendListBasic } from "../../js/interface/common";

interface ProfileBasic {
    avatar?: string;
    name: string;
    selfIntro?: string;
    certified: boolean;
    starCount: number;
    viewedCount: number;
    teachingAge: number;
}
interface CourseBasic {
    cid: number;
    name: string;
    type?: string;
    floorPrice?: number | string;
    priceUnit?: number;
}

class Course extends React.Component<CourseBasic, any> {
    static propTypes = {
        cid: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        type: React.PropTypes.string,
        floorPrice: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        priceUnit: React.PropTypes.number,
    }
    constructor(props: CourseBasic, context: any) {
        super(props, context);
    }

    render() {
        const { name, type, floorPrice, priceUnit } = this.props;

        return (
            <div className="course">
                {
                    typeof floorPrice === "number" ?
                        <span className="price"><strong>￥{ floorPrice }</strong>起/{ PriceUnitMap[priceUnit] || PriceUnitMap[PriceUnitId.hour]}</span> :
                        <span className="price">{ floorPrice }</span>
                }
                <span className="type">课程类型: { type }</span>
                <span className="name">{ name }</span>
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

interface ProfileCardProps extends RecommendListBasic {

}
export default class ProfileCard extends React.Component<ProfileCardProps, any> {
    static defaultProps = {
        avatarUrl: defaultAvatar,
    }

    static propTypes = {
        id: React.PropTypes.number.isRequired,
        role: React.PropTypes.number.isRequired,
        avatarUrl: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        selfIntro: React.PropTypes.string,
        favCount: React.PropTypes.number,
        viewedCount: React.PropTypes.number,
        teachingAge: React.PropTypes.number,
        certified: React.PropTypes.bool,
        courses: React.PropTypes.arrayOf(React.PropTypes.object)
    }
    constructor(props: ProfileCardProps, context: any) {
        super(props, context);
    }

    render() {
        const { id, role, name, avatarUrl, teachingAge, certified, selfIntro, favCount, viewedCount, courses } = this.props;

        return (
            <Link className="profile-card" to={ `${role === Role.teacher ? "/teacher/" : "/studio/"}` + id }>
                <div className="profile">
                    <img className="avatar" src={ avatarUrl } alt={ name }/>
                    <div className="detail">
                        <div>
                            { teachingAge ? <UserLabel classname="label-teaching-age" label={ teachingAge + '年教龄' } /> : null }
                            { certified ? <UserLabel classname="label-certified" label="机构认证" /> : null }
                            <strong>{ name }</strong>
                        </div>
                        <p className="intro">{ selfIntro || "暂未完善个人简介（找老师上全民教育网）" }</p>
                        <div className="counts">
                            { favCount ? <span><i className="iconfont iconstar"></i>{ favCount }</span> : null }
                            { viewedCount ? <span><i className="iconfont iconviewed"></i>{ viewedCount }</span> : null }
                        </div>
                    </div>
                </div>
                { courses && courses.length ? <CourseList courses={ courses } /> : null }
            </Link>
        )
    }
}
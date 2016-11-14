import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import { CourseBasic } from "../../../common/teacher";
import Course from "../course/index";


interface CourseListProps {
    courses: CourseBasic[];
    currentPage: number;
    totalPage: number;
    loadingMore: boolean;
    loadMore?(): void;
}

export default class CourseList extends React.Component<CourseListProps, any> {
    static propTypes = {
        courses: React.PropTypes.array.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        totalPage: React.PropTypes.number.isRequired,
        loadingMore: React.PropTypes.bool.isRequired,
        loadMore: React.PropTypes.func.isRequired,
    }

    constructor(props: CourseListProps, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <ul className="course-list">
                    { this.props.courses.map((course: CourseBasic, index: number) => {
                        return (
                            <Course key={ course.cid } {...course} />
                        )
                    }) }
                </ul>
                { this.props.currentPage == this.props.totalPage ? <div className="end-line">全部课程都在这里了呢</div> : (this.props.loadingMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.props.loadMore }>点击加载更多</div>) }
            </div>
        )
    }

}
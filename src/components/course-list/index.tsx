import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import { CourseBasic } from "../../js/interface/teacher";
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
        const { courses, currentPage, totalPage, loadingMore, loadMore } = this.props;

        return (
            <div>
                <ul className="course-list">
                    { courses.map((course: CourseBasic, index: number) => {
                        return (
                            <Course key={ course.cid } {...course } />
                        )
                    }) }
                </ul>
                { currentPage == totalPage ? <div className="end-line">全部课程都在这里了呢</div> : (loadingMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ loadMore }>点击加载更多</div>) }
            </div>
        )
    }

}
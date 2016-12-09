import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import { CourseBasic } from "../../js/interface/common";
import Course from "../course/index";


interface CourseListProps {
    wrapperClassName?: string;
    courses: CourseBasic[];
    currentPage: number;
    totalPage: number;
    loadMore: boolean;
    handlerLoadMore?(): void;
}

export default class CourseList extends React.Component<CourseListProps, any> {
    static propTypes = {
        wrapperClassName: React.PropTypes.string,
        courses: React.PropTypes.array.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        totalPage: React.PropTypes.number.isRequired,
        loadMore: React.PropTypes.bool.isRequired,
        handlerLoadMore: React.PropTypes.func.isRequired,
    }

    constructor(props: CourseListProps, context: any) {
        super(props, context);
    }

    render() {
        const { courses, currentPage, totalPage, loadMore, handlerLoadMore, wrapperClassName } = this.props;

        return (
            <div className={ wrapperClassName }>
                { this.props.children }
                <ul className="course-list">
                    { courses.map((course: CourseBasic, index: number) => {
                        return (
                            <li key={ course.cid }>
                                <Course {...course } />
                            </li>
                        )
                    }) }
                </ul>
                { currentPage == totalPage ? <div className="end-line">全部课程都在这里了呢</div> : (loadMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ handlerLoadMore }>点击加载更多</div>) }
            </div>
        )
    }

}
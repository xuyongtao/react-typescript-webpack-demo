import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Link } from "react-router";

// store
import { getTeacherCourses } from "../../../../store/teacher";
// interface
import {
    TeacherResBasic,
    CoursesResBasic,
    CourseBasic
} from '../../../../common/teacher';

class Course extends React.Component<any, any> {
    constructor(props: CourseBasic, context: any) {
        super(props, context);
    }

    render() {
        return (
            <li>
                <Link to={ `/course/${this.props.cid}` }>
                    <img src={ this.props.cover } alt={ this.props.title }/>
                    <div>
                        <strong>{ this.props.title }</strong>
                        <p>{ this.props.detail }</p>
                    </div>
                </Link>
            </li>
        )
    }
}

class CourseList extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div hidden={ this.props.hidden }>
                <ul id="course-list">
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

export default class TeacherCourses extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            loadingMore: false,
            courses: [],
            currentPage: 0,
            totalPage: 1,
        }
    }

    loadMore() {
        console.log('loading more...');

        this.setState({
            loadingMore: true,
        })

        getTeacherCourses(this.props.tid, this.state.currentPage + 1)
            .then(res => {
                let data: CoursesResBasic = res;

                this.setState({
                    loadingMore: false,
                    courses: this.state.courses.concat(data.courses),
                    currentPage: data.page,
                    totalPage: data.totalPage,
                })
            }, () => {
                this.setState({
                    loadingMore: false,
                })
            })
    }

    componentDidMount() {

        if (!this.state.courses.length) {
            this.setState({
                loadingMore: true,
            })

            getTeacherCourses(this.props.tid)
                .then(res => {
                    let data: CoursesResBasic = res;

                    this.setState({
                        loadingMore: false,
                        courses: data.courses,
                        currentPage: data.page,
                        totalPage: data.totalPage,
                    })
                }, () => {
                    this.setState({
                        loadingMore: false,
                    })
                })
        }
    }

    render() {
        console.log('构建课程列表');
        let props = {
            hidden: this.props.hidden,
            courses: this.state.courses,
            currentPage: this.state.currentPage,
            totalPage: this.state.totalPage,
            loadMore: this.loadMore.bind(this),
        }

        return (
            <CourseList { ...props } />
        )
    }
}


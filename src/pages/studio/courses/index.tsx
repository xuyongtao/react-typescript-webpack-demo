import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Link } from "react-router";

import CourseList from "../../../components/course-list/index";
// store
import { getTeacherCourses } from "../../../js/store/index";
// interface
import { CoursesResBasic } from "../../../js/interface/common";

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
            loadingMore: this.state.loadingMore,
            loadMore: this.loadMore.bind(this),
        }

        return (
            <CourseList { ...props } />
        )
    }
}


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
import { CoursesResBasic, CourseBasic } from "../../../js/interface/teacher";

interface TeacherCoursesProps {
    params: {
        tid: number;
        [key: string]: any;
    }
}

interface TeacherCoursesState {
    loadingMore?: boolean;
    courses?: CourseBasic[];
    currentPage?: number;
    totalPage?: number;
}

export default class TeacherCourses extends React.Component<TeacherCoursesProps, TeacherCoursesState> {
    constructor(props: TeacherCoursesProps, context: TeacherCoursesState) {
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

        getTeacherCourses(this.props.params.tid, this.state.currentPage + 1)
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
        console.log(this.props.params.tid);
        if (!this.state.courses.length) {
            this.setState({
                loadingMore: true,
            })

            getTeacherCourses(this.props.params.tid)
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
        const { courses, currentPage, totalPage, loadingMore } = this.state;

        let props = {
            courses,
            currentPage,
            totalPage,
            loadingMore,
            loadMore: this.loadMore.bind(this),
        }

        return (
            <CourseList { ...props } />
        )
    }
}


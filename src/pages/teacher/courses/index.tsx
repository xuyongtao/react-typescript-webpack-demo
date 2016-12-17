import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Link } from "react-router";

import CourseList from "../../../components/course-list/index";
import LoadingToast from "../../../components/toast/index";
import EmptyList from "../../../components/empty-list/index";
import { Role } from "../../../js/common/config";
// store
import { getCourseList } from "../../../js/store/index";
// interface
import { ReceiveCourseListPost, CourseBasic } from "../../../js/interface/common";

interface TeacherCourseListProps {
    params: {
        tid: string;
        [key: string]: any;
    }
}

interface TeacherCourseListState {
    loading?: boolean;
    loadMore?: boolean;
    courses?: CourseBasic[];
    currentPage?: number;
    totalPage?: number;
}

export default class TeacherCourseList extends React.Component<TeacherCourseListProps, TeacherCourseListState> {
    constructor(props: TeacherCourseListProps, context: TeacherCourseListState) {
        super(props, context);
        this.state = {
            loading: false,
            loadMore: false,
            courses: [],
            currentPage: 0,
            totalPage: 1,
        }
    }

    handlerLoadMore() {
        console.log('loading more...');

        this.setState({
            loadMore: true,
        })

        getCourseList({
            id: Number(this.props.params.tid),
            role: Role.teacher,
            page: this.state.currentPage + 1,
        })
            .then(res => {
                let data: ReceiveCourseListPost = res;

                this.setState({
                    loadMore: false,
                    courses: this.state.courses.concat(data.courses),
                    currentPage: data.page,
                    totalPage: Math.ceil(data.total / data.perPage),
                })
            }, () => {
                this.setState({
                    loadMore: false,
                })
            })
    }

    componentDidMount() {
        console.log(this.props.params.tid);
        if (!this.state.courses.length) {
            this.setState({
                loading: true,
            })

            getCourseList({
                id: Number(this.props.params.tid),
                role: Role.teacher,
                page: this.state.currentPage + 1,
            })
                .then(res => {
                    let data: ReceiveCourseListPost = res;

                    this.setState({
                        loading: false,
                        courses: data.courses,
                        currentPage: data.page,
                        totalPage: Math.ceil(data.total / data.perPage),
                    })
                }, () => {
                    this.setState({
                        loading: false,
                    })
                })
        }
    }

    render() {
        const { currentPage, totalPage, loading, loadMore, courses } = this.state;
        const props = {
            courses,
            currentPage,
            totalPage,
            loadMore,
            handlerLoadMore: this.handlerLoadMore.bind(this),
        };
        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: this.state.loading || this.state.loadMore,
        };

        if (loading) {
            return (
                <LoadingToast { ...loadingToastProps } />
            )
        } else {
            return (
                <div>
                    <LoadingToast { ...loadingToastProps } />
                    {
                        courses.length ?
                            <CourseList { ...props } /> :
                            <EmptyList tip="该老师暂无课程信息" />
                    }
                </div>
            )
        }
    }
}


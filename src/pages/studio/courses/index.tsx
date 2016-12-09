import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Link } from "react-router";

import CourseList from "../../../components/course-list/index";
import LoadingToast from "../../../components/toast/index";
import EmptyList from "../../../components/empty-list/index";
// store
import { getCourseList } from "../../../js/store/index";
// interface
import { CourseBasic, ReceiveCourseListPost } from "../../../js/interface/common";
import { Role } from "../../../js/common/config";

interface StudioCourseListProps {
    params: {
        sid: string;
        [key: string]: any;
    }
}

interface StudioCourseListState {
    loading?: boolean;
    loadMore?: boolean;
    courses?: CourseBasic[];
    currentPage?: number;
    totalPage?: number;
}

export default class StudioCourseList extends React.Component<StudioCourseListProps, StudioCourseListState> {
    constructor(props: StudioCourseListProps, context: StudioCourseListState) {
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
            id: Number(this.props.params.sid),
            role: Role.studio,
            page: this.state.currentPage + 1,
        })
            .then(res => {
                let data: ReceiveCourseListPost = res;

                this.setState({
                    loadMore: false,
                    courses: this.state.courses.concat(data.courses),
                    currentPage: data.page,
                    totalPage: data.total,
                })
            }, () => {
                this.setState({
                    loadMore: false,
                })
            })
    }

    componentDidMount() {

        if (!this.state.courses.length) {
            this.setState({
                loading: true,
            })

            getCourseList({
                id: Number(this.props.params.sid),
                role: Role.studio,
                page: this.state.currentPage + 1,
            })
                .then(res => {
                    let data: ReceiveCourseListPost = res;

                    this.setState({
                        loading: false,
                        courses: data.courses,
                        currentPage: data.page,
                        totalPage: data.total,
                    })
                }, () => {
                    this.setState({
                        loading: false,
                    })
                })
        }
    }

    render() {
        console.log('构建课程列表');
        const { currentPage, totalPage, loading, loadMore, courses } = this.state;

        if (courses.length) {
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

            return (
                <CourseList { ...props } >
                    <LoadingToast { ...loadingToastProps } />
                </CourseList>
            )
        } else {
            return (
                <EmptyList tip="该机构暂无课程信息" />
            )
        }
    }
}


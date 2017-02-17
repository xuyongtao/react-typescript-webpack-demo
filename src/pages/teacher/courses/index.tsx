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
    };
    initData?: TeacherCoursesDataBasic;
    handleSaveTeacherCoursesData?: (data: TeacherCoursesDataBasic) => void;
}

export interface TeacherCoursesDataBasic {
    courses?: CourseBasic[];
    currentPage?: number;
    totalPage?: number;
}

interface TeacherCourseListState {
    loading?: boolean;
    loadMore?: boolean;
    data?: TeacherCoursesDataBasic;
}

export default class TeacherCourseList extends React.Component<TeacherCourseListProps, TeacherCourseListState> {
    constructor(props: TeacherCourseListProps, context: TeacherCourseListState) {
        super(props, context);
        this.state = {
            loading: false,
            loadMore: false,
            data: {
                courses: [],
                currentPage: 0,
                totalPage: 1,
            }
        }
    }

    static propTypes = {
        initData: React.PropTypes.object,
        handleSaveTeacherCoursesData: React.PropTypes.func,
    }

    handleGetCourseList() {
        return getCourseList({
            id: Number(this.props.params.tid),
            role: Role.teacher,
            page: this.state.data.currentPage + 1,
        })
            .then(res => {
                let resData: ReceiveCourseListPost = res;
                let data = {
                    courses: this.state.data.courses.concat(resData.courses),
                    currentPage: resData.page,
                    totalPage: Math.ceil(resData.total / resData.perPage),
                };

                this.setState({ data });

                this.props.handleSaveTeacherCoursesData && this.props.handleSaveTeacherCoursesData(data);
            })
    }

    handleLoadMore() {
        this.setState({
            loadMore: true,
        })

        this
            .handleGetCourseList()
            .handle(() => {
                this.setState({
                    loadMore: false,
                })
            })
    }

    componentDidMount() {
        if (this.props.initData) {
            this.setState({
                data: this.props.initData,
            });
        } else {
            if (!this.state.data.courses.length) {
                this.setState({
                    loading: true,
                })

                this
                    .handleGetCourseList()
                    .handle(() => {
                        this.setState({
                            loading: false,
                        })
                    })
            }
        }
    }

    render() {
        const { loading, loadMore } = this.state;
        const { currentPage, totalPage, courses } = this.state.data;
        const props = {
            courses,
            currentPage,
            totalPage,
            loadMore,
            handlerLoadMore: this.handleLoadMore.bind(this),
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


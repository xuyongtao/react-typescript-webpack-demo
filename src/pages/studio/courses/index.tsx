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
    },
    initData?: StudioCoursesDataBasic;
    handleSaveStudioCoursesData?: (data: StudioCoursesDataBasic) => void;
}

export interface StudioCoursesDataBasic {
    courses?: CourseBasic[];
    currentPage?: number;
    totalPage?: number;
}

interface StudioCourseListState {
    loading?: boolean;
    loadMore?: boolean;
    data?: StudioCoursesDataBasic;
}

export default class StudioCourseList extends React.Component<StudioCourseListProps, StudioCourseListState> {
    constructor(props: StudioCourseListProps, context: StudioCourseListState) {
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
        handleSaveStudioCoursesData: React.PropTypes.func,
    }

    handleGetCourseList() {
        return getCourseList({
            id: Number(this.props.params.sid),
            role: Role.studio,
            page: this.state.data.currentPage + 1,
        })
            .then(res => {
                let resData: ReceiveCourseListPost = res;
                let data: StudioCoursesDataBasic = {
                    courses: this.state.data.courses.concat(resData.courses),
                    currentPage: resData.page,
                    totalPage: Math.ceil(resData.total / resData.perPage),
                };

                this.setState({ data });

                this.props.handleSaveStudioCoursesData && this.props.handleSaveStudioCoursesData(data);
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
            })
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
                            <EmptyList tip="该机构暂无课程信息" />
                    }
                </div>
            )
        }

    }
}


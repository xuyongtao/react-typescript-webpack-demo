import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import BasicInfo from "../../../components/basic-info/index";
import LoadingToast from "../../../components/toast/index";
import EmptyList from "../../../components/empty-list/index";

import { Role } from "../../../js/common/config";
import { getStudioTeacherList } from "../../../js/store/index";

import { BasicInfo as BasicInfoInterface } from "../../../js/interface/common";
import { ReceiveTeacherListPost } from "../../../js/interface/studio";
interface StudioTeacherListListProps {
    params: {
        sid: string;
        [key: string]: any;
    }
}

interface StudioTeacherListState {
    loading?: boolean;
    loadMore?: boolean;
    teachers?: BasicInfoInterface[];
    currentPage?: number;
    totalPage?: number;
}

export default class StudioTeacherList extends React.Component<StudioTeacherListListProps, StudioTeacherListState> {
    constructor(props: StudioTeacherListListProps, context: StudioTeacherListState) {
        super(props, context);

        this.state = {
            loading: false,
            loadMore: false,
            teachers: [],
            currentPage: 0,
            totalPage: 1,
        }
    }

    private perPage = 8;

    handlerLoadMore() {
        this.setState({
            loadMore: true,
        })

        getStudioTeacherList({
            id: Number(this.props.params.sid),
            role: Role.studio,
            page: this.state.currentPage + 1,
            perPage: this.perPage,
        })
            .then(res => {
                let data: ReceiveTeacherListPost = res;

                this.setState({
                    loadMore: false,
                    teachers: this.state.teachers.concat(data.teachers),
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

        if (!this.state.teachers.length) {
            this.setState({
                loading: true,
            })

            getStudioTeacherList({
                id: Number(this.props.params.sid),
                role: Role.studio,
                page: this.state.currentPage + 1,
                perPage: this.perPage,
            })
                .then(res => {
                    let data: ReceiveTeacherListPost = res;

                    this.setState({
                        loading: false,
                        teachers: data.teachers,
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
        const { currentPage, totalPage, loading, loadMore, teachers } = this.state;
        const props = {
            teachers,
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
                        teachers.length ?
                            <div className="studio-teachers-page">

                                <ul className="teacher-list">
                                    { teachers.map((teacher, index) => {
                                        let teacherProps = {
                                            id: teacher.id,
                                            role: Role.teacher,
                                            avatar: teacher.avatar,
                                            name: teacher.name,
                                            teachingAge: teacher.teachingAge,
                                            selfIntro: teacher.selfIntro,
                                        }

                                        return (
                                            <li key={ index }>
                                                <BasicInfo { ...teacherProps } />
                                            </li>
                                        )
                                    }) }
                                </ul>
                                { currentPage == totalPage ? <div className="end-line">全部老师都在这里了</div> : (loadMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.handlerLoadMore.bind(this) }>点击加载更多</div>) }
                            </div> :
                            <EmptyList tip="该机构暂无老师" />
                    }
                </div>
            )
        }
    }
}
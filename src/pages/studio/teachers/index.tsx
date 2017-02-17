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

interface StudioTeacherListProps {
    params: {
        sid: string;
        [key: string]: any;
    },
    initData?: StudioTeachersDataBasic;
    handleSaveStudioTeachersData?: (data: StudioTeachersDataBasic) => void;
}

export interface StudioTeachersDataBasic {
    teachers?: BasicInfoInterface[];
    currentPage?: number;
    totalPage?: number;
}

interface StudioTeacherListState {
    loading?: boolean;
    loadMore?: boolean;
    data?: StudioTeachersDataBasic;
}

export default class StudioTeacherList extends React.Component<StudioTeacherListProps, StudioTeacherListState> {
    constructor(props: StudioTeacherListProps, context: StudioTeacherListState) {
        super(props, context);

        this.state = {
            loading: false,
            loadMore: false,
            data: {
                teachers: [],
                currentPage: 0,
                totalPage: 1,
            }
        }
    }

    static propTypes = {
        initData: React.PropTypes.object,
        handleSaveStudioTeachersData: React.PropTypes.func,
    }

    private perPage = 8;

    handleGetStudioTeacherList() {
        return getStudioTeacherList({
            id: Number(this.props.params.sid),
            role: Role.studio,
            page: this.state.data.currentPage + 1,
            perPage: this.perPage,
        })
            .then(res => {
                let resData: ReceiveTeacherListPost = res;
                let data: StudioTeachersDataBasic = {
                    teachers: this.state.data.teachers.concat(resData.teachers),
                    currentPage: resData.page,
                    totalPage: Math.ceil(resData.total / resData.perPage),
                };

                this.setState({ data });

                this.props.handleSaveStudioTeachersData && this.props.handleSaveStudioTeachersData(data);
            })
    }

    handleLoadMore() {
        this.setState({
            loadMore: true,
        })

        this
            .handleGetStudioTeacherList()
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
            if (!this.state.data.teachers.length) {
                this.setState({
                    loading: true,
                })

                this
                    .handleGetStudioTeacherList()
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
        const { currentPage, totalPage, teachers } = this.state.data;
        const props = {
            teachers,
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
                                { currentPage == totalPage ? <div className="end-line">全部老师都在这里了</div> : (loadMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.handleLoadMore.bind(this) }>点击加载更多</div>) }
                            </div> :
                            <EmptyList tip="该机构暂无老师" />
                    }
                </div>
            )
        }
    }
}
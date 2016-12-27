import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as Swipeable from "react-swipeable";

import LoadingToast from "../../../components/toast/index";
import EmptyList from "../../../components/empty-list/index";
import ProfileCard from "../../../components/profile-card/index";
import Notification from "../../../components/notification";
import BackToTop from "../../../components/back-to-top";

import { getHotList } from "../../../js/store/index";
import { RecommendListBasic, ReceiveHotListPost } from '../../../js/interface/common';

interface HotPannelState {
    loading?: boolean;
    loadingMore?: boolean;
    list?: RecommendListBasic[];
    currentPage?: number;
    totalPage?: number;
    showBackToTop?: boolean;
}
export default class HotPannel extends React.Component<any, HotPannelState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loading: false,
            loadingMore: false,
            list: [],
            currentPage: 0,
            totalPage: 1,
            showBackToTop: false,
        }

    }

    loadMore() {
        this.setState({
            loadingMore: true,
        })

        getHotList(this.state.currentPage + 1)
            .then(data => {
                if (data.list && data.list.length) {
                    this.setState({
                        list: this.state.list.concat(data.list),
                        currentPage: data.page,
                        totalPage: Math.ceil(data.total / data.perPage),
                    })
                }
            })
            .handle(() => {
                this.setState({
                    loadingMore: false
                })
            })
            .fail((error: Error) => {
                Notification.info({
                    content: error.message || "请求数据失败",
                });
            })
    }

    handlerSwipedUp() {
        if (document.body.scrollTop > window.screen.height) {
            this.setState({
                showBackToTop: true,
            })
        }

        if (this.state.currentPage >= this.state.totalPage) return;
        if (this.state.loadingMore) return;
        if (document.body.scrollTop < document.body.clientHeight - window.screen.height * 2) return;

        this.loadMore();
    }

    handlerSwipedDown() {
        if (document.body.scrollTop < window.screen.height) {
            this.setState({
                showBackToTop: false,
            })
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        getHotList()
            .then(data => {
                this.setState({
                    loading: false,
                    list: data.list,
                    totalPage: Math.ceil(data.total / data.perPage),
                    currentPage: data.page,
                })
            })
            .handle(() => {
                this.setState({
                    loading: false,
                })
            })
            .fail((error: Error) => {
                Notification.info({
                    content: error.message || "请求数据失败",
                });
            })
    }

    render() {
        const { loading, list, currentPage, totalPage, loadingMore, showBackToTop } = this.state;
        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: loading,
        };
        const backToTopProps = {
            showed: showBackToTop,
            handlerBackToTop: () => {
                this.setState({
                    showBackToTop: false,
                })
            }
        };

        if (loading) {
            return (
                <LoadingToast { ...loadingToastProps }/>
            )
        } else {
            return (
                <div>
                    <Swipeable
                        onSwipedUp={ this.handlerSwipedUp.bind(this) }
                        preventDefaultTouchmoveEvent={ false }
                        stopPropagation={ true }
                        >
                        {
                            list.length ?
                                <div className="hot-list">
                                    { list.map((teacher, index) => {
                                        return (
                                            <ProfileCard { ...teacher } key={ index } />
                                        )
                                    }) }
                                    { currentPage == totalPage ? <div className="end-line">贤师都被你一览无余了</div> : (loadingMore ? <div className="load-more"><i className="iconfont iconloading"></i>正在加载...</div> : null) }
                                </div> :
                                <EmptyList tip="暂无热门的机构和老师" />
                        }
                    </Swipeable>
                    <BackToTop { ...backToTopProps } />
                </div>
            )
        }
    }
}



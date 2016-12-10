import './index.less';

import * as React from "react";
import { render } from "react-dom";

import LoadingToast from "../../../components/toast/index";
import EmptyList from "../../../components/empty-list/index";
import ProfileCard from "../../../components/profile-card/index";

import { getRecommendList } from "../../../js/store/index";
import { RecommendListBasic } from '../../../js/interface/common';

interface RecommendPannelState {
    loading?: boolean;
    loadingMore?: boolean;
    list?: RecommendListBasic[];
    currentPage?: number;
    totalPage?: number;
}
export default class RecommendPannel extends React.Component<any, RecommendPannelState> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loading: false,
            loadingMore: false,
            list: [],
            currentPage: 0,
            totalPage: 1,
        }

    }

    loadMore() {
        this.setState({
            loadingMore: true,
        })

        getRecommendList(this.state.currentPage + 1)
            .then(data => {
                if (data.list && data.list.length) {
                    this.setState({
                        list: this.state.list.concat(data.list),
                        currentPage: data.page,
                        totalPage: data.totalPage,
                    })
                }

                this.setState({
                    loadingMore: false
                })
            }, () => {
                this.setState({
                    loadingMore: false
                })
            })

    }

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        getRecommendList()
            .then(data => {
                this.setState({
                    loading: false,
                    list: data.list,
                    totalPage: data.totalPage,
                    currentPage: data.page,
                })
            }, () => {
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        const { loading, loadingMore, list, currentPage, totalPage } = this.state;
        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: this.state.loading || this.state.loadingMore,
        };

        if (loading) {
            return (
                <LoadingToast { ...loadingToastProps }/>
            )
        } else {
            return (
                <div>
                    <LoadingToast { ...loadingToastProps }/>

                    {
                        list.length ?
                            <div className="recommend-list">

                                { list.map((teacher, index) => {
                                    return (
                                        <ProfileCard { ...teacher } key={ index } />
                                    )
                                }) }
                                { currentPage == totalPage ? <div className="end-line">贤师都被你一览无余了</div> : (loadingMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.loadMore.bind(this) }>点击加载更多</div>) }
                            </div> :
                            <EmptyList tip="暂无推荐的机构和老师" />
                    }
                </div>
            )
        }
    }
}



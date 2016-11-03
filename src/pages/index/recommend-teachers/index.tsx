import './index.less';

import * as React from "react";
import { render } from "react-dom";

import ProfileCard from "../../../components/teacher/profile-card";
import { getRecommendTeachers } from "../../../../store/teacher";
import { RecommendTeacherBasic } from '../../../../common/teacher';

export default class RecommendTeachersPannel extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loadingMore: false,
            teachers: [],
            currentPage: 0,
            totalPage: 1,
        }

    }

    loadMore() {
        this.setState({
            loadingMore: true,
        })

        getRecommendTeachers(this.state.currentPage + 1)
            .then(data => {
                if (data.teachers && data.teachers.length) {
                    this.setState({
                        teachers: this.state.teachers.concat(data.teachers),
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

    componentDidMount() {
        this.setState({
            loadingMore: true,
        })

        getRecommendTeachers()
            .then(data => {
                this.setState({
                    loadingMore: false,
                    teachers: data.teachers,
                    totalPage: data.totalPage,
                    currentPage: data.page,
                })
            }, () => {
                this.setState({
                    loadingMore: false,
                })
            })
    }

    render() {
        return (
            <div hidden={ this.props.hidden } id="recommend-pannel">
                <div className="list">
                    { this.state.teachers.map((teacher: RecommendTeacherBasic, index: number) => {
                        return (
                            <ProfileCard { ...teacher } key={ teacher.tid} />
                        )
                    }) }
                </div>
                { this.state.currentPage == this.state.totalPage ? <div className="end-line">贤师都被你一览无余了</div> : (this.state.loadingMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.loadMore.bind(this) }>点击加载更多</div>) }
            </div>
        )
    }
}



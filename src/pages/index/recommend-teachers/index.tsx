import "./index.less";
import * as React from "react";
import { render } from "react-dom";

// components
import TabsBar from "../../../components/tabs-bar";
import ProfileCard from "../../../components/teacher/profile-card";
// store
import { getRecommendTeachers } from "../../../../store/teacher";
// interface
import { RecommendTeacherBasic } from '../../../../common/teacher';
// common
import { indexRouters } from "../../../../common/routers";

export default class RecommendTeachers extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            loadingMore: false,
            teachers: [],
            page: {
                index: 0,
                total: 1
            }
        }

    }

    loadMore() {
        this.setState({
            loadingMore: true,
        })

        getRecommendTeachers(this.state.page.index + 1)
            .then(data => {
                if (data.teachers && data.teachers.length) {
                    this.setState({
                        teachers: this.state.teachers.concat(data.teachers),
                        page: {
                            index: data.page,
                            total: data.totalPage,
                        }
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
        var _this = this;

        this.setState({
            loadingMore: true,
        })

        getRecommendTeachers(1)
            .then(data => {
                _this.setState({
                    loadingMore: false,
                    teachers: data.teachers,
                    page: {
                        index: data.page,
                        total: data.totalPage,
                    }
                })
            }, () => {
                _this.setState({
                    loadingMore: false,
                })
            })



    }

    render() {
        return (
            <div>
                <TabsBar tabs={ indexRouters } />
                <div id="recommend-pannel">
                    <div className="list">
                        { this.state.teachers.map((teacher: RecommendTeacherBasic, index: number) => {
                            return (
                                <ProfileCard { ...teacher } key={ teacher.tid} />
                            )
                        }) }
                    </div>
                    { this.state.page.index == this.state.page.total ? <div className="end-line">贤师都被你一览无余了</div> : (this.state.loadingMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.loadMore.bind(this) }>点击加载更多</div>) }
                </div>
            </div> 
        )
    }
}


import "./index.less";

import * as Lodash from "lodash";
import * as React from "react";
import { render } from "react-dom";

// components
import TabsBar from "../../components/tabs-bar";
import ProfileCard from "../../components/teacher/profile-card";
// store
import { getRecommendTeachers } from "../../../store/teacher";
// interface
import { RecommendTeacherBasic, HotTeacherBasic } from '../../../common/teacher';
// common
import { indexRouters } from "../../../common/routers";

export default class AppIndx extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            teachers: {
                recommend: {
                    loadingMore: false,
                    page: {
                        current: 0,
                        total: 1,
                    },
                    data: [],
                },
                hot: {
                    loadingMore: false,
                    page: {
                        current: 0,
                        total: 1,
                    },
                    data: [],
                }
            },
            currentTab: 0,
        }
    }

    switchHandler(tabIndex: number) {
        this.setState(() => {
            return Lodash.defaultsDeep({
                currentTab: tabIndex
            }, this.state)
        })


    }

    loadMoreRecommendTeachers() {
        this.setState(() => {
            return Lodash.defaultsDeep({
                teachers: {
                    recommend: {
                        loadingMore: true,
                    }
                }
            }, this.state)
        })


        getRecommendTeachers(this.state.teachers.recommend.page.current + 1)
            .then(data => {
                if (data.teachers && data.teachers.length) {
                    this.setState(() => {
                        return Lodash.defaultsDeep({
                            teachers: {
                                recommend: {
                                    data: this.state.teachers.recommend.data.concat(data.teachers),
                                    page: {
                                        current: data.page,
                                        total: data.totalPage,
                                    }
                                }
                            }

                        }, this.state)
                    })
                }

                this.setState(() => {
                    return Lodash.defaultsDeep({
                        teachers: {
                            recommend: {
                                loadingMore: false,
                            }
                        }
                    }, this.state)
                })
            }, () => {
                this.setState(() => {
                    return Lodash.defaultsDeep({
                        teachers: {
                            recommend: {
                                loadingMore: false,
                            }
                        }
                    }, this.state)
                })
            })

    }

    componentDidMount() {

        var _this = this;

        _this.setState(() => {
            return Lodash.defaultsDeep({
                teachers: {
                    recommend: {
                        loadingMore: true,
                    }
                }
            }, _this.state);
        })


        getRecommendTeachers()
            .then(data => {
                _this.setState(() => {
                    return Lodash.defaultsDeep({
                        teachers: {
                            recommend: {
                                data: _this.state.teachers.recommend.data.concat(data.teachers),
                                page: {
                                    current: data.page,
                                    total: data.totalPage,
                                },
                                loadingMore: false,
                            }
                        }
                    }, _this.state)
                })

            }, () => {
                _this.setState(() => {
                    return Lodash.defaultsDeep({
                        teachers: {
                            recommend: {
                                loadingMore: false,
                            }
                        }
                    }, _this.state)
                })
            })
    }

    render() {
        return (
            <div>
                <TabsBar tabs={ indexRouters } currentTab={ this.state.currentTab } clickHandler={ this.switchHandler.bind(this) } />
                <div hidden={ this.state.currentTab !== 0 } id="recommend-pannel">
                    <div className="list">
                        { this.state.teachers.recommend.data.map((teacher: RecommendTeacherBasic, index: number) => {
                            return (
                                <ProfileCard { ...teacher } key={ teacher.tid} />
                            )
                        }) }
                    </div>
                    { this.state.teachers.recommend.page.current == this.state.teachers.recommend.page.total ? <div className="end-line">贤师都被你一览无余了</div> : (this.state.teachers.recommend.loadingMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.loadMoreRecommendTeachers.bind(this) }>点击加载更多</div>) }
                </div>
                <div hidden={ this.state.currentTab !== 1} id="hot-pannel">
                    <div className="list">
                        { this.state.teachers.hot.data.map((teacher: HotTeacherBasic, index: number) => {
                            return (
                                <ProfileCard { ...teacher } key={ teacher.tid} />
                            )
                        }) }
                    </div>
                    { this.state.teachers.hot.page.current == this.state.teachers.hot.page.total ? <div className="end-line">贤师都被你一览无余了</div> : (this.state.teachers.hot.loadingMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.loadMoreRecommendTeachers.bind(this) }>点击加载更多</div>) }
                </div>
            </div>
        )
    }
}


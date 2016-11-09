import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import NarBar from "../../../components/nav-bar";
import Loading from "../../../components/loading/index";

interface CourseDetailProps {

}
interface CourseDetailStates {
    loading?: boolean;
    title?: string;
    detail?: string;
    cover?: string;
    onlinePrice?: number;
    indoorPrice?: number;
    outdoorPrice?: number;
    otherPrice?: number;
}

export default class CourseDetail extends React.Component<CourseDetailProps, CourseDetailStates> {
    constructor(props: CourseDetailProps, context: CourseDetailStates) {
        super(props, context);

        this.state = {
            loading: true,
            title: "钢琴一对一私教",
            detail: "钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教",
            cover: require("../../../img/default-course-cover.png"),
            onlinePrice: 120,
            indoorPrice: 120,
            outdoorPrice: 120,
            otherPrice: 120,
        }
    }

    clickHandler() {
        alert("电话线还没有连上呢！");
    }

    componentDidMount() {
        // 请求course数据
        this.setState({
            loading: false,
        })
    }

    render() {
        return (
            <div id="course-detail-page">
                <NarBar pageTitle="课程详情" />
                {
                    this.state.loading ?
                        <Loading /> :
                        <div>
                            <div className="course-cover">
                                <img src={ this.state.cover } alt={ this.state.title }/>
                            </div>
                            <div className="course-info">
                                <h2>{ this.state.title }</h2>
                                <div>{ this.state.detail }</div>
                            </div>
                            <div className="course-prices">
                                <h2>课程价格</h2>
                                <ul>
                                    <li>在线教学 <strong>￥{ this.state.onlinePrice }</strong>/课时</li>
                                    <li>老师上门 <strong>￥{ this.state.indoorPrice }</strong>/课时</li>
                                    <li>地点协商 <strong>￥{ this.state.otherPrice }</strong>/课时</li>
                                    <li>学生上门 <strong>￥{ this.state.outdoorPrice }</strong>/课时</li>
                                </ul>
                            </div>
                            <div className="btn-phone">
                                <span onClick={ this.clickHandler.bind(this) }>立即联系老师</span>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
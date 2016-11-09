import "./index.less";

import * as Lodash from "lodash";
import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";
import { catEntrances } from "../../../common/config";

// components
import TabsBar from "../../components/tabs-bar";
import ProfileCard from "../../components/teacher/profile-card";
import RecommendTeachersPannel from "./recommend-teachers/index";
import HotTeachersPannel from "./hot-teachers/index";

// store
import { getHotTeachers } from "../../../store/teacher";
// common
import { indexRouters } from "../../../common/routers";

interface AppIndxState {
    keyword?: string;
}

export default class AppIndx extends React.Component<any, AppIndxState> {
    constructor(props: any, context: AppIndxState) {
        super(props, context);

        this.state = {
            keyword: "",
        }
    }

    inputHandler() {
        const inputNode: any = this.refs["input"]

        this.setState({
            keyword: inputNode.value.trim()
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <div id="banner">
                    <header>
                        <Link to="/">
                            <img src={ require("../../img/logo.png") } alt="全民教育网" className="logo"/>
                        </Link>
                    </header>
                    <img src={ require("../../img/banner.png") } alt="找老师上全民教育" className="banner"/>
                </div>
                <div id="search-bar">
                    <input ref="input" onInput={ this.inputHandler.bind(this) } type="text" placeholder="请输入想学的科目" />
                    <Link className="btn-search iconfont" to={ `/search?keyword=${this.state.keyword}` }></Link>
                </div>
                <div id="entrances">
                    { catEntrances.map((entrance, index) => {
                        return (
                            <Link key={ index } to={ `/search/${entrance.cid}` }><i className={ `icon icon-${entrance.className}` }></i> { entrance.name }</Link>
                        )
                    }) }
                </div>
                <TabsBar tabs={ indexRouters } />
                { this.props.children }
            </div>
        )
    }
}


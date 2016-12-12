require("./index.less");

import * as Lodash from "lodash";
import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

import TabsBar from "../../components/tabs-bar";
import { catEntrances, indexRouters } from "../../js/common/config";

class Banner extends React.Component<any, any> {
    render() {
        return (
            <div id="banner">
                <header>
                    <Link to="/">
                        <img src={ require("../../img/logo.png") } alt="全民教育网" className="logo"/>
                    </Link>
                </header>
                <img src={ require("../../img/banner.png") } alt="找老师上全民教育" className="banner"/>
            </div>
        )
    }
}

interface SearchBarProps {
    keyword?: string;
    onInput(keyword: string): void;
}
class SearchBar extends React.Component<SearchBarProps, any> {
    static propTypes = {
        onInput: React.PropTypes.func.isRequired,
    }
    constructor(props: SearchBarProps) {
        super(props);
    }

    onInput() {
        this.props.onInput((this.refs["input"] as any).value.trim());
    }

    render() {
        return (
            <div id="search-bar">
                <input ref="input" onInput={ this.onInput.bind(this) } type="text" placeholder="请输入想学的科目" />
                <Link className="btn-search iconfont" to={ `/search?keyword=${this.props.keyword}` }></Link>
            </div>
        )
    }
}

interface CatEntrancesProps {
    catEntrances: {
        name: string;
        className: string;
        cid: number;
    }[]
}
class CatEntrances extends React.Component<CatEntrancesProps, any> {
    static propTypes = {
        catEntrances: React.PropTypes.array.isRequired,
    }

    render() {
        return (
            <div id="entrances">
                { this.props.catEntrances.map((entrance, index) => {
                    return (
                        <Link key={ index } to={ `/search/${entrance.cid}` }><i className={ `icon icon-${entrance.className}` }></i> { entrance.name }</Link>
                    )
                }) }
            </div>
        )
    }
}

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

    onInput(keyword: string) {
        this.setState({ keyword });
    }

    componentDidMount() {

    }

    render() {
        let searchBarProps = {
            keyword: this.state.keyword,
            onInput: this.onInput.bind(this),
        }
        let tabsBarProps = {
            tabs: indexRouters,
        }
        let catEntrancesProps = { catEntrances }

        return (
            <div>
                <Banner />
                <SearchBar { ...searchBarProps } />
                <CatEntrances { ...catEntrancesProps } />
                <TabsBar { ...tabsBarProps } />
                { this.props.children }
            </div>
        )
    }
}


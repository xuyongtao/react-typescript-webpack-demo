import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import * as classNames from "classnames";
import * as Lodash from "lodash";


class CourseFilter extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div></div>
        )
    }
}


interface FilterBarProps {
    onShow(): void;
}
interface FilterBarState {
    showFilter?: boolean;
    orderByFavAsc?: boolean;
    orderByViewAsc?: boolean;
}

export default class FilterBar extends React.Component<FilterBarProps, FilterBarState> {
    constructor(props: FilterBarProps, context: FilterBarState) {
        super(props, context);

        this.state = {
            orderByFavAsc: false,
            orderByViewAsc: false,
        };
    }

    static defaultProps = {

    }

    onOrderByFav() {
        this.setState({
            orderByFavAsc: !this.state.orderByFavAsc,
            orderByViewAsc: false,
        })


        alert("根据收藏排序");
    }

    onOrderByView() {
        this.setState({
            orderByFavAsc: false,
            orderByViewAsc: !this.state.orderByViewAsc,
        })
        alert("根据查看排序");
    }

    onShowSyntheticalFilter() {
        this.props.onShow();
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="filter-bar">
                <div><span className={classNames({
                    up: false,
                }) }>吉他</span></div>
                <div onClick={ this.onOrderByFav.bind(this) }><span className={classNames({
                    up: this.state.orderByFavAsc,
                }) }>收藏</span></div>
                <div onClick={ this.onOrderByView.bind(this) }><span className={classNames({
                    up: this.state.orderByViewAsc,
                }) }>查看</span></div>
                <div onClick={ this.onShowSyntheticalFilter.bind(this) }><span className={classNames({
                    active: true
                }) }>筛选</span></div>
            </div>

        )
        // { this.state.showFilter ? <SyntheticalFilter { ...filterProps } /> : null }
    }
}
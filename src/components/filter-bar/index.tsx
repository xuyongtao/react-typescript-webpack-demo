import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import * as classNames from "classnames";
import * as Lodash from "lodash";

interface CatBasic {
    label: string;
    id: number | string;
}

interface FilterBarProps {
    showCatsFilter: boolean;
    onShowSyntheticalFilter(show: boolean): void;
    onShowCatsFilter(show: boolean): void;
    onCloseAllFilter(): void;
    currentCat: CatBasic[];
    currentFilterOptions: number[];
    orderByFavAscActive: boolean;
    orderByViewAscActive: boolean;
    onOrderByFavAscActive(active: boolean): void;
    onOrderByViewAscActive(active: boolean): void;
}
interface FilterBarState {
    orderByFavAsc?: boolean;
    orderByViewAsc?: boolean;
    showCatsFilter?: boolean;
    showSyntheticalFilter?: boolean;
}

export default class FilterBar extends React.Component<FilterBarProps, FilterBarState> {
    static propTypes = {
        showCatsFilter: React.PropTypes.bool.isRequired,
        currentCat: React.PropTypes.array,
        onShowCatsFilter: React.PropTypes.func,
        onShowSyntheticalFilter: React.PropTypes.func,
        onCloseAllFilter: React.PropTypes.func,
    }
    static defaultProps = {
        currentCat: new Array(3),
    }
    constructor(props: FilterBarProps, context: FilterBarState) {
        super(props, context);

        this.state = {
            orderByFavAsc: this.props.orderByFavAscActive,
            orderByViewAsc: this.props.orderByViewAscActive,
            showCatsFilter: false,
            showSyntheticalFilter: false,
        };
    }

    onOrderByFav() {
        this.setState({
            orderByFavAsc: !this.state.orderByFavAsc,
            orderByViewAsc: false,
            showCatsFilter: false,
            showSyntheticalFilter: false,
        })
        this.props.onOrderByFavAscActive(!this.state.orderByFavAsc);
        this.props.onCloseAllFilter && this.props.onCloseAllFilter();

        console.log("根据收藏排序");
    }

    onOrderByView() {
        this.setState({
            orderByFavAsc: false,
            orderByViewAsc: !this.state.orderByViewAsc,
            showCatsFilter: false,
            showSyntheticalFilter: false,
        })
        this.props.onOrderByViewAscActive(!this.state.orderByViewAsc);
        this.props.onCloseAllFilter && this.props.onCloseAllFilter();

        console.log("根据查看排序");
    }

    onShowSyntheticalFilter() {
        if (this.props.onShowSyntheticalFilter) {
            this.props.onShowSyntheticalFilter(!(this.props.showCatsFilter && this.state.showSyntheticalFilter));
        } else {
            console.log("外部父组件 没有传递对应的 点击筛选标签 的函数");
        }
        this.setState({
            showCatsFilter: false,
            showSyntheticalFilter: !(this.props.showCatsFilter && this.state.showSyntheticalFilter),
        })
    }

    onClickCatLabel() {
        if (this.props.onShowCatsFilter) {
            this.props.onShowCatsFilter(!(this.props.showCatsFilter && this.state.showCatsFilter));
        } else {
            console.log("外部父组件 没有传递对应的 点击科目标签 的函数");
        }

        this.setState({
            showSyntheticalFilter: false,
            showCatsFilter: !(this.props.showCatsFilter && this.state.showCatsFilter),
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="filter-bar">
                <div onClick={ this.onClickCatLabel.bind(this) }><span className={classNames({
                    up: this.props.showCatsFilter && this.state.showCatsFilter,
                }) }>{ this.props.currentCat[this.props.currentCat.length - 1] ? this.props.currentCat[this.props.currentCat.length - 1].label : "科目" }</span></div>
                <div onClick={ this.onOrderByFav.bind(this) }><span className={classNames({
                    active: this.props.orderByFavAscActive && this.state.orderByFavAsc,
                }) }>收藏优先</span></div>
                <div onClick={ this.onOrderByView.bind(this) }><span className={classNames({
                    active: this.props.orderByViewAscActive && this.state.orderByViewAsc,
                }) }>查看优先</span></div>
                <div onClick={ this.onShowSyntheticalFilter.bind(this) }><span className={classNames({
                    active: Lodash.some(this.props.currentFilterOptions, (optionId) => {
                        return optionId > 1;
                    }),
                }) }>筛选</span></div>
            </div>
        )
    }
}
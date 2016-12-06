import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import NavBarWithSearch from "../../components/search-bar/index";
import FilterBar from "../../components/filter-bar/index";
import SyntheticalFilter from "../../components/synthetical-filter-pannel/index";
import CatsFilter from "../../components/cats-filter/index";
import FilterMask from "../../components/filter-mask/index";
import ProfileCard from "../../components/profile-card/index";

import { RecommendListBasic } from '../../js/interface/common';
import { search } from "../../js/store/index";
import { syntheticalFilterConditions } from "../../js/common/config";

interface CatBasic {
    label: string;
    id: string;
}
interface CatSingleDataBasic {
    label: string;
    cats?: {
        [key: string]: {
            label: string;
        }
    }
}
interface CatDataBasic {
    [key: string]: {
        label: string;
        cats: {
            [key: string]: {
                label: string;
                cats: {
                    [key: string]: {
                        label: string;
                    }
                }
            }
        }
    }
}
const catsData: CatDataBasic = require("../../js/common/cats.js");

interface NameListProps {
    teachers: RecommendListBasic[];
    currentPage: number;
    totalPage: number;
    handlerLoadMore?(options: any): Promise<void>;
}
interface NameListState {
    loading: boolean;
}
class NameList extends React.Component<NameListProps, NameListState> {
    static propTypes = {
        teachers: React.PropTypes.array.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        totalPage: React.PropTypes.number.isRequired,
        handlerLoadMore: React.PropTypes.func.isRequired,
    }

    constructor(props: NameListProps, context: NameListState) {
        super(props, context);

        this.state = {
            loading: false,
        }
    }

    loadMore() {
        this.setState({
            loading: true,
        })

        this
            .props
            .handlerLoadMore({
                loadMore: true,
            })
            .then(() => {
                this.setState({
                    loading: false,
                })
            });
    }

    render() {
        const { teachers, currentPage, totalPage } = this.props;
        const { loading } = this.state;

        return (
            <div className="name-list">
                { teachers.map((teacher, index) => {
                    return (
                        <ProfileCard { ...teacher } key={ index } />
                    )
                }) }
                { currentPage == totalPage ? <div className="end-line">贤师都被你一览无余了</div> : (loading ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.loadMore.bind(this) }>点击加载更多</div>) }
            </div>
        )
    }
}

interface SearchProps {
    params: {
        cids: string;
    },
    location: {
        query: {
            keyword: string;
        },
        [key: string]: any
    },
    history: any,
}
interface SearchState {
    teachers?: RecommendListBasic[];
    showFilterMask?: boolean;
    showSyntheticalFilter?: boolean;
    showCatsFilter?: boolean;
    currentCat?: CatBasic[];
    currentSyntheticalFilterOptions?: number[];
    orderByFavAscActive?: boolean;
    orderByViewAscActive?: boolean;
    currentPage?: number;
    totalPage?: number;
}

export default class Search extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps, context: SearchState) {
        super(props, context);

        this.state = {
            teachers: [],
            showFilterMask: false,
            showSyntheticalFilter: false,
            showCatsFilter: false,
            currentCat: new Array<CatBasic>(3),
            currentSyntheticalFilterOptions: new Array<number>(4),
            orderByFavAscActive: false,
            orderByViewAscActive: false,
            currentPage: 0,
            totalPage: 0,
        }
    }

    private PageSize = 8;

    onShowSyntheticalFilter(show: boolean) {
        this.setState({
            showFilterMask: true,
            showSyntheticalFilter: show,
            showCatsFilter: false,
        })
    }

    onCloseSyntheticalFilter() {
        this.setState({
            showSyntheticalFilter: false,
        })
    }

    onShowCatsFilter(show: boolean) {
        this.setState({
            showFilterMask: true,
            showSyntheticalFilter: false,
            showCatsFilter: show,
        })
    }

    onCloseCatsFilter() {
        this.setState({
            showCatsFilter: false,
        })
    }

    onCloseAllFilter() {
        this.setState({
            showSyntheticalFilter: false,
            showCatsFilter: false,
        })
    }

    onChooseCat(cat: CatBasic[]) {
        console.log("选择科目为：", cat);
        this.setState({
            currentCat: cat,
            showCatsFilter: false,
            orderByFavAscActive: false,
            orderByViewAscActive: false,
            currentSyntheticalFilterOptions: new Array<number>(4),
        })
        this.getNameList({ cat });
    }

    onConfirmSyntheticalFilterOptions(options: number[]) {
        this.setState({
            showSyntheticalFilter: false,
            currentSyntheticalFilterOptions: options,
        })
        // 请求数据
        this.getNameList({
            cat: this.state.currentCat,
            orderByFavAscActive: this.state.orderByFavAscActive,
            orderByViewAscActive: this.state.orderByViewAscActive,
            syntheticalFilterConditions: options,
        });
    }

    onOrderByFavAscActive(active: boolean) {
        this.setState({
            orderByFavAscActive: active,
        })
        this.getNameList({
            cat: this.state.currentCat,
            orderByFavAscActive: active,
            orderByViewAscActive: false,
            syntheticalFilterConditions: this.state.currentSyntheticalFilterOptions,
        })
    }

    onOrderByViewAscActive(active: boolean) {
        this.setState({
            orderByViewAscActive: active,
        })
        this.getNameList({
            cat: this.state.currentCat,
            orderByFavAscActive: false,
            orderByViewAscActive: active,
            syntheticalFilterConditions: this.state.currentSyntheticalFilterOptions,
        })
    }

    handlerCloseFilterMask({
        key,
        type
    }: {
            key: string;
            type: string;
        }) {
        console.log("动画key: ", key);
        console.log("动画type: ", type);
        type === "leave" && this.setState({ showFilterMask: false });
    }

    handlerFocus() {
        this.onCloseAllFilter();
    }

    getNameList({
        page = this.state.currentPage,
        totalPage = this.state.totalPage,
        cat = this.state.currentCat,
        orderByFavAscActive = this.state.orderByFavAscActive,
        orderByViewAscActive = this.state.orderByViewAscActive,
        syntheticalFilterConditions = this.state.currentSyntheticalFilterOptions,
        loadMore = false,
    }: {
            page?: number;
            totalPage?: number;
            cat?: CatBasic[];
            orderByFavAscActive?: boolean;
            orderByViewAscActive?: boolean;
            syntheticalFilterConditions?: number[];
            loadMore?: boolean;
        }) {
        // 根据给出的条件获取对应的数据

        return search({
            page: page || 1,
            pageSize: this.PageSize,
            catId: cat[cat.length - 1] ? Number(cat[cat.length - 1].id) : 0,
            orderByFavCount: orderByFavAscActive || false,
            orderByViewedCount: orderByViewAscActive || false,
            teachingWay: syntheticalFilterConditions[0] || 0,
            teachingAge: syntheticalFilterConditions[1] || 0,
            role: syntheticalFilterConditions[2] || 0,
        }).then(data => {
            this.setState({
                teachers: loadMore ? this.state.teachers.concat(data.list) : data.list,
                currentPage: data.page,
                totalPage: data.totalPage,
            })
        })
    }

    componentDidMount() {
        let catIds = this.props.params.cids;
        let floorCount = this.state.currentCat.length;
        let currentCat = new Array<CatBasic>(floorCount);
        let floorCat: CatSingleDataBasic;

        catIds && catIds.split("-").map((catId, index) => {
            if (!index) {
                floorCat = catsData[catId];
            } else {
                floorCat = floorCat.cats[catId];
            }
            if (!floorCat) {
                throw new Error(`不存在${catId}对应的${index + 1}级科目，父级科目有：${currentCat.map((cat, index) => {
                    return (index + 1) + "级：" + cat.label;
                }).toString()}`);
            }

            currentCat[index] = {
                id: catId,
                label: floorCat.label,
            }
        })

        this.setState({ currentCat });

        search({
            page: 1,
            pageSize: this.PageSize,
            keyword: this.props.location.query.keyword || "",
        }).then(data => {
            this.setState({
                teachers: data.list,
                currentPage: data.page,
                totalPage: data.totalPage,
            })
        })
    }

    render() {
        const navBarProps = {
            onFocus: this.handlerFocus.bind(this),
            keyword: this.props.location.query.keyword,
        };
        const filterProps = {
            visible: this.state.showSyntheticalFilter,
            onClose: this.onCloseSyntheticalFilter.bind(this),
            conditions: syntheticalFilterConditions,
            currentFilterOptions: this.state.currentSyntheticalFilterOptions,
            onConfirmSyntheticalFilterOptions: this.onConfirmSyntheticalFilterOptions.bind(this),
            handlerAnimEnd: this.handlerCloseFilterMask.bind(this),
        }
        const filterBarProps = {
            orderByFavAscActive: this.state.orderByFavAscActive,
            orderByViewAscActive: this.state.orderByViewAscActive,
            onOrderByFavAscActive: this.onOrderByFavAscActive.bind(this),
            onOrderByViewAscActive: this.onOrderByViewAscActive.bind(this),
            showCatsFilter: this.state.showCatsFilter,
            onShowSyntheticalFilter: this.onShowSyntheticalFilter.bind(this),
            onShowCatsFilter: this.onShowCatsFilter.bind(this),
            onCloseAllFilter: this.onCloseAllFilter.bind(this),
            currentCat: this.state.currentCat,
            currentFilterOptions: this.state.currentSyntheticalFilterOptions,
        }
        const nameListProps = {
            teachers: this.state.teachers,
            currentPage: this.state.currentPage,
            totalPage: this.state.totalPage,
            handlerLoadMore: this.getNameList.bind(this),
        }
        const catsFilterProps = {
            visible: this.state.showCatsFilter,
            initCat: this.state.currentCat,
            onChooseCat: this.onChooseCat.bind(this),
            handlerAnimEnd: this.handlerCloseFilterMask.bind(this),
        }

        return (
            <div>
                <NavBarWithSearch { ...navBarProps } />
                <FilterBar { ...filterBarProps } />
                <SyntheticalFilter { ...filterProps } />
                <CatsFilter { ...catsFilterProps } />
                <NameList { ...nameListProps } />
            </div>
        )
    }
}




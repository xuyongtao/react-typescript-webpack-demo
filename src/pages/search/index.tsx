import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Promise } from "thenfail";
import * as Swipeable from "react-swipeable";
import * as ClassNames from "classnames";
import * as Store from "store";
import * as Lodash from "lodash";

import NavBarWithSearch from "../../components/search-bar/index";
import FilterBar from "../../components/filter-bar/index";
import SyntheticalFilter from "../../components/synthetical-filter-pannel/index";
import CatsFilter from "../../components/cats-filter/index";
import FilterMask from "../../components/filter-mask/index";
import ProfileCard from "../../components/profile-card/index";
import LoadingToast from "../../components/toast/index";
import EmptyList from "../../components/empty-list/index";

import { CatBasic, RecommendListBasic } from '../../js/interface/common';
import { search } from "../../js/store/index";
import { syntheticalFilterConditions } from "../../js/common/config";

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
    onLoadMore?(options: any): Promise<void>;
    onChangeFixedState?(fixed: boolean): void;
}
interface NameListState {
    loadMore: boolean;
}
class NameList extends React.Component<NameListProps, NameListState> {
    static propTypes = {
        teachers: React.PropTypes.array.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        totalPage: React.PropTypes.number.isRequired,
        onLoadMore: React.PropTypes.func.isRequired,
        onChangeFixedState: React.PropTypes.func,
    }

    constructor(props: NameListProps, context: NameListState) {
        super(props, context);

        this.state = {
            loadMore: false,
        }
    }

    handleLoadMore() {
        this.setState({
            loadMore: true,
        })

        this
            .props
            .onLoadMore({
                loadMore: true,
            })
            .handle(() => {
                this.setState({
                    loadMore: false,
                })
            })
    }

    handleSwipedUp(e: TouchEvent, delta: number) {
        this.props.onChangeFixedState && this.props.onChangeFixedState(false);
        if (this.props.currentPage >= this.props.totalPage) return;

        if (this.state.loadMore) return;
        if (document.body.scrollTop < document.body.clientHeight - window.screen.height * 2) return;
        this.handleLoadMore();
    }

    handleSwipedDown(e: TouchEvent, delta: number) {
        if (this.props.onChangeFixedState) {
            if (document.body.scrollTop > window.screen.height) {
                this.props.onChangeFixedState(true);
            } else {
                this.props.onChangeFixedState(false);
            }
        }
    }

    render() {
        const { teachers, currentPage, totalPage } = this.props;
        const { loadMore } = this.state;

        return (
            <Swipeable
                onSwipedUp={ this.handleSwipedUp.bind(this) }
                onSwipedDown={ this.handleSwipedDown.bind(this) }
                preventDefaultTouchmoveEvent={ false }
                stopPropagation={ true }
                >

                {
                    teachers.length ?
                        <div className="name-list">
                            { teachers.map((teacher, index) => {
                                return (
                                    <ProfileCard { ...teacher } key={ index } />
                                )
                            }) }
                            { currentPage == totalPage ? <div className="end-line">贤师都被你一览无余了</div> : (loadMore ? <div className="load-more"><i className="iconfont iconloading"></i>正在加载...</div> : null) }
                        </div> :
                        <EmptyList tip="暂无匹配的机构和老师" />
                }
            </Swipeable>
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
    showSyntheticalFilter?: boolean;
    showCatsFilter?: boolean;
    currentCat?: CatBasic[];
    currentSyntheticalFilterOptions?: number[];
    orderByFavAscActive?: boolean;
    orderByViewAscActive?: boolean;
    currentPage?: number;
    totalPage?: number;
    loading?: boolean;
    keyword?: string;
    fixed?: boolean;
}

export default class Search extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps, context: SearchState) {
        super(props, context);

        let catIds = this.props.params.cids;
        let keyword = this.props.location.query.keyword || "";
        let currentCat = new Array<CatBasic>(3);
        let currentSyntheticalFilterOptions = new Array<number>(3);
        let orderByFavAscActive = false;
        let orderByViewAscActive = false;
        let floorCat: CatSingleDataBasic;
        let searchCat: CatBasic;
        let m91search: any = {};

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
                id: Number(catId),
                label: floorCat.label,
            }
            searchCat = currentCat[index];
        })

        if (!keyword && !searchCat) {
            try {
                m91search = JSON.parse(Store.get("m91search"));
            } catch (err) { }

            if (Lodash.every(currentCat, (cat) => {
                return !cat;
            }) && Lodash.some(m91search.cat, (cat) => {
                return !!cat;
            })) {
                currentCat = m91search.cat;
            }

            if (!keyword && m91search.keyword) {
                keyword = m91search.keyword;
            }

            if (Lodash.every(currentSyntheticalFilterOptions, (option) => {
                return !option;
            }) && Lodash.some(m91search.syntheticalFilterOptions, (option) => {
                return !!option;
            })) {
                currentSyntheticalFilterOptions = m91search.syntheticalFilterOptions;
            }

            orderByFavAscActive = !!m91search.orderByFavAscActive;
            orderByViewAscActive = !!m91search.orderByViewAscActive;
        }

        this.state = {
            teachers: [],
            showSyntheticalFilter: false,
            showCatsFilter: false,
            currentCat,
            currentSyntheticalFilterOptions,
            orderByFavAscActive,
            orderByViewAscActive,
            currentPage: 0,
            totalPage: 0,
            loading: false,
            keyword,
            fixed: false,
        }
    }

    private PageSize = 8;

    handleShowSyntheticalFilter(show: boolean) {
        this.setState({
            showSyntheticalFilter: show,
            showCatsFilter: false,
        })
    }

    handleCloseSyntheticalFilter() {
        this.setState({
            showSyntheticalFilter: false,
        })
    }

    handleShowCatsFilter(show: boolean) {
        this.setState({
            showSyntheticalFilter: false,
            showCatsFilter: show,
        })
    }

    handleCloseCatFilter() {
        this.setState({
            showCatsFilter: false,
        })
    }

    handleCloseAllFilter() {
        this.setState({
            showSyntheticalFilter: false,
            showCatsFilter: false,
        })
    }

    handleChooseCat(cat: CatBasic[]) {
        this.setState({
            currentCat: cat,
            showCatsFilter: false,
            orderByFavAscActive: false,
            orderByViewAscActive: false,
            currentSyntheticalFilterOptions: new Array<number>(3),
        })
    }

    handleSearchKeyword(keyword: string) {
        let showCatsFilter = this.state.showCatsFilter;

        this.setState({
            currentPage: 0,
            loading: true,
            currentCat: new Array<CatBasic>(3),
            currentSyntheticalFilterOptions: new Array<number>(3),
            showCatsFilter: false,
            showSyntheticalFilter: false,
            orderByFavAscActive: false,
            orderByViewAscActive: false,
            keyword,
        }, () => {
            if (!showCatsFilter) {// 如已打开科目筛选面板，直接会调用动画后的回调函数handlerCatFilterLeaveAnimEnd
                this.handleGetNameList({
                    page: 1,
                })
            }
        })
    }

    handleSearchCat(cat: CatBasic[], keyword: string) {
        this.setState({
            loading: true,
            currentCat: cat,
            currentSyntheticalFilterOptions: new Array<number>(3),
            showCatsFilter: false,
            showSyntheticalFilter: false,
            orderByFavAscActive: false,
            orderByViewAscActive: false,
        }, () => {
            this.handleGetNameList({
                page: 1,
            })
        })
    }

    handleInput(keyword: string) {
        this.setState({
            keyword,
        })
    }

    handleCatFilterLeaveAnimEnd() {
        this.handleGetNameList({
            page: 1,
        });
    }

    handleConfirmSyntheticalFilterOptions(options: number[]) {
        this.setState({
            showSyntheticalFilter: false,
            currentSyntheticalFilterOptions: options,
        })
    }

    handleSyntheticalFilterLeaveAnimEnd() {
        this.handleGetNameList({
            page: 1,
        });
    }

    handleOrderByFavAscActive(active: boolean) {
        this.setState({
            orderByFavAscActive: active,
            orderByViewAscActive: false,
        }, () => {
            this.handleGetNameList({
                page: 1,
            })
        })
    }

    handleOrderByViewAscActive(active: boolean) {
        this.setState({
            orderByFavAscActive: false,
            orderByViewAscActive: active,
        }, () => {
            this.handleGetNameList({
                page: 1,
            })
        })
    }

    handleFocus() {
        this.handleCloseAllFilter();
    }

    handleChangeFixedState(fixed: boolean) {
        if (fixed !== this.state.fixed) {
            this.setState({
                fixed,
            })
        }
    }

    handleGetNameList({
        page = this.state.currentPage + 1,
        totalPage = this.state.totalPage,
        cat = this.state.currentCat,
        orderByFavAscActive = this.state.orderByFavAscActive,
        orderByViewAscActive = this.state.orderByViewAscActive,
        syntheticalFilterConditions = this.state.currentSyntheticalFilterOptions,
        loadMore = false,
        keyword = this.state.keyword,
    }: {
            page?: number;
            totalPage?: number;
            cat?: CatBasic[];
            orderByFavAscActive?: boolean;
            orderByViewAscActive?: boolean;
            syntheticalFilterConditions?: number[];
            loadMore?: boolean;
            keyword?: string;
        }) {
        let catId = 0;
        cat.map(c => {
            if (c && c.id) {
                catId = Number(c.id);
            }
        })
        // if (!catId) return;

        // 根据给出的条件获取对应的数据
        if (!loadMore) {
            this.setState({
                loading: true,
            })
        }

        return search({
            page: page || 1,
            pageSize: this.PageSize,
            catId,
            orderByFavCount: orderByFavAscActive || false,
            orderByViewedCount: orderByViewAscActive || false,
            teachingWay: syntheticalFilterConditions[0] || 0,
            teachingAge: syntheticalFilterConditions[1] || 0,
            role: syntheticalFilterConditions[2] || 0,
            keyword,
        })
            .then(data => {
                if (!loadMore) {
                    this.setState({
                        loading: false,
                        teachers: loadMore ? this.state.teachers.concat(data.list) : data.list,
                        currentPage: data.page,
                        totalPage: Math.ceil(data.total / data.perPage),
                    })
                } else {
                    this.setState({
                        teachers: loadMore ? this.state.teachers.concat(data.list) : data.list,
                        currentPage: data.page,
                        totalPage: Math.ceil(data.total / data.perPage),
                    })
                }

            })
            .fail((error: Error) => {
                if (!loadMore) {
                    this.setState({
                        loading: false,
                    })
                }
            })
    }

    componentDidMount() {
        this.handleGetNameList({
            page: 1,
        })
    }

    componentWillUnmount() {
        Store.set("m91search", JSON.stringify({
            cat: this.state.currentCat,
            syntheticalFilterOptions: this.state.currentSyntheticalFilterOptions,
            keyword: this.state.keyword,
            orderByFavAscActive: this.state.orderByFavAscActive,
            orderByViewAscActive: this.state.orderByViewAscActive,
        }))
    }

    render() {
        const navBarProps = {
            onFocus: this.handleFocus.bind(this),
            keyword: this.state.keyword || this.props.location.query.keyword,
            onSearchKeyword: this.handleSearchKeyword.bind(this),
            onSearchCat: this.handleSearchCat.bind(this),
            onInput: this.handleInput.bind(this),
        };
        const filterProps = {
            visible: this.state.showSyntheticalFilter,
            onClose: this.handleCloseSyntheticalFilter.bind(this),
            conditions: syntheticalFilterConditions,
            currentFilterOptions: this.state.currentSyntheticalFilterOptions,
            onConfirmSyntheticalFilterOptions: this.handleConfirmSyntheticalFilterOptions.bind(this),
            handlerLeaveAnimEnd: this.handleSyntheticalFilterLeaveAnimEnd.bind(this),
        };
        const filterBarProps = {
            orderByFavAscActive: this.state.orderByFavAscActive,
            orderByViewAscActive: this.state.orderByViewAscActive,
            onOrderByFavAscActive: this.handleOrderByFavAscActive.bind(this),
            onOrderByViewAscActive: this.handleOrderByViewAscActive.bind(this),
            showCatsFilter: this.state.showCatsFilter,
            onShowSyntheticalFilter: this.handleShowSyntheticalFilter.bind(this),
            onShowCatsFilter: this.handleShowCatsFilter.bind(this),
            onCloseAllFilter: this.handleCloseAllFilter.bind(this),
            currentCat: this.state.currentCat,
            currentFilterOptions: this.state.currentSyntheticalFilterOptions,
        };
        const nameListProps = {
            teachers: this.state.teachers,
            currentPage: this.state.currentPage,
            totalPage: this.state.totalPage,
            onLoadMore: this.handleGetNameList.bind(this),
            loading: this.state.loading,
            onChangeFixedState: this.handleChangeFixedState.bind(this),
        };
        const catsFilterProps = {
            visible: this.state.showCatsFilter,
            initCat: this.state.currentCat,
            onChooseCat: this.handleChooseCat.bind(this),
            onCloseCatFilter: this.handleCloseCatFilter.bind(this),
            onLeaveAnimEnd: this.handleCatFilterLeaveAnimEnd.bind(this),
        };
        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: true,
        };

        return (
            <div id="search-page" className={ClassNames({
                fixed: this.state.fixed,
            }) }>
                <NavBarWithSearch { ...navBarProps } />
                <FilterBar { ...filterBarProps } />
                <SyntheticalFilter { ...filterProps } />
                <CatsFilter { ...catsFilterProps } />

                {
                    this.state.loading ?
                        <LoadingToast { ...loadingToastProps }/> :
                        <NameList { ...nameListProps } />
                }
            </div>
        )
    }
}
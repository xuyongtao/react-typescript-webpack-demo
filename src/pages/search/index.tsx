import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import NavBarWithSearch from "../../components/search-bar/index";
import FilterBar from "../../components/filter-bar/index";
import SyntheticalFilter from "../../components/synthetical-filter-pannel/index";
import CatsFilter from "../../components/cats-filter/index";
import FilterMask from "../../components/filter-mask/index";
import ProfileCard from "../../components/profile-card/index";
import LoadingToast from "../../components/toast/index";
import EmptyList from "../../components/empty-list/index";

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
    loading: boolean;
}
interface NameListState {
    loadMore: boolean;
}
class NameList extends React.Component<NameListProps, NameListState> {
    static propTypes = {
        teachers: React.PropTypes.array.isRequired,
        currentPage: React.PropTypes.number.isRequired,
        totalPage: React.PropTypes.number.isRequired,
        handlerLoadMore: React.PropTypes.func.isRequired,
        loading: React.PropTypes.bool.isRequired,
    }

    constructor(props: NameListProps, context: NameListState) {
        super(props, context);

        this.state = {
            loadMore: false,
        }
    }

    loadMore() {
        this.setState({
            loadMore: true,
        })

        this
            .props
            .handlerLoadMore({
                loadMore: true,
            })
            .then(() => {
                this.setState({
                    loadMore: false,
                })
            });
    }

    render() {
        const { teachers, currentPage, totalPage, loading } = this.props;
        const { loadMore } = this.state;

        if (teachers.length) {
            const loadingToastProps = {
                tip: "加载中...",
                iconClassName: "icon-loading",
                isOpen: loading || loadMore,
            };

            return (
                <div className="name-list">
                    <LoadingToast { ...loadingToastProps }/>

                    { teachers.map((teacher, index) => {
                        return (
                            <ProfileCard { ...teacher } key={ index } />
                        )
                    }) }
                    { currentPage == totalPage ? <div className="end-line">贤师都被你一览无余了</div> : (loadMore ? <div className="btn-load-more btn-loading"><i className="iconfont iconloading"></i>加载中...</div> : <div className="btn-load-more" onClick={ this.loadMore.bind(this) }>点击加载更多</div>) }
                </div>
            )
        } else {
            return (
                <EmptyList tip="暂无匹配的机构和老师" />
            )
        }


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
}

export default class Search extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps, context: SearchState) {
        super(props, context);

        this.state = {
            teachers: [],
            showSyntheticalFilter: false,
            showCatsFilter: false,
            currentCat: new Array<CatBasic>(3),
            currentSyntheticalFilterOptions: new Array<number>(4),
            orderByFavAscActive: false,
            orderByViewAscActive: false,
            currentPage: 0,
            totalPage: 0,
            loading: false,
        }
    }

    private PageSize = 8;

    onShowSyntheticalFilter(show: boolean) {
        this.setState({
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
            showSyntheticalFilter: false,
            showCatsFilter: show,
        })
    }

    onCloseAllFilter() {
        this.setState({
            showSyntheticalFilter: false,
            showCatsFilter: false,
        })
    }

    onChooseCat(cat: CatBasic[]) {
        this.setState({
            currentCat: cat,
            showCatsFilter: false,
            orderByFavAscActive: false,
            orderByViewAscActive: false,
            currentSyntheticalFilterOptions: new Array<number>(4),
        })

        // 加这个半秒延时是为了让queue-anim这个效果结束
        setTimeout(() => {
            this.getNameList({ cat });
        }, 500)
    }

    onConfirmSyntheticalFilterOptions(options: number[]) {
        this.setState({
            showSyntheticalFilter: false,
            currentSyntheticalFilterOptions: options,
        })
        // 加这个半秒延时是为了让queue-anim这个效果结束
        setTimeout(() => {
            // 请求数据
            this.getNameList({
                cat: this.state.currentCat,
                orderByFavAscActive: this.state.orderByFavAscActive,
                orderByViewAscActive: this.state.orderByViewAscActive,
                syntheticalFilterConditions: options,
            });
        }, 500)
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
        this.setState({
            loading: true,
        })

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
                loading: false,
                teachers: loadMore ? this.state.teachers.concat(data.list) : data.list,
                currentPage: data.page,
                totalPage: data.totalPage,
            })
        }, () => {
            this.setState({
                loading: false,
            })
        })
    }

    componentDidMount() {
        let catIds = this.props.params.cids;
        let floorCount = this.state.currentCat.length;
        let currentCat = new Array<CatBasic>(floorCount);
        let floorCat: CatSingleDataBasic;
        let searchCat: CatBasic;

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
            searchCat = currentCat[index];
        })

        this.setState({
            loading: true,
            currentCat
        });
        search({
            page: 1,
            pageSize: this.PageSize,
            catId: Number(searchCat.id),
            keyword: this.props.location.query.keyword || "",
        }).then(data => {
            this.setState({
                loading: false,
                teachers: data.list,
                currentPage: data.page,
                totalPage: data.totalPage,
                currentCat,
            })
        }, () => {
            this.setState({
                loading: false,
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
            loading: this.state.loading,
        }
        const catsFilterProps = {
            visible: this.state.showCatsFilter,
            initCat: this.state.currentCat,
            onChooseCat: this.onChooseCat.bind(this),
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




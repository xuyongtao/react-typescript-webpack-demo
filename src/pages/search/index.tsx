import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import NavBarWithSearch from "../../components/search-bar/index";
import FilterBar from "../../components/filter-bar/index";
import SyntheticalFilter from "../../components/synthetical-filter-pannel/index";
import CatsFilter from "../../components/cats-filter/index";
import FilterMask from "../../components/filter-mask/index";
import ProfileCard from "../../components/profile-card/index";

import { RecommendBasic } from '../../js/interface/common';
import { getRecommendList } from "../../js/store/index";
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
    teachers: RecommendBasic[];
}
class NameList extends React.Component<NameListProps, any> {
    static propTypes = {
        teachers: React.PropTypes.array.isRequired,
    }

    constructor(props: NameListProps, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="name-list">
                { this.props.teachers.map((teacher, index) => {
                    return (
                        <ProfileCard { ...teacher } key={ index } />
                    )
                }) }
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
    teachers?: RecommendBasic[];
    showSyntheticalFilter?: boolean;
    showCatsFilter?: boolean;
    currentCat?: CatBasic[];
    currentSyntheticalFilterOptions?: number[];
    orderByFavAscActive?: boolean;
    orderByViewAscActive?: boolean;
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
        }
    }

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
        this.setState({
            currentCat: cat,
            showCatsFilter: false,
            orderByFavAscActive: false,
            orderByViewAscActive: false,
            currentSyntheticalFilterOptions: new Array<number>(4),
        })
        this.getTeachers({ cat });
    }

    onConfirmSyntheticalFilterOptions(options: number[]) {
        this.setState({
            showSyntheticalFilter: false,
            currentSyntheticalFilterOptions: options,
        })
        // 请求数据
        this.getTeachers({
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
        this.getTeachers({
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
        this.getTeachers({
            cat: this.state.currentCat,
            orderByFavAscActive: false,
            orderByViewAscActive: active,
            syntheticalFilterConditions: this.state.currentSyntheticalFilterOptions,
        })
    }

    getTeachers({
        cat,
        orderByFavAscActive,
        orderByViewAscActive,
        syntheticalFilterConditions,
    }: {
            cat?: CatBasic[];
            orderByFavAscActive?: boolean;
            orderByViewAscActive?: boolean;
            syntheticalFilterConditions?: number[]
        }) {
        // 根据给出的条件获取对应的数据

        console.log("发出请求");
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

        getRecommendList()
            .then(data => {
                this.setState({
                    teachers: data.list,
                })
            })
        console.log(this.props.location.query);
    }

    render() {
        const navBarProps = {
            keyword: this.props.location.query.keyword,
        };
        const filterProps = {
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
        }
        const catsFilterProps = {
            initCat: this.state.currentCat,
            onChooseCat: this.onChooseCat.bind(this)
        }

        return (
            <div>
                { this.state.showSyntheticalFilter ? <FilterMask /> : null }
                <NavBarWithSearch { ...navBarProps } />
                <FilterBar { ...filterBarProps } />
                { this.state.showSyntheticalFilter ? <SyntheticalFilter { ...filterProps } /> : null }
                { this.state.showCatsFilter ? <CatsFilter { ...catsFilterProps } /> : null}
                <NameList { ...nameListProps } />
            </div>
        )
    }
}
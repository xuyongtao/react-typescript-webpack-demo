import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as QueueAnim from 'rc-queue-anim';

import * as classNames from "classnames";
import * as Lodash from "lodash";

import FilterMask from "../filter-mask/index";

interface CatBasicInfo {
    id: number;
    label: string;
}

interface CatBasic {
    [key: number]: {
        label: string;
        cats: {
            [key: number]: {
                label: string;
                cats: {
                    [key: number]: {
                        label: string;
                    }
                }
            }
        }
    }
}
const catsData: CatBasic = require("../../js/common/cats.js");

interface CatOptionProp {
    id: number;
    label: string;
    active?: boolean;
    onClick(): void;
}

class CatOption extends React.Component<CatOptionProp, any> {
    static propTypes = {
        id: React.PropTypes.number.isRequired,
        label: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool,
        onClick: React.PropTypes.func.isRequired,
    }
    static defaultProps = {
        active: false,
    }
    constructor(props: CatOptionProp) {
        super(props);
    }

    render() {
        return (
            <span onClick={ this.props.onClick } className={ classNames("cats-filter-label-level3", {
                active: this.props.active,
            }) }>{ this.props.label }</span>
        )
    }
}

interface CatPannelProps {
    level1Cat: CatBasicInfo;
    cats: {
        [key: number]: {
            label: string;
            cats: {
                [key: number]: {
                    label: string;
                }
            }
        }
    };
    initCat: CatBasicInfo[];
    onChooseCat(cats: CatBasicInfo[]): void;
    onTouchStart(e: React.TouchEvent, elScroll: any): void;
    onTouchMove(e: React.TouchEvent): void;
    onTouchEnd(e: React.TouchEvent): void;
}
class CatPannel extends React.Component<CatPannelProps, any> {
    static propTypes = {
        level1Cat: React.PropTypes.object.isRequired,
        cats: React.PropTypes.object.isRequired,
        initCat: React.PropTypes.array,
        onChooseCat: React.PropTypes.func.isRequired,
        onTouchStart: React.PropTypes.func,
        onTouchMove: React.PropTypes.func,
        onTouchEnd: React.PropTypes.func,
    }
    static defaultProps = {
        initCat: new Array(3),
    }
    constructor(props: CatPannelProps, context: any) {
        super(props, context);
    }

    handleClick(pcat: CatBasicInfo, cat: CatBasicInfo) {
        this.props.onChooseCat([this.props.level1Cat, pcat, cat]);
    }

    render() {
        return (
            <div
                className="cats-filter-right"
                ref="filter-right"
                onTouchStart={ (e) => { this.props.onTouchStart(e, this.refs['filter-right']) } }
                onTouchMove={ (e) => { this.props.onTouchMove(e) } }
                onTouchEnd={ (e) => { this.props.onTouchEnd(e) } }
                >
                { Lodash.map(this.props.cats, (pcat, pkey) => {
                    return (
                        <div
                            key={ pkey }
                            className="cats-filter-pannel-wrapper"
                            >
                            <span className="cats-filter-label-level2">{ pcat.label }</span>
                            <div className="cats-filter-pannel">
                                { Lodash.map(pcat.cats, (cat, key) => {
                                    let props = {
                                        id: Number(key),
                                        label: cat.label,
                                        onClick: this.handleClick.bind(this, {
                                            id: Number(pkey),
                                            label: pcat.label,
                                        }, {
                                                id: Number(key),
                                                label: cat.label,
                                            }),
                                        active: this.props.initCat[this.props.initCat.length - 1] && this.props.initCat[this.props.initCat.length - 1].id === Number(key),
                                    }

                                    return (
                                        <CatOption key={ key } { ...props } />
                                    )
                                }) }
                            </div>
                        </div>
                    )
                }) }
            </div>
        )
    }
}

interface Cats {
    cid: number;
    label: string;
    cats?: Cats[];
}
interface CatsFilterProps {
    visible: boolean;
    initCat?: CatBasicInfo[];// 初始化最后一级的科目
    onChooseCat?(cats?: CatBasicInfo[]): void;
    onCloseCatFilter?(): void;
    onLeaveAnimEnd?(): void;
}
interface CatsFilterState {
    maskVisible?: boolean;
    currentFirstLevelCat?: {
        id: number;
        label: string;
    };
}

export default class CatsFilter extends React.Component<CatsFilterProps, CatsFilterState> {
    static propTypes = {
        visible: React.PropTypes.bool,
        initCat: React.PropTypes.array,
        onChooseCat: React.PropTypes.func,
        onCloseCatFilter: React.PropTypes.func,
        onLeaveAnimEnd: React.PropTypes.func,
    }
    static defaultProps = {

    }
    private scrollData: {
        posY: number,
        maxScroll: number,
        scrollY: number,
        elScroll?: any
    } = {
        posY: 0,
        maxScroll: 0,
        scrollY: 0
    }

    constructor(props: CatsFilterProps, context: CatsFilterState) {
        super(props, context);

        let [firstLevelCat] = this.props.initCat;

        this.state = {
            maskVisible: this.props.visible || false,
            currentFirstLevelCat: {
                id: firstLevelCat ? firstLevelCat.id : 1,
                label: firstLevelCat ? firstLevelCat.label : "艺术",
            },
        }
    }

    componentDidMount() {

    }

    handleClick(id: number, label: string) {
        this.setState({
            currentFirstLevelCat: { id, label },
        })
    }

    handleTouchStart(event: React.TouchEvent, elScroll: any) {
        let touch = event.touches[0];
        let touchTarget: any = touch.target;
        let scrollHeight = elScroll.scrollHeight;
        let clientHeight = elScroll.clientHeight;

        this.scrollData.elScroll = elScroll;
        this.scrollData.posY = touch.pageY;
        this.scrollData.scrollY = elScroll.scrollTop;
        this.scrollData.maxScroll = scrollHeight - clientHeight;
    }

    handleToucheEnd(event: React.TouchEvent) {
        this.scrollData.maxScroll = 0;
    }

    handleTouchMove(event: React.TouchEvent) {
        if (this.scrollData.maxScroll <= 0) {
            event.preventDefault();
            return;
        }

        let elScroll = this.scrollData.elScroll;
        let touch = event.touches[0];
        let distanceY = touch.pageY - this.scrollData.posY;
        let scrollTop = elScroll.scrollTop;

        // 下边缘检测
        if (distanceY < 0 && (scrollTop + 1 >= this.scrollData.maxScroll)) {
            // 往下滑，并且到头
            // 禁止滚动的默认行为
            event.preventDefault();
            return;
        }
    }

    handleAnimEnd({ key, type }: { key: string; type: string }) {
        this.setState({
            maskVisible: type === "enter",
            currentFirstLevelCat: this.props.initCat[0],
        })
        if (type === "leave" && this.props.onLeaveAnimEnd) {
            this.props.onLeaveAnimEnd();
        }
    }

    render() {
        let filterMaskProps = {
            classNames: ["cats-filter-mask"],
            handlerClose: this.props.onCloseCatFilter,
        };
        let [firstLevelCat] = this.props.initCat;
        let currentFirstLevelCatId = this.state.currentFirstLevelCat ? this.state.currentFirstLevelCat.id : (firstLevelCat ? firstLevelCat.id : 1);

        let catPannelsProps = {
            level1Cat: this.state.currentFirstLevelCat || firstLevelCat || { id: currentFirstLevelCatId, label: catsData[currentFirstLevelCatId].label },
            cats: catsData[currentFirstLevelCatId].cats,
            initCat: this.props.initCat,
            onChooseCat: this.props.onChooseCat,
            onTouchStart: this.handleTouchStart.bind(this),
            onTouchMove: this.handleTouchMove.bind(this),
            onTouchEnd: this.handleToucheEnd.bind(this),
        };

        return (
            <div className="cats-filter-wrapper">
                { this.state.maskVisible || this.props.visible ? <FilterMask { ...filterMaskProps } /> : null }
                <QueueAnim
                    duration={ 450 }
                    type={ "top" }
                    ease={ "easeOutQuart" }
                    animConfig={{
                        opacity: [1, 1],
                        translateY: [0, "-11rem"]
                    }}
                    onEnd={ this.handleAnimEnd.bind(this) }
                    >
                    {
                        this.props.visible ?
                            <div key="filter" className="cats-filter">
                                <ul
                                    className="cats-filter-left"
                                    ref="filter-left"
                                    onTouchStart={ (e) => { this.handleTouchStart(e, this.refs['filter-left']) } }
                                    onTouchMove={ this.handleTouchMove.bind(this) }
                                    onTouchEnd={ this.handleToucheEnd.bind(this) }
                                    >
                                    { Lodash.map(catsData, (cat, key) => {
                                        return (
                                            <li
                                                key={ key }
                                                onClick={ this.handleClick.bind(this, key, cat.label) }
                                                className={classNames({
                                                    active: key == currentFirstLevelCatId
                                                }) }
                                                >{ cat.label }</li>
                                        )
                                    }) }
                                </ul>
                                <CatPannel { ...catPannelsProps } />
                            </div> :
                            null
                    }
                </QueueAnim>
            </div>
        )
    }
}


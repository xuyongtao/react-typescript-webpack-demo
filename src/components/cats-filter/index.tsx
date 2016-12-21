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
}
class CatPannel extends React.Component<CatPannelProps, any> {
    static propTypes = {
        level1Cat: React.PropTypes.object.isRequired,
        cats: React.PropTypes.object.isRequired,
        initCat: React.PropTypes.array,
        onChooseCat: React.PropTypes.func.isRequired,
    }
    static defaultProps = {
        initCat: new Array(3),
    }
    constructor(props: CatPannelProps, context: any) {
        super(props, context);
    }

    onClickHandler(pcat: CatBasicInfo, cat: CatBasicInfo) {
        this.props.onChooseCat([this.props.level1Cat, pcat, cat]);
    }

    render() {
        return (
            <div className="cats-filter-right">
                { Lodash.map(this.props.cats, (pcat, pkey) => {
                    return (
                        <div key={ pkey } className="cats-filter-pannel-wrapper">
                            <span className="cats-filter-label-level2">{ pcat.label }</span>
                            <div className="cats-filter-pannel">
                                { Lodash.map(pcat.cats, (cat, key) => {
                                    let props = {
                                        id: Number(key),
                                        label: cat.label,
                                        onClick: this.onClickHandler.bind(this, {
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
    handlerLeaveAnimEnd?(): void;
}
interface CatsFilterState {
    maskVisible?: boolean;
    currentLevel1Cat?: {
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
        handlerLeaveAnimEnd: React.PropTypes.func,
    }
    static defaultProps = {

    }

    constructor(props: CatsFilterProps, context: CatsFilterState) {
        super(props, context);

        this.state = {
            maskVisible: this.props.visible || false,
            currentLevel1Cat: {
                id: this.props.initCat[0] ? this.props.initCat[0].id : 1,
                label: this.props.initCat[0] ? this.props.initCat[0].label : "艺术",
            },
        }
    }

    componentDidMount() {

    }

    onClickHandler(id: number, label: string) {
        this.setState({
            currentLevel1Cat: { id, label },
        })
    }

    handlerAnimEnd({ key, type }: { key: string; type: string }) {
        this.setState({
            maskVisible: type === "enter",
            currentLevel1Cat: this.props.initCat[0],
        })
        if (type === "leave" && this.props.handlerLeaveAnimEnd) {
            this.props.handlerLeaveAnimEnd();
        }
    }

    render() {
        let filterMaskProps = {
            classNames: ["cats-filter-mask"],
            handlerClose: this.props.onCloseCatFilter,
        };
        let currentLevel1CatId = this.state.currentLevel1Cat ? this.state.currentLevel1Cat.id : (this.props.initCat[0] ? this.props.initCat[0].id : 1);

        let catPannelsProps = {
            level1Cat: this.state.currentLevel1Cat || this.props.initCat[0] || { id: currentLevel1CatId, label: catsData[currentLevel1CatId].label },
            cats: catsData[currentLevel1CatId].cats,
            initCat: this.props.initCat,
            onChooseCat: this.props.onChooseCat,
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
                    onEnd={ this.handlerAnimEnd.bind(this) }
                    >
                    {
                        this.props.visible ?
                            <div key="filter" className="cats-filter">
                                <ul className="cats-filter-left">
                                    { Lodash.map(catsData, (cat, key) => {
                                        return (
                                            <li key={ key } onClick={ this.onClickHandler.bind(this, key, cat.label) } className={classNames({
                                                active: key == currentLevel1CatId
                                            }) }>{ cat.label }</li>
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


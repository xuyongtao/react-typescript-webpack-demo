require("./index.less");

import * as React from "react";
import { render } from "react-dom";
import * as QueueAnim from 'rc-queue-anim';

import * as classNames from "classnames";
import * as Lodash from "lodash";

console.log("load cats filter")

import FilterMask from "../filter-mask/index";

interface CatBasicInfo {
    id: string;
    label: string;
}

interface CatBasic {
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

    onClickHandler() {
        this.props.onClick();
    }

    render() {
        return (
            <span onClick={ this.onClickHandler.bind(this) } className={ classNames("cats-filter-label-level3", {
                active: this.props.active,
            }) }>{ this.props.label }</span>
        )
    }
}

interface CatPannelProps {
    level1Cat: CatBasicInfo;
    cats: {
        [key: string]: {
            label: string;
            cats: {
                [key: string]: {
                    label: string;
                }
            }
        }
    };
    initCat: CatBasicInfo[];
    onChooseCat?(cats: CatBasicInfo[]): void;
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
                                            id: pkey,
                                            label: pcat.label,
                                        }, {
                                                id: key,
                                                label: cat.label,
                                            }),
                                        active: this.props.initCat[this.props.initCat.length - 1] && this.props.initCat[this.props.initCat.length - 1].id === key,
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
    onChooseCat?(cats: CatBasicInfo[]): void;
    handlerAnimEnd?(options: {
        key: string;
        type: string;
    }): void;
}
interface CatsFilterState {
    maskVisible?: boolean;
    currentLevel1Cat?: {
        id: string;
        label: string;
    };
}

export default class CatsFilter extends React.Component<CatsFilterProps, CatsFilterState> {
    static propTypes = {
        visible: React.PropTypes.bool,
        initCat: React.PropTypes.array,
    }
    static defaultProps = {
        visible: false,
    }

    initState: any;

    constructor(props: CatsFilterProps, context: CatsFilterState) {
        super(props, context);

        this.state = this.initState = {
            maskVisible: this.props.visible || false,
            currentLevel1Cat: {
                id: this.props.initCat[0] ? this.props.initCat[0].id : "1",
                label: this.props.initCat[0] ? this.props.initCat[0].label : "艺术",
            },
        }
    }

    onClickHandler(id: string, label: string) {
        this.setState({
            currentLevel1Cat: { id, label },
        })
    }

    handlerAnimEnd({ key, type }: { key: string; type: string }) {
        // this.props.handlerAnimEnd({
        //     key,
        //     type,
        // });

        this.setState({
            maskVisible: type === "enter",
        })
    }

    render() {
        let CatPannelsProps = {
            level1Cat: this.state.currentLevel1Cat,
            cats: catsData[this.state.currentLevel1Cat.id].cats,
            initCat: this.props.initCat,
            onChooseCat: this.props.onChooseCat,
        }

        return (
            <div className="cats-filter-wrapper">
                { this.props.visible || this.state.maskVisible ? <FilterMask classNames={["cats-filter-mask"]}/> : null }
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
                    { this.props.visible ? <div key="filter" className="cats-filter">
                        <ul className="cats-filter-left">
                            { Lodash.map(catsData, (cat, key) => {
                                return (
                                    <li key={ key } onClick={ this.onClickHandler.bind(this, key, cat.label) } className={classNames({
                                        active: key == this.state.currentLevel1Cat.id
                                    }) }>{ cat.label }</li>
                                )
                            }) }
                        </ul>
                        <CatPannel { ...CatPannelsProps } />
                    </div> : null }
                </QueueAnim>
            </div>
        )
    }
}


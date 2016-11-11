import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as classNames from "classnames";
import * as Lodash from "lodash";

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
const catsData: CatBasic = require("./cats.js");

interface CatOptionProp {
    id: number;
    label: string;
    active?: boolean;
    onClick(id: number): void;
}

class CatOption extends React.Component<CatOptionProp, any> {
    static propTypes = {
        id: React.PropTypes.number.isRequired,
        label: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool,
    }
    static defaultProps = {
        active: false,
    }
    constructor(props: CatOptionProp) {
        super(props);
    }

    onClickHandler(id: number) {
        this.props.onClick(id);
    }

    render() {
        return (
            <span onClick={ this.onClickHandler.bind(this, this.props.id) } className={classNames("cats-filter-label-level3", {
                active: this.props.active,
            }) }>{this.props.label}</span>
        )
    }
}

interface CatPannelProps {
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
class CatPannels extends React.Component<CatPannelProps, any> {
    static PropTypes = {
        cats: React.PropTypes.object.isRequired,
    }
    constructor(props: CatPannelProps, context: any) {
        super(props, context);
    }

    onClickHandler() {

    }

    render() {
        return (
            <div className="cats-filter-right">
                { Lodash.map(this.props.cats, (cat, key) => {
                    return (
                        <div key={ key } className="cats-filter-pannel-wrapper">
                            <span className="cats-filter-label-level2">{ cat.label }</span>
                            <div className="cats-filter-pannel">
                                { Lodash.map(cat.cats, (cat, key) => {
                                    let props = {
                                        id: Number(key),
                                        label: cat.label,
                                        onClick: this.onClickHandler.bind(this, key),
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
    initCid?: number;
    cats?: Cats[];
}
interface CatsFilterState {
    currentLevel1CatId: number;
}

export default class CatsFilter extends React.Component<CatsFilterProps, CatsFilterState> {
    static propTypes = {
        initCid: React.PropTypes.number,
    }

    initState: any;

    constructor(props: CatsFilterProps, context: CatsFilterState) {
        super(props, context);

        this.state = this.initState = {
            currentLevel1CatId: 1,
        }
    }

    onClickHandler(key: number) {
        this.setState({
            currentLevel1CatId: key,
        })
    }

    render() {
        let CatPannelsProps = {
            cats: catsData[this.state.currentLevel1CatId].cats
        }

        return (
            <div className="cats-filter">
                <ul className="cats-filter-left">
                    { Lodash.map(catsData, (cat, key) => {
                        return (
                            <li key={ key } onClick={ this.onClickHandler.bind(this, key) } className={classNames({
                                active: key === this.state.currentLevel1CatId
                            }) }>{ cat.label }</li>
                        )
                    }) }
                </ul>
                <CatPannels { ...CatPannelsProps } />
            </div>
        )
    }
}
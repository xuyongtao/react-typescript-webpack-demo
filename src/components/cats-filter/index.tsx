import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as classNames from "classnames";
import * as Lodash from "lodash";

interface CatBasic {
    [key: number]: {
        label: string;
        cats?: CatBasic;
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
            <span onClick={ this.onClickHandler.bind(this, this.props.id) } className={classNames({
                active: this.props.active,
            }) }>{this.props.label}</span>
        )
    }
}

interface CatPannelProps {
    label: string;
    active: boolean;
    cats: CatBasic
}

class CatPannels extends React.Component<CatPannelProps, any> {
    static PropTypes = {
        label: React.PropTypes.string.isRequired,
        pannelData: React.PropTypes.object.isRequired,
    }
    static defaultProps = {
        active: false,
    }
    constructor(props: CatPannelProps, context: any) {
        super(props, context);
    }

    onClickHandler() {

    }

    render() {
        return (
            <div className={ classNames({
                active: this.props.active
            }) }>
                <div className="cats-filter-label-level1">{ this.props.label }</div>
                <div className="cats-filter-pannel">
                    { Lodash.map(this.props.cats, (cat, key) => {
                        return (
                            <div key={ key }>
                                <span className="cats-filter-label-level2">{ cat.label }</span>
                                <div>
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

export default class CatsFilter extends React.Component<CatsFilterProps, any> {
    static propTypes = {
        initCid: React.PropTypes.number,
    }
    constructor(props: CatsFilterProps, context: any) {
        super(props, context);
    }

    render() {

        return (
            <div className="cats-filter">
                { Lodash.map(catsData, (cat, key) => {
                    let props = {
                        label: cat.label,
                        active: true,
                        cats: cat.cats
                    }

                    return (
                        <CatPannels key={ key } { ...props } />
                    )
                }) }
            </div>
        )
    }
}
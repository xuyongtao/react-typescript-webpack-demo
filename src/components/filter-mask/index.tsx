import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import * as classNames from "classnames";

interface FilterMaskProps {
    classNames?: string[];
    handlerClose?(): void;
}

export default class FilterMask extends React.Component<FilterMaskProps, any> {
    static propTypes = {
        classNames: React.PropTypes.arrayOf(React.PropTypes.string),
    }
    constructor() {
        super();
    }

    handlerClose() {
        if (this.props.handlerClose) {
            this.props.handlerClose();
        }
    }

    render() {
        return (
            <div onClick={ this.handlerClose.bind(this) } className={classNames(["filter-mask"].concat(this.props.classNames)) }></div>
        )
    }
}
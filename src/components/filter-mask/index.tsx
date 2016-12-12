require("./index.less");

import * as React from "react";
import { render } from "react-dom";

import * as classNames from "classnames";

interface FilterMaskProps {
    classNames?: string[];
}

export default class FilterMask extends React.Component<FilterMaskProps, any> {
    static propTypes = {
        classNames: React.PropTypes.arrayOf(React.PropTypes.string),
    }
    constructor() {
        super();
    }

    render() {
        return (
            <div className={classNames(["filter-mask"].concat(this.props.classNames)) }></div>
        )
    }
}
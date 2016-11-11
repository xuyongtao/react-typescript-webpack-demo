import "./index.less";

import * as React from "react";
import { render } from "react-dom";

export default class FilterMask extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="filter-mask"></div>
        )
    }
}
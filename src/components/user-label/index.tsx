import './index.less';

import * as React from "react";
import { render } from "react-dom";

export default class UserLabel extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        const { label, classname } = this.props;

        return (
            <span className={ classname }>{ label }</span>
        )
    }
}
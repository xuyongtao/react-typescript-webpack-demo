import './user-label.less';

import * as React from "react";
import { render } from "react-dom";

export default class UserLabel extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

    }

    render() {
        return (
            <span className={ this.props.classname }>{ this.props.label }</span>
        )
    }


}
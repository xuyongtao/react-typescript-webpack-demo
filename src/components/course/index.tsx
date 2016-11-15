import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

// interface
import { CourseBasic } from '../../js/interface/teacher';

export default class Course extends React.Component<CourseBasic, any> {
    constructor(props: CourseBasic, context: any) {
        super(props, context);
    }

    render() {
        return (
            <li className="course">
                <Link to={ `/course/${this.props.cid}` }>
                    <img src={ this.props.cover } alt={ this.props.title }/>
                    <div>
                        <strong>{ this.props.title }</strong>
                        <p>{ this.props.detail }</p>
                    </div>
                </Link>
            </li>
        )
    }
}
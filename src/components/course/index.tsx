import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

// interface
import { CourseBasic } from '../../js/interface/teacher';

export default class Course extends React.Component<CourseBasic, any> {
    static propTypes = {
        cid: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        cover: React.PropTypes.string.isRequired,
        detail: React.PropTypes.string.isRequired,
    }
    constructor(props: CourseBasic, context: any) {
        super(props, context);
    }

    render() {
        const { cid, title, cover, detail } = this.props;

        return (
            <li className="course">
                <Link to={ `/course/${cid}` }>
                    <img src={ cover } alt={ title }/>
                    <div>
                        <strong>{ title }</strong>
                        <p>{ detail }</p>
                    </div>
                </Link>
            </li>
        )
    }
}
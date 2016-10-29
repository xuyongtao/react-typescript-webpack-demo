import './basic-info.less';

import * as React from "react";
import { render } from "react-dom";

import { TeacherBasic } from '../../../common/teacher';

export default class BasicInfo extends React.Component<any, any> {
    constructor(props: TeacherBasic, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="basic-info">
                <img src={ this.props.teacher.avatar } alt={ this.props.teacher.name }/>
                <div>
                    <strong>{ this.props.teacher.name }</strong><i></i>
                    <p>{ this.props.teacher.selfIntro }</p>
                </div>
            </div>
        )
    }
}


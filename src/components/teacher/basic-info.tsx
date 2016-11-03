import "./basic-info.less";

import * as React from "react";
import { render } from "react-dom";

import { TeacherResBasic } from "../../../common/teacher";
import { getTeacherBasicInfo } from "../../../store/teacher";

export default class BasicInfo extends React.Component<any, any> {
    constructor(props: TeacherResBasic, context: any) {
        super(props, context);
        this.state = {
            tid: 0,
            avatar: "",
            name: "",
            selfIntro: "",
        }
    }

    componentDidMount() {
        getTeacherBasicInfo()
            .then(teacherInfo => {
                this.setState({
                    tid: teacherInfo.tid,
                    avatar: teacherInfo.avatar,
                    name: teacherInfo.name,
                    selfIntro: teacherInfo.selfIntro,
                })
            })
    }

    render() {
        return (
            <div className="basic-info">
                <img src={ this.state.avatar } alt={ this.state.name }/>
                <div>
                    <strong>{ this.state.name }</strong><i></i>
                    <p>{ this.state.selfIntro }</p>
                </div>
            </div>
        )
    }
}


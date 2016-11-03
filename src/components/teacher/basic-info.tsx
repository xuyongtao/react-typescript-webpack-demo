import "./basic-info.less";

import * as React from "react";
import { render } from "react-dom";
import UserLabel from "../user-label";

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
            teachingAge: 0,
            certified: false,
        }
    }

    componentDidMount() {
        getTeacherBasicInfo(this.props.tid)
            .then(teacher => {
                this.setState({
                    tid: teacher.tid,
                    avatar: teacher.avatar,
                    name: teacher.name,
                    selfIntro: teacher.selfIntro,
                    teachingAge: teacher.teachingAge,
                    certified: teacher.certified
                })
            })
    }

    render() {
        return (
            <div className="basic-info">
                <img src={ this.state.avatar } alt={ this.state.name }/>
                <div className="detail">
                    <div>
                        <strong>{ this.state.name }</strong>
                        { this.state.teachingAge ? <UserLabel classname="label-teaching-age" label={ this.state.teachingAge + "年教龄" } /> : null }
                        { this.state.certified ? <UserLabel classname="label-certified" label="机构认证" /> : null }
                    </div>
                    <p>{ this.state.selfIntro }</p>
                </div>
            </div>
        )
    }
}


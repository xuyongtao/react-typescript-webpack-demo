import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

import UserLabel from "../user-label";

import { TeacherResBasic } from "../../../common/teacher";
import { getTeacherBasicInfo } from "../../../store/teacher";
import { Role } from "../../../common/config";

interface BasicInfoProps {
    id: number;
    role: number;
    roleType?: string;
    avatar?: string;
    name: string;
    teachingAge?: number;
    certified?: boolean;
    selfIntro: string;
}

export default class BasicInfo extends React.Component<BasicInfoProps, any> {
    static propTypes = {
        id: React.PropTypes.number.isRequired,
        role: React.PropTypes.number.isRequired,
        roleType: React.PropTypes.string,
        avatar: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        teachingAge: React.PropTypes.number,
        certified: React.PropTypes.bool,
        selfIntro: React.PropTypes.string,
    }

    constructor(props: BasicInfoProps, context: any) {
        super(props, context);

    }

    componentDidMount() {

    }

    render() {
        let role = Role.studio === this.props.role ? "studio" : "teacher";

        return (
            <div className="basic-info">
                <Link to={ `/${role}/${this.props.id}` }>
                    <img src={ this.props.avatar } alt={ this.props.name }/>
                    <div className="detail">
                        <div>
                            <strong>{ this.props.name }</strong>
                            { this.props.teachingAge ? <UserLabel classname="label-teaching-age" label={ this.props.teachingAge + "年教龄" } /> : null }
                            { this.props.certified ? <UserLabel classname="label-certified" label="机构认证" /> : null }
                        </div>
                        <p>{ this.props.selfIntro }</p>
                    </div>
                </Link>
            </div>
        )
    }
}


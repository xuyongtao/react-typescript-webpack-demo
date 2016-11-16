import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";

import UserLabel from "../user-label";

import { defaultAvatar, Role } from "../../js/common/config";

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
        const { id, role, name, avatar, teachingAge, certified, selfIntro } = this.props;

        return (
            <div className="basic-info">
                <Link to={ `/${Role.studio === role ? "studio" : "teacher"}/${id}` }>
                    <img src={ avatar } alt={ name }/>
                    <div className="detail">
                        <div>
                            <strong>{ name }</strong>
                            { teachingAge ? <UserLabel classname="label-teaching-age" label={ teachingAge + "年教龄" } /> : null }
                            { certified ? <UserLabel classname="label-certified" label="机构认证" /> : null }
                        </div>
                        <p>{ selfIntro }</p>
                    </div>
                </Link>
            </div>
        )
    }
}


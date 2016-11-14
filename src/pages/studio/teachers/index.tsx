import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import BasicInfo from "../../../components/basic-info/index";
import { Role } from "../../../../common/config";

export default class Teachers extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        const teachers = [{
            tid: 1,
            name: "yota1",
            selfIntro: "自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介",
            teachingAge: 4,
            avatar: "",
        }, {
                tid: 2,
                name: "yota2",
                selfIntro: "自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介自我简介",
                teachingAge: 4,
                avatar: "",
            }];

        return (
            <ul className="teacher-list">
                { teachers.map((teacher, index) => {
                    let teacherProps = {
                        id: teacher.tid,
                        role: Role.teacher,
                        avatar: teacher.avatar,
                        name: teacher.name,
                        teachingAge: teacher.teachingAge,
                        selfIntro: teacher.selfIntro,
                    }

                    return (
                        <BasicInfo key={ index } { ...teacherProps } />
                    )
                }) }
            </ul>
        )
    }
}
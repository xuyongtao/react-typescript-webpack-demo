import "./index.less";
import * as React from "react";
import { render } from "react-dom";

// components
import ProfileCard from "../../../components/teacher/profile-card";
// store
import { getRecommendTeachers } from "../../../../store/teacher";
// interface
import { RecommendTeacherBasic } from '../../../../common/teacher';

export default class RecommendTeachers extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            teachers: []
        }

    }

    componentDidMount() {
        let _this = this;

        getRecommendTeachers()
            .then(data => {
                _this.setState({
                    teachers: data.teachers
                })
            })
    }

    render() {
        console.log("推荐老师老师");
        return (
            <div id="recommend-list">
                { this.state.teachers.map((teacher: RecommendTeacherBasic, index: number) => {
                    return (
                        <ProfileCard { ...teacher } key={ teacher.tid} />
                    )
                }) }
            </div>
        )
    }
}


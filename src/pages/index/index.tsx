import "./index.less";

import * as Lodash from "lodash";
import * as React from "react";
import { render } from "react-dom";

// components
import TabsBar from "../../components/tabs-bar";
import ProfileCard from "../../components/teacher/profile-card";
import RecommendTeachersPannel from "./recommend-teachers/index";
import HotTeachersPannel from "./hot-teachers/index";

// store
import { getHotTeachers } from "../../../store/teacher";
// common
import { indexRouters } from "../../../common/routers";

export default class AppIndx extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <TabsBar tabs={ indexRouters } />
                { this.props.children }
            </div>
        )
    }
}


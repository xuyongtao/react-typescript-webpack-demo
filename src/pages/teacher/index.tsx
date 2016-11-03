import './index.less';

import * as React from "react";
import { render } from 'react-dom';

import NavBar from '../../components/nav-bar';
import BasicInfo from '../../components/teacher/basic-info';

export default class TeacherIndex extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    componentDidMount() {
        console.log(this.props.params);
    }

    render() {
        return (
            <div>
                <NavBar pageTitle="老师详情" />
                <BasicInfo />

            </div>
        )
    }
}
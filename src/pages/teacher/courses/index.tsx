import "./index.less";
import * as React from "react";
import { render } from "react-dom";

export default class TeacherCourses extends React.Component<any, any> {
    render() {
        console.log('构建课程列表');
        return (
            <ul id="course-list">
                <li>
                    <img src="http://qmin91.com/file/rxKIZymR5793011349f41" alt="钢琴教学"/>
                    <div>
                        <strong>钢琴教学</strong>
                        <p>钢琴教学</p>
                    </div>
                </li>
            </ul>
        )
    }
}


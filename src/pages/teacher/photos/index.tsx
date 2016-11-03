import "./index.less";
import * as React from "react";
import { render } from "react-dom";

export default class TeacherPhotos extends React.Component<any, any> {
    render() {
        console.log('构建相册');
        return (
            <div hidden={ this.props.hidden } id="gallery-wall">
                <div className="gallery-wall-left">
                    <div className="gallery-wall-item"></div>
                    <div className="gallery-wall-item"></div>
                </div>
                <div className="gallery-wall-right">
                    <div className="gallery-wall-item"></div>
                    <div className="gallery-wall-item"></div>
                </div>
            </div>
        )
    }
}


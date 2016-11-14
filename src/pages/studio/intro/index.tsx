import "./index.less";

import * as React from "react";
import { render } from "react-dom";

export default class Intro extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        return (
            <div className="intro-cont">
                全民教育致力于打造人人乐用的学习服务平台，聚焦本土优质师资，通过更高效、更智能、更精准地匹配师生资源，为老师及学生提供全而专的教育信息和增值服务，通过移动互联网，全力创建一个专业、高效、智能、安全的高品质教育信息平台，让教与学变得更便捷、平等、高效。
            </div>
        )
    }
}
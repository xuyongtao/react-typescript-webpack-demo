import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as classnames from "classnames";
import { browserHistory } from "react-router";

import Banner from "../../components/banner";
import Notification from "../../components/notification";

import { looking } from "../../js/store/index";

interface BookingFormState {
    submiting?: boolean;
    courseAvailable?: boolean;
    nameAvailable?: boolean;
    mobileAvailable?: boolean;
    addressAvailable?: boolean;
    ageAvailable?: boolean;
}

export default class BookingForm extends React.Component<any, BookingFormState> {
    constructor(props: any, context: BookingFormState) {
        super(props, context);

        this.state = {
            submiting: false,
            courseAvailable: true,
            nameAvailable: true,
            mobileAvailable: true,
            addressAvailable: true,
            ageAvailable: true,
        }
    }

    handlerSubmit() {
        if (this.state.submiting) return;

        let hmt = (window as any)._hmt;
        if (hmt) {
            hmt.push(["_trackEvent", "帮我找老师表单", "点击提交", "填写信息不全"]);
        }

        let courseNode: any = this.refs["course"];
        let nameNode: any = this.refs["name"];
        let mobileNode: any = this.refs["mobile"];
        let addressNode: any = this.refs["address"];
        let ageNode: any = this.refs["age"];
        let content = "";

        if (!courseNode.value) {
            if (!content) content = "请填写您想学什么";
            this.state.courseAvailable = false;
        } else {
            this.state.courseAvailable = true;
        }
        if (!nameNode.value) {
            if (!content) content = "请填写您的姓名";
            this.state.nameAvailable = false;
        } else {
            this.state.nameAvailable = true;
        }
        if (!mobileNode.value) {
            if (!content) content = "请填写您的手机号码";
            this.state.mobileAvailable = false;
        } else {
            this.state.mobileAvailable = true;
        }
        if (!addressNode.value) {
            if (!content) content = "请填写您希望上课的地点";
            this.state.addressAvailable = false;
        } else {
            this.state.addressAvailable = true;
        }
        if (!ageNode.value) {
            if (!content) content = "请填写您的年龄";
            this.state.ageAvailable = false;
        } else {
            this.state.ageAvailable = true;
        }

        this.setState(this.state, () => {
            if (content) {
                Notification.info({ content });
                return;
            }

            if (hmt) {
                hmt.push(["_trackEvent", "帮我找老师表单", "点击提交", "填写需求完善"]);
            }

            this.setState({
                submiting: true,
            }, () => {
                looking({
                    mark: courseNode.value.trim(),
                    name: nameNode.value.trim(),
                    mobile: mobileNode.value.trim(),
                    location: addressNode.value.trim(),
                    age: parseInt(ageNode.value.trim()),
                })
                    .then(() => {
                        Notification.info({
                            content: "提交成功，即将跳转至首页",
                        })
                        setTimeout(() => {
                            browserHistory.push("/");
                        }, 2000)
                    })
                    .handle(() => {
                        this.setState({
                            submiting: false,
                        })
                    })
                    .fail((error: Error) => {
                        Notification.info({
                            content: error.message,
                        })
                    })
            })
        });
    }

    render() {

        return (
            <div id="booking-form-page">
                <Banner />
                <form id="booking-form">
                    <p>马上填写您的找老师需求 为您推荐的机构或者老师在<b>24小时</b>内联系你</p>

                    <input className={ classnames({ "error": !this.state.courseAvailable }) } ref="course" type="text" placeholder="您想学什么（例如：初二物理、钢琴等）"/>
                    <input className={ classnames({ "error": !this.state.nameAvailable }) } ref="name" type="text" placeholder="您的姓名"/>
                    <input className={ classnames({ "error": !this.state.mobileAvailable }) } ref="mobile" type="text" placeholder="您的手机号码（老师将通过该号码找到你）"/>
                    <input className={ classnames({ "error": !this.state.addressAvailable }) } ref="address" type="text" placeholder="您希望上课的地点（我们会就近为您推荐）"/>
                    <input className={ classnames({ "error": !this.state.ageAvailable }) } ref="age" type="text" placeholder="您的年龄"/>
                    <input className={classnames({
                        "submiting": this.state.submiting,
                    }) } type="button" value={ this.state.submiting ? "提交需求中..." : "立即找好老师" } onClick={ this.handlerSubmit.bind(this) }/>
                </form>
            </div>
        )
    }
}
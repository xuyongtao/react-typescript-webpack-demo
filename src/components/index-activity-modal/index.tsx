import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import { Link } from "react-router";
import * as QueueAnim from "rc-queue-anim";

interface ActivityModalProps {
    visible: boolean;
    handlerClose?(): void;
    handlerActivityModalGo?(): void;
    image: {
        ele: HTMLImageElement;
        alt: string;
    };
}
interface ActivityModalState {
    maskVisible: boolean;
}
export default class ActivityModal extends React.Component<ActivityModalProps, ActivityModalState> {
    static propTypes = {
        visible: React.PropTypes.bool.isRequired,
        handlerClose: React.PropTypes.func,
        image: React.PropTypes.object.isRequired,
    }

    constructor(props: ActivityModalProps, context: ActivityModalState) {
        super(props, context);

        this.state = {
            maskVisible: this.props.visible || false,
        }
    }

    handlerAnimEnd({ key, type }: { key: string; type: string }) {
        if (type === "leave") {
            this.setState({
                maskVisible: false,
            })
        } else {
            this.setState({
                maskVisible: true,
            })
        }
    }

    handlerClose() {
        this.props.handlerClose && this.props.handlerClose();
    }

    handlerGo() {
        this.props.handlerActivityModalGo && this.props.handlerActivityModalGo();
    }

    render() {
        return (
            <div id="activity-modal">
                { this.state.maskVisible || this.props.visible ? <div className="mask" /> : null }
                <QueueAnim
                    className="content"
                    duration={ 350 }
                    type={ "top" }
                    ease={ "easeQutQuart" }
                    animConfig={{
                        opacity: [1, 0],
                        translateY: [0, "-11rem"]
                    }}
                    onEnd={ this.handlerAnimEnd.bind(this) }
                    >
                    {
                        this.props.visible ?
                            <div key="activity-modal">
                                <i onClick={ this.handlerClose.bind(this) }>{ String.fromCharCode(parseInt("e61a", 16)) }</i>
                                <div onClick={ this.handlerGo.bind(this) }>
                                    <img src={ this.props.image.ele.src } alt={ this.props.image.alt }/>
                                    <p>点击立即围观</p>
                                </div>
                            </div> :
                            null
                    }

                </QueueAnim>
            </div>
        )
    }
}
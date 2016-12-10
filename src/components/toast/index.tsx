import './index.less';

import * as React from "react";
import { render } from "react-dom";
import * as Modal from "react-modal";

interface ToastProps {
    isOpen: boolean;
    tip?: string;
    iconClassName?: string;
    style?: {
        content?: {
            [key: string]: any;
        },
        overlay?: {
            [key: string]: any;
        }
    }
}

export default class Toast extends React.Component<ToastProps, any> {
    static propTypes = {
        isOpen: React.PropTypes.bool.isRequired,
        tip: React.PropTypes.string.isRequired,
        iconClassName: React.PropTypes.string.isRequired,
    }
    static defaultProps = {
        tip: "加载中...",
        iconClassName: "icon-loading",
        style: {
            overlay: {

            },
            content: {

            }
        }
    }

    constructor(props: ToastProps, context: any) {
        super(props, context);
    }

    render() {
        const { isOpen, tip, iconClassName, style } = this.props;

        return (
            <Modal
                overlayClassName="toast-overlay"
                className="toast"
                isOpen={ isOpen }
                >
                <i className={ iconClassName }></i>
                <span>{ tip }</span>
            </Modal>
        )
    }
}


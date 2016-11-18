import './index.less';

import * as React from "react";
import { render } from "react-dom";
import * as Modal from "react-modal";
import { ModalOverlayBackgroundColor } from "../../js/common/config";

interface SuccessModalProps {
    isOpen: boolean;
    style?: {
        content?: {
            [key: string]: any;
        },
        overlay?: {
            [key: string]: any;
        }
    }
}

export default class SuccessModal extends React.Component<SuccessModalProps, any> {
    static propTypes = {
        isOpen: React.PropTypes.bool.isRequired,

    }
    static defaultProps = {
        style: {
            overlay: {
                backgroundColor: ModalOverlayBackgroundColor,
                width: "4.2rem",
                minHeight: "4.2rem",
                top: "50%",
                left: "50%",
                right: "initial",
                bottom: "initial",
                marginTop: "-2.1rem",
                marginLeft: "-2.1rem",
                borderRadius: "5px",
            },
            content: {

            }
        }
    }

    constructor(props: SuccessModalProps, context: any) {
        super(props, context);
    }

    render() {
        const { isOpen, style } = this.props;

        return (
            <Modal
                className="success-modal"
                isOpen={ isOpen }
                style={ style }
                >
                <i>{ String.fromCharCode(parseInt("e62f", 16)) }</i>
                <span>已完成</span>
            </Modal>
        )
    }
}


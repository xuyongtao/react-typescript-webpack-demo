import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as QueueAnim from "rc-queue-anim";

interface BackToTopProps {
    showed: boolean;
    onBackToTop(): void;
}

export default class BackToTop extends React.Component<BackToTopProps, any> {
    static defaultProps = {
        showed: React.PropTypes.bool.isRequired,
        onBackToTop: React.PropTypes.func,
    }

    constructor(props: BackToTopProps, context: any) {
        super(props, context);
    }
    handleBackToTop() {
        document.body.scrollTop = 0;

        this.props.onBackToTop && this.props.onBackToTop();
    }

    render() {
        return (
            <QueueAnim
                duration={ 200 }
                type={ "right" }
                ease={ "easeQutQuart" }
                animConfig={{
                    opacity: [1, 1],
                    translateX: [0, "0.4rem"]
                }}
                >
                {
                    this.props.showed ?
                        <div key="back-top" className="back-top-btn" onClick={ this.handleBackToTop.bind(this) }>{ String.fromCharCode(parseInt("e631", 16)) }</div> :
                        null
                }
            </QueueAnim>
        )
    }
}
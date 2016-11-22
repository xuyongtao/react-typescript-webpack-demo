import "./index.less";

import * as React from "react";
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as QueueAnim from 'rc-queue-anim';

export default class Test extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            items: ['hello', 'world', 'click', 'me'],
            show: true,
        }
    }
    handleAdd() {
        var newItems =
            this.state.items.concat([prompt('Enter some text')]);
        this.setState({ items: newItems });
    }

    handleRemove(i: number) {
        var newItems = this.state.items.slice();
        newItems.splice(i, 1);
        this.setState({ items: newItems });
    }

    handleClick() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        var items = this.state.items.map(function (item: string, i: number) {
            return (
                <div key={item} onClick={this.handleRemove.bind(this, i) }>
                    {item}
                </div>
            );
        }.bind(this));
        return (
            <div>
                <div onClick={this.handleClick.bind(this) } >切换</div>
                <QueueAnim
                    key="example"
                    delay={300}
                    type={["top", "top"]}
                    >
                    {this.state.show ? [
                        <div key="a">依次进场</div>,
                        <div key="b">依次进场</div>,
                        <div key="c">依次进场</div>,
                        <div key="d">依次进场</div>
                    ] : null }

                </QueueAnim>
            </div>
        );
    }
} 
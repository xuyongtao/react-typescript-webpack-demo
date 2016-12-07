import './index.less';
import * as React from "react";

interface EmptyListProps {
    tip: string;
}

export default class EmptyList extends React.Component<EmptyListProps, any> {
    static propTypes = {
        tip: React.PropTypes.string,
    }

    static defaultProps = {
        tip: "没有找到相应数据",
    }

    render() {
        return (
            <div className="empty-list">
                <img src={ require('./images/bg.png') } alt={ this.props.tip } />
                <p>{ this.props.tip }</p>
            </div>
        )
    }
}
import "./index.less";

import * as React from "react";
import { render } from "react-dom";

import * as classNames from "classnames";
import * as Lodash from "lodash";

interface FilterProps {
    conditions?: {
        type: string;
        tid: any;
        options: {
            name: string;
            oid: any;
        }[];
    }[];
    initConditions?: number[];
}


class Filter extends React.Component<FilterProps, any> {
    static propTypes = {
        conditions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        initConditions: React.PropTypes.array,
    }
    static defaultProps = {

    }

    constructor(props: FilterProps, context: any) {
        super(props, context);
    }

    // 重置功能
    onReset() {
        Lodash.each(this.refs, (ref: FilterCondition) => {
            ref.onReset();
        })
    }
    // 确定功能
    onConfirm() {

    }
    // 选中功能
    onChoose(option: FilterConditionOption) {
        console.log("外部调用选中功能...", option);
    }

    render() {
        return (
            <div className="filter-pannel">
                { this.props.conditions.map((condition, index) => {
                    return (
                        <FilterCondition ref={ `condition${index}` } key={ index } { ...condition } onChoose={ this.onChoose } />
                    )
                }) }
                <div className="filter-action-btns">
                    <span className="filter-action-reset-btn" onClick={ this.onReset.bind(this) }>重置</span>
                    <span className="filter-action-confirm-btn" onClick={ this.onConfirm }>确定</span>
                </div>
            </div>
        );
    }
}


interface FilterConditionOption {
    name: string;
    oid: any;
}
interface FilterConditionProps {
    type: string;
    tid: any;
    options: FilterConditionOption[];
    onChoose(option: FilterConditionOption): void;
}
interface FilterConditionState {
    choosedIndex: number;
}

class FilterCondition extends React.Component<FilterConditionProps, FilterConditionState> {
    static propTypes = {
        type: React.PropTypes.string,
        tid: React.PropTypes.number,
        options: React.PropTypes.array,
        onChoose: React.PropTypes.func,
    }
    initState: FilterConditionState;

    constructor(props: FilterConditionProps, context: FilterConditionState) {
        super(props, context);
        this.state = this.initState = {
            choosedIndex: 0,
        }
    }

    onChoose(index: number) {
        this.setState({
            choosedIndex: index,
        })
        this.props.onChoose(this.props.options[index]);
    }

    onReset() {
        this.setState(this.initState);
    }

    render() {
        return (
            <div className="filter-condition">
                <strong className="filter-condition-type">{ this.props.type }</strong>
                <div className="filter-condition-options">
                    { this.props.options.map((option, index) => {
                        return (
                            <span key={ index } className={classNames({
                                "filter-condition-option": true,
                                "filter-condition-option-choosed": this.state.choosedIndex === index
                            }) } onClick={ this.onChoose.bind(this, index) }>{ option.name }</span>
                        )
                    }) }
                </div>
            </div>
        )
    }
}

export default class FilterBar extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        const filterProps = {
            conditions: [{
                type: "授课方式",
                tid: 1,
                options: [{
                    name: "不限",
                    oid: 1,
                }, {
                        name: "在线教学",
                        oid: 2,
                    }, {
                        name: "老师上门",
                        oid: 3,
                    }, {
                        name: "学生上门",
                        oid: 4,
                    }, {
                        name: "协商地点",
                        oid: 5,
                    }]
            }, {
                    type: "教龄",
                    tid: 2,
                    options: [{
                        name: "不限",
                        oid: 1,
                    }, {
                            name: "1年",
                            oid: 2,
                        }, {
                            name: "2年",
                            oid: 3,
                        }, {
                            name: "3年",
                            oid: 4,
                        }, {
                            name: "4年",
                            oid: 5,
                        }]
                }, {
                    type: "身份",
                    tid: 3,
                    options: [{
                        name: "不限",
                        oid: 1,
                    }, {
                            name: "老师",
                            oid: 2,
                        }, {
                            name: "在校生",
                            oid: 3,
                        }, {
                            name: "机构",
                            oid: 4,
                        }, {
                            name: "其他",
                            oid: 5,
                        }]
                }]
        }

        return (
            <div className="filter-bar">
                <Filter { ...filterProps } />
            </div>
        )
    }
}
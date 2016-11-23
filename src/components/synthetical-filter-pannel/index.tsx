import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as QueueAnim from 'rc-queue-anim';

import * as classNames from "classnames";
import * as Lodash from "lodash";

import FilterMask from "../filter-mask/index";

interface FilterConditionOption {
    name: string;
    oid: any;
}
interface FilterConditionProps {
    type: string;
    tid: any;
    options: FilterConditionOption[];
    onChoose(option: FilterConditionOption): void;
    initOption: number;
}
interface FilterConditionState {
    choosedOid: number;
}

class FilterCondition extends React.Component<FilterConditionProps, FilterConditionState> {
    static propTypes = {
        type: React.PropTypes.string,
        tid: React.PropTypes.number,
        options: React.PropTypes.array,
        onChoose: React.PropTypes.func,
        initOption: React.PropTypes.number,
    }
    initState: FilterConditionState;

    constructor(props: FilterConditionProps, context: FilterConditionState) {
        super(props, context);
        this.initState = {
            choosedOid: 1,
        }
        this.state = {
            choosedOid: this.props.initOption || this.initState.choosedOid,
        }
    }

    onChoose(oid: number) {
        this.setState({
            choosedOid: oid,
        })
        this.props.onChoose(Lodash.find(this.props.options, (o) => {
            return o.oid === oid;
        }));
    }

    onReset() {
        this.setState(this.initState);
    }

    onConfirm() {
        return this.state.choosedOid;
    }

    render() {
        return (
            <div className="synthetical-filter-condition">
                <strong className="synthetical-filter-condition-type">{ this.props.type }</strong>
                <div className="synthetical-filter-condition-options">
                    { this.props.options.map((option, index) => {
                        return (
                            <span key={ index } className={classNames({
                                "synthetical-filter-condition-option": true,
                                "synthetical-filter-condition-option-choosed": this.state.choosedOid === option.oid
                            }) } onClick={ this.onChoose.bind(this, option.oid) }>{ option.name }</span>
                        )
                    }) }
                </div>
            </div>
        )
    }
}

interface SyntheticalFilterProps {
    conditions?: {
        type: string;
        tid: any;
        options: {
            name: string;
            oid: any;
        }[];
    }[];
    initConditions?: number[];
    onClose(): void;
    currentFilterOptions: number[];
    onConfirmSyntheticalFilterOptions?(options: number[]): void;
    handlerAnimEnd?(): void;
    visible: boolean;
}

interface SyntheticalFilterStates {
    maskVisible: boolean;
}

export default class SyntheticalFilter extends React.Component<SyntheticalFilterProps, SyntheticalFilterStates> {
    static propTypes = {
        conditions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        initConditions: React.PropTypes.array,
        onClose: React.PropTypes.func,
        currentFilterOptions: React.PropTypes.array,
        onConfirmSyntheticalFilterOptions: React.PropTypes.func,
        visible: React.PropTypes.bool,
        handlerAnimEnd: React.PropTypes.func,
    }
    static defaultProps = {
        visible: false,
    }

    constructor(props: SyntheticalFilterProps, context: SyntheticalFilterStates) {
        super(props, context);

        this.state = {
            maskVisible: this.props.visible || false,
        }
    }

    // 重置功能
    onReset() {
        Lodash.each(this.refs, (ref: FilterCondition) => {
            ref.onReset();
        })
    }
    // 确定功能
    onConfirm() {
        const optionIds: number[] = [];

        Lodash.each(this.refs, (ref: FilterCondition) => {
            optionIds.push(ref.onConfirm());
        })
        console.log("综合筛选条件ids：", optionIds);

        if (this.props.onConfirmSyntheticalFilterOptions) {
            this.props.onConfirmSyntheticalFilterOptions(optionIds);
        }
    }
    // 选中功能
    onChoose(option: FilterConditionOption) {
        console.log("外部调用选中功能...", option);
    }
    // 关闭功能
    onClose() {
        if (this.props) {
            this.props.onClose();
        }
    }

    handlerAnimEnd({ key, type }: { key: string; type: string }) {
        this.setState({
            maskVisible: type === "enter",
        })
    }

    render() {
        return (
            <div className="synthetical-filter-wrapper">
                { this.props.visible || this.state.maskVisible ? <FilterMask classNames={["synthetical-filter-mask"]}/> : null }
                <QueueAnim
                    duration={ 450 }
                    type={ "right" }
                    ease={ "easeOutQuart" }
                    animConfig={{
                        opacity: [1, 1],
                        translateX: [0, "100%"]
                    }}
                    onEnd={ this.handlerAnimEnd.bind(this) }
                    >
                    { this.props.visible ? <div key="filter" className="synthetical-filter-pannel">
                        <div className="synthetical-filter-conditions">
                            { this.props.conditions.map((condition, index) => {
                                let props = {
                                    onChoose: this.onChoose,
                                    initOption: this.props.currentFilterOptions[index],
                                }

                                return (
                                    <FilterCondition key={ index } ref={ `condition${index}` } { ...props } { ...condition } />
                                )
                            }) }
                        </div>
                        <div className="synthetical-filter-action-btns">
                            <span className="synthetical-filter-action-reset-btn" onClick={ this.onReset.bind(this) }>重置</span>
                            <span className="synthetical-filter-action-confirm-btn" onClick={ this.onConfirm.bind(this) }>确定</span>
                        </div>
                    </div> : null }
                </QueueAnim>
            </div>
        );
    }
}
require("./index.less");

import * as React from "react";
import { render } from "react-dom";
import * as ReactModal from "react-modal";
import SwipeableViews from "react-swipeable-views";
import * as ClassNames from "classnames";

import NarBar from "../../../components/nav-bar";
import LoadingToast from "../../../components/toast/index";
import SuccessModal from "../../../components/toast/index";
import { PriceUnitMap, ModalOverlayBackgroundColor, defaultCourseCover } from "../../../js/common/config";
import { getCourseDetail, booking } from "../../../js/store/index";

interface CourseDetailProps {
    params: {
        cid: string;
        [key: string]: any;
    }
}
interface CourseDetailStates {
    isOpenConsultModal?: boolean;
    isOpenSuccessModal?: boolean;
    isSubmitSuccess?: boolean;
    loading?: boolean;
    title?: string;
    detail?: string;
    cover?: string;
    onlinePrice?: number;
    indoorPrice?: number;
    outdoorPrice?: number;
    otherPrice?: number;
    priceUnit?: string;
}

export default class CourseDetail extends React.Component<CourseDetailProps, CourseDetailStates> {
    constructor(props: CourseDetailProps, context: CourseDetailStates) {
        super(props, context);

        this.state = {
            isOpenConsultModal: false,
            isOpenSuccessModal: false,
            isSubmitSuccess: false,
            loading: true,
            title: "",
            detail: "",
            cover: "",
            onlinePrice: 0,
            indoorPrice: 0,
            outdoorPrice: 0,
            otherPrice: 0,
            priceUnit: "课时",
        }
    }

    onOpenModal() {
        this.setState({
            isOpenConsultModal: true,
        })
    }

    onCloseModal() {
        this.setState({
            isOpenConsultModal: false,
        })
    }

    onSubmit() {


        this.setState({
            isOpenSuccessModal: true,
            isOpenConsultModal: false,
            isSubmitSuccess: true,
        })
        setTimeout(() => {
            this.setState({
                isOpenSuccessModal: false,
            })
        }, 1000)
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })

        getCourseDetail(Number(this.props.params.cid))
            .then(res => {
                this.setState({
                    loading: false,
                    title: res.title,
                    detail: res.cont,
                    cover: res.cover || defaultCourseCover,
                    onlinePrice: res.prices.online,
                    indoorPrice: res.prices.inDoor,
                    outdoorPrice: res.prices.outDoor,
                    otherPrice: res.prices.other,
                    priceUnit: res.prices.unit,
                })
            }, () => {
                this.setState({
                    loading: false,
                })
            })

    }

    render() {
        const { loading, title, cover, detail, onlinePrice, indoorPrice, otherPrice, outdoorPrice, priceUnit } = this.state;
        const ConsultModalProps = {
            cid: Number(this.props.params.cid),
            isOpen: this.state.isOpenConsultModal,
            onRequestClose: this.onCloseModal.bind(this),
            onSubmit: this.onSubmit.bind(this),
            handlerCancel: () => {
                this.setState({
                    isOpenConsultModal: false,
                })
            }
        };
        const SuccessModalProps = {
            isOpen: this.state.isOpenSuccessModal,
            tip: "已完成",
            iconClassName: "icon-complete",
        };
        const loadingToastProps = {
            isOpen: this.state.loading,
        };

        return (
            <div id="course-detail-page">
                <NarBar pageTitle="课程详情" />
                {
                    loading ?
                        <LoadingToast { ...loadingToastProps } /> :
                        <div>
                            <div className="course-cover">
                                <img src={ cover } alt={ title }/>
                            </div>
                            <div className="course-info">
                                <h2>{ title }</h2>
                                <div>{ detail }</div>
                            </div>
                            <div className="course-prices">
                                <h2>课程价格</h2>
                                <ul>
                                    {
                                        onlinePrice ?
                                            <li>在线教学 <strong>￥{ onlinePrice }</strong>/{ priceUnit }</li> :
                                            <li>在线教学 <strong>价格面议</strong></li>
                                    }
                                    {
                                        indoorPrice ?
                                            <li>老师上门 <strong>￥{ indoorPrice }</strong>/{ priceUnit }</li> :
                                            <li>老师上门 <strong>价格面议</strong></li>
                                    }
                                    {
                                        otherPrice ?
                                            <li>地点协商 <strong>￥{ otherPrice }</strong>/{ priceUnit }</li> :
                                            <li>地点协商 <strong>价格面议</strong></li>
                                    }
                                    {
                                        outdoorPrice ?
                                            <li>学生上门 <strong>￥{ outdoorPrice }</strong>/{ priceUnit }</li> :
                                            <li>学生上门 <strong>价格面议</strong></li>
                                    }
                                </ul>
                            </div>
                            <div className="btn-phone">
                                { this.state.isSubmitSuccess ? <span className="disabled">已成功填写信息</span> : <span onClick={ this.onOpenModal.bind(this) }>填写咨询信息，预约老师</span>}
                            </div>
                            <ConsultModal { ...ConsultModalProps } />
                            <SuccessModal { ...SuccessModalProps } />
                        </div>
                }
            </div>
        )
    }
}

interface ConsultModalProps {
    cid?: number;
    isOpen?: boolean;
    onAfterOpen?(): void;
    onRequestClose?(): void;
    closeTimeoutMS?: number;
    customStyle?: {
        overlay: {
            [key: string]: any
        },
        content: {
            [key: string]: any
        }
    };
    tabs?: string[];
    onSubmit?(): void;
    handlerCancel?(): void;
}
interface ConsultModalState {
    tabIndex?: number;
    isOpen?: boolean;
    submiting?: boolean;
}
class ConsultModal extends React.Component<ConsultModalProps, ConsultModalState> {
    static propTypes = {
        cid: React.PropTypes.number.isRequired,
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
        closeTimeoutMS: React.PropTypes.number,
        customStyle: React.PropTypes.object,
        handlerCancel: React.PropTypes.func,
    }
    static defaultProps = {
        isOpen: false,
        onAfterOpen: () => {
            console.log("after open function");
        },
        onRequestClose: () => {
            console.log("request function");
        },
        handlerCancel: () => {
            console.log("取消事件");
        },
        customStyle: {
            overlay: {
                backgroundColor: ModalOverlayBackgroundColor,
            }
        },
        tabs: ["填写信息", "全民教育公众号"],
    }

    onSwipe(index: number) {
        this.setState({
            tabIndex: index,
        })
    }
    onAfterOpen() {
        this.setState({
            tabIndex: 0,
        })
    }
    onChangeIndex(indexNew: number) {
        this.setState({
            tabIndex: indexNew,
        })
    }
    onSubmit() {
        if (this.state.submiting) return;

        const id = this.props.cid;
        const name = (this.refs["name"] as any).value.trim();
        const mobile = (this.refs["mobile"] as any).value.trim();
        const mark = (this.refs["mark"] as any).value.trim();

        if (!name || !mobile || !mark) {
            alert("请完成所有信息");
            return;
        }

        this.setState({
            submiting: true,
        })

        booking({ id, name, mobile, mark })
            .then(res => {
                this.props.onSubmit();
            }, () => {
                this.setState({
                    submiting: true,
                })
            })
    }
    constructor(props: ConsultModalProps, state: ConsultModalState) {
        super(props, state);

        this.state = {
            submiting: false,
            tabIndex: 0,
            isOpen: this.props.isOpen,
        }
    }

    render() {
        const { tabs, isOpen, onRequestClose, handlerCancel, closeTimeoutMS, customStyle } = this.props;
        const { submiting } = this.state;
        const swipeableViewsProps = {
            index: this.state.tabIndex,
            onChangeIndex: this.onChangeIndex.bind(this),
            animateTransitions: false,
        }

        return (
            <ReactModal
                className="consult-modal"
                isOpen={ isOpen }
                onAfterOpen={ this.onAfterOpen.bind(this) }
                onRequestClose={ onRequestClose }
                closeTimeoutMS={ closeTimeoutMS }
                style={ customStyle }
                >

                <ul className="consult-modal-tabs">
                    { tabs.map((tab, index) => {
                        return (
                            <li className={ClassNames({
                                active: index === this.state.tabIndex,
                            }) } onClick={ this.onSwipe.bind(this, index) }  key={ index }>{ tab }</li>
                        )
                    }) }
                </ul>
                <SwipeableViews { ...swipeableViewsProps }>
                    <div className="consult-form">
                        <input ref="name" type="text" placeholder="您的姓名"/>
                        <input ref="mobile" type="text" placeholder="您的联系方式（手机）"/>
                        <textarea ref="mark" name="" id="" rows="3" placeholder="请输入您想了解的信息，方便老师电话回访沟通"></textarea>
                        <div className="btn-group">
                            <span onClick={ handlerCancel }>取消预约</span>
                            <span onClick={ this.onSubmit.bind(this) } className={ClassNames("btn-submit", {
                                "btn-disabled": submiting,
                            }) }>{ submiting ? "提交中..." : "确定提交" }</span>
                        </div>
                    </div>
                    <div className="qr-code">
                        <img src={ require("./qr-code.jpg") } alt="二维码"/>
                        <p>扫一扫上面的二维码图片，关注“全民教育网”获取更多教育资讯</p>
                    </div>
                </SwipeableViews>

            </ReactModal>
        )
    }
}   

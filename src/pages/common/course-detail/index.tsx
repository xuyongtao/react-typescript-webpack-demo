import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as ReactModal from "react-modal";
import SwipeableViews from "react-swipeable-views";
import * as ClassNames from "classnames";

import NarBar from "../../../components/nav-bar";
import Loading from "../../../components/loading/index";
import SuccessModal from "../../../components/success-modal/index";
import { PriceUnitMap, ModalOverlayBackgroundColor } from "../../../js/common/config";

interface CourseDetailProps {

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
    priceUnitId?: number;
}

export default class CourseDetail extends React.Component<CourseDetailProps, CourseDetailStates> {
    constructor(props: CourseDetailProps, context: CourseDetailStates) {
        super(props, context);

        this.state = {
            isOpenConsultModal: false,
            isOpenSuccessModal: false,
            isSubmitSuccess: false,
            loading: true,
            title: "钢琴一对一私教",
            detail: "钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教钢琴一对一私教",
            cover: require("../../../img/default-course-cover.png"),
            onlinePrice: 120,
            indoorPrice: 120,
            outdoorPrice: 120,
            otherPrice: 120,
            priceUnitId: 1,
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
        // 请求course数据
        this.setState({
            loading: false,
        })
    }

    render() {
        const { loading, title, cover, detail, onlinePrice, indoorPrice, otherPrice, outdoorPrice, priceUnitId } = this.state;
        const ConsultModalProps = {
            isOpen: this.state.isOpenConsultModal,
            onRequestClose: this.onCloseModal.bind(this),
            onSubmit: this.onSubmit.bind(this),
        }
        const SuccessModalProps = {
            isOpen: this.state.isOpenSuccessModal,
        }

        return (
            <div id="course-detail-page">
                <NarBar pageTitle="课程详情" />
                {
                    loading ?
                        <Loading /> :
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
                                    <li>在线教学 <strong>￥{ onlinePrice }</strong>/{ PriceUnitMap[priceUnitId]}</li>
                                    <li>老师上门 <strong>￥{ indoorPrice }</strong>/{ PriceUnitMap[priceUnitId]}</li>
                                    <li>地点协商 <strong>￥{ otherPrice }</strong>/{ PriceUnitMap[priceUnitId]}</li>
                                    <li>学生上门 <strong>￥{ outdoorPrice }</strong>/{ PriceUnitMap[priceUnitId]}</li>
                                </ul>
                            </div>
                            <div className="btn-phone">
                                { this.state.isSubmitSuccess ? <span className="disabled">已成功填写信息</span> : <span onClick={ this.onOpenModal.bind(this) }>填写咨询信息，预约老师</span>}
                            </div>
                        </div>
                }
                <ConsultModal { ...ConsultModalProps } />
                <SuccessModal { ...SuccessModalProps } />
            </div>
        )
    }
}

interface ConsultModalProps {
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
}
interface ConsultModalState {
    tabIndex?: number;
    isOpen?: boolean;
}
class ConsultModal extends React.Component<ConsultModalProps, ConsultModalState> {
    static propTypes = {
        isOpen: React.PropTypes.bool,
        onAfterOpen: React.PropTypes.func,
        onRequestClose: React.PropTypes.func,
        closeTimeoutMS: React.PropTypes.number,
        customStyle: React.PropTypes.object,
    }
    static defaultProps = {
        isOpen: false,
        onAfterOpen: () => {
            console.log("after open function");
        },
        onRequestClose: () => {
            console.log("request function");
        },
        customStyle: {
            overlay: {
                backgroundColor: ModalOverlayBackgroundColor,
            }
        },
        tabs: ["填写信息", "老师微信"],
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
        this.props.onSubmit();
    }
    constructor(props: ConsultModalProps, state: ConsultModalState) {
        super(props, state);
        console.log(this.props.isOpen)
        this.state = {
            tabIndex: 0,
            isOpen: this.props.isOpen,
        }
    }

    render() {
        const { tabs, isOpen, onRequestClose, closeTimeoutMS, customStyle } = this.props;
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
                        <input type="text" placeholder="您的姓名"/>
                        <input type="text" placeholder="您的联系方式（手机）"/>
                        <textarea name="" id="" rows="3" placeholder="请输入您想了解的信息，方便老师电话回访沟通"></textarea>
                        <span onClick={ this.onSubmit.bind(this) } className="btn-submit">确定提交</span>
                    </div>
                    <div className="qr-code">
                        <img src={ require("./qr-code1.png") } alt="二维码"/>
                        <p>扫一扫上面的二维码图片，加老师微信进行咨询</p>
                    </div>
                </SwipeableViews>

            </ReactModal>
        )
    }
}   

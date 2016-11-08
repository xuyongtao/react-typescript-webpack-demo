import "./index.less";
import * as React from "react";
import { render, findDOMNode } from "react-dom";
import { TouchEvent, UIEvent } from "react";

class SwiperSlide extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

    }

    componentDidMount() {

    }

    render() {
        let slideStyle = {
            width: this.props.width,
            marginLeft: this.props.index === 0 ? 0 : this.props.grapWidth,
            backgroundImage: `url(${require(this.props.picSrc)})`,
        }

        return (
            <li style={ slideStyle }></li>
        )
    }
}

class SwiperPaginationBullet extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

    }

    clickHandler(index: number) {
        this.props.clickHandler(index);
    }

    render() {
        return (
            <span
                className={ "swiper-pagination-bullet" + (this.props.active ? " swiper-pagination-bullet-active" : "") }
                onClick={ this.clickHandler.bind(this, this.props.index) }
                ></span>
        )
    }
}

class Swiper extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

        this.state = {
            current: this.props.defaultCurrent || 1,
            startClientX: 0,
            endClientX: 0,
            // swiperWidth: this.props.defaultSwiperWidth || 375,
            swiperWidth: 0,
            dragLen: 0,
        }

    }

    pre() {
        let index = (this.state.current - 1) || 1;

        this.setState({
            current: index,
            dragLen: - (this.state.swiperWidth + this.props.grapWidth) * (index - 1),
        })
    }

    next() {
        let index = ((this.state.current + 1) > this.props.pics.length ? this.state.current : (this.state.current + 1));

        this.setState({
            current: index,
            dragLen: - (this.state.swiperWidth + this.props.grapWidth) * (index - 1),
        })
    }

    go(index: number) {
        this.setState({
            current: index,
            dragLen: - (this.state.swiperWidth + this.props.grapWidth) * (index - 1),
        })
    }

    touchMoveHandler(event: TouchEvent) {
        let touches = event.touches;
        let picsCount = this.props.pics.length;
        let dragLen = touches[0].clientX - this.state.startClientX;

        if (
            (this.state.current === 1 && dragLen > 0) ||
            (this.state.current === picsCount && dragLen < 0)
        ) {// 如果是第一张或者最后一张则不给拖拽
            return;
        }

        this.setState({
            dragLen: dragLen - (this.state.current - 1) * this.state.swiperWidth,
        })
    }

    touchStartHandler(event: TouchEvent) {
        let touches = event.touches;

        this.setState({
            startClientX: touches[0].clientX,
        })
    }

    touchEndHandler() {
        let dragLen = this.state.dragLen + (this.state.current - 1) * this.state.swiperWidth;
        let plaitLen = this.state.swiperWidth / 3;
        let direction = dragLen > 0 ? -1 : 1;

        if (direction === 1 && dragLen < - plaitLen) {
            this.next();
        } else if (direction === -1 && dragLen > plaitLen) {
            this.pre();
        } else {
            this.go(this.state.current);
        }
    }

    scrollHandler(e: UIEvent) {
        e.stopPropagation();
    }

    getClientWidth() {
        let clientWidth = findDOMNode(this.refs['swiper']).clientWidth;

        return clientWidth > this.props.maxSwiperWidth ? this.props.maxSwiperWidth : clientWidth;
    }

    componentDidMount() {
        this.setState({
            swiperWidth: this.getClientWidth(),
        })
    }

    render() {
        let swiperSlideProps = {
            index: 0,
            picSrc: '',
            width: this.state.swiperWidth,
            grapWidth: this.props.grapWidth,
        };

        let swiperStyle = this.state.swiperWidth ? { width: this.state.swiperWidth } : null;

        let swiperSlideContainer = {
            marginLeft: this.state.dragLen || - (this.state.current - 1) * (this.state.swiperWidth + this.props.grapWidth),
            width: this.props.pics.length * (this.state.swiperWidth + this.props.grapWidth) - this.props.grapWidth,
        };

        return (
            <div>
                <div style={ {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#000',
                } }></div>
                <div
                    style={ swiperStyle }
                    id="swiper"
                    ref="swiper"
                    onTouchStart={ this.touchStartHandler.bind(this) }
                    onTouchEnd={ this.touchEndHandler.bind(this) }
                    onTouchMove={ this.touchMoveHandler.bind(this) }
                    onScroll={ this.scrollHandler.bind(this) }
                    >
                    <ul style={ swiperSlideContainer }>
                        { this.props.pics.map((pic: string, index: number) => {
                            swiperSlideProps.picSrc = pic;
                            swiperSlideProps.index = index;

                            return (
                                <SwiperSlide key={ index } { ...swiperSlideProps } />
                            )
                        }) }
                    </ul>
                    <div className="swiper-pagination">
                        { this.props.pics.map((pic: string, index: number) => {
                            let props = {
                                key: index,
                                index,
                                active: this.state.current === index + 1,
                                clickHandler: this.go.bind(this),
                            };

                            return (
                                <SwiperPaginationBullet { ...props } />
                            )
                        }) }
                    </div>
                </div>
            </div>

        )
    }
}

export default class TeacherPhotos extends React.Component<any, any> {
    constructor() {
        super();

        this.state = {
            pics: ["./pic1.jpeg", "./pic2.jpeg", "./pic3.jpeg", "./pic4.jpeg", "./pic5.jpeg"],
        }
    }

    componentDidMount() {

    }

    render() {
        console.log('构建相册', this.refs["gallery"]);
        let swiperProps = {
            pics: ["./pic2.jpeg", "./pic1.jpeg", "./pic3.jpeg", "./pic4.jpeg", "./pic5.jpeg"],
            grapWidth: 8,
            maxSwiperWidth: 640,
            defaultCurrent: 1,
        }


        return (
            <div id="gallery-wall">
                <Swiper { ...swiperProps } />
                <div className="gallery-wall-left">
                    <div className="gallery-wall-item">
                        <img src={ require("./pic1.jpeg") } alt=""/>
                    </div>
                    <div className="gallery-wall-item">
                        <img src={ require("./pic2.jpeg") } alt=""/>
                    </div>
                    <div className="gallery-wall-item">
                        <img src={ require("./pic5.jpeg") } alt=""/>
                    </div>
                </div>
                <div className="gallery-wall-right">
                    <div className="gallery-wall-item">
                        <img src={ require("./pic3.jpeg") } alt=""/>
                    </div>
                    <div className="gallery-wall-item">
                        <img src={ require("./pic4.jpeg") } alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}


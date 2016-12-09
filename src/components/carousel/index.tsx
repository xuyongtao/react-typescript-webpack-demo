import "./index.less";

import * as React from "react";
import { render } from "react-dom";
import * as classNames from "classnames";

import * as Carousel from "nuka-carousel";

interface PhotoCarouselProps {
    pics: string[];
    autoplay?: boolean;
    autoplayInterval?: number;
    wrapAround?: boolean;
    slideIndex?: number;
    initialSlideHeight?: number;
    slidesToShow?: number;
}

export default class PhotoCarousel extends React.Component<PhotoCarouselProps, any> {
    static propTypes = {
        autoplay: React.PropTypes.bool,
        autoplayInterval: React.PropTypes.number,
        pics: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        wrapAround: React.PropTypes.bool,
        slideIndex: React.PropTypes.number,
        initialSlideHeight: React.PropTypes.number,
        slidesToShow: React.PropTypes.number,
    }

    static defaultProps = {
        autoplay: true,
        autoplayInterval: 3000,
        wrapAround: true,
        slideIndex: 0,
        initialSlideHeight: 210,
        slidesToShow: 1,
    }

    constructor(props: PhotoCarouselProps) {
        super(props);
    }

    componentDidMount() {
        // hack（详情看：https://github.com/FormidableLabs/nuka-carousel/issues/103）
        setTimeout(() => {
            (this.refs["carousel"] as any).setDimensions();
        }, 0);
    }

    render() {
        return (
            <div className="carousel-wrapper">
                <Carousel
                    ref="carousel"
                    autoplay={ this.props.autoplay && this.props.pics.length > 1 }
                    autoplayInterval={ this.props.autoplayInterval }
                    decorators={[{
                        component: React.createClass({
                            render() {
                                let slideCount: number = this.props.slideCount;
                                let currentSlide: number = this.props.currentSlide;
                                let slideArray = new Array(slideCount + 1).join("0").split("");

                                return (
                                    <ul className="carousel-dots">
                                        { slideArray.map((cont, index) => {
                                            return (
                                                <li key={ index } className={classNames("carousel-dot", {
                                                    "carousel-dot-active": index === currentSlide,
                                                }) } onClick={ () => { this.props.goToSlide(index) } }></li>
                                            )
                                        }) }
                                    </ul>
                                )
                            }
                        }),
                        position: "BottomCenter",
                    }]}
                    wrapAround={ this.props.wrapAround }
                    slideIndex={ this.props.slideIndex }
                    initialSlideHeight={ this.props.initialSlideHeight }
                    slidesToShow={ this.props.slidesToShow }
                    dragging={ this.props.pics.length > 1 }
                    >
                    { this.props.pics.map((pic, index) => {
                        return (
                            <img key={ index } src={ pic } />
                        )
                    }) }
                </Carousel>
            </div>
        )
    }
}
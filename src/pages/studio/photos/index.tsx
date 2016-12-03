import "./index.less";
import * as React from "react";
import { render } from "react-dom";

import LazyLoad from "react-lazyload";
import * as Carousel from "nuka-carousel";

import PhotosCarousel from "../../../components/photos-carousel/index";

interface StudioPhotosProps {
    params: {
        [key: string]: any
    },
}
interface StudioPhotosStates {
    hiddenCarousel?: boolean;
    pics?: string[];
    slideIndex?: number;
}

export default class TeacherPhotos extends React.Component<StudioPhotosProps, StudioPhotosStates> {
    constructor(props: StudioPhotosProps, context: StudioPhotosStates) {
        super(props, context);

        this.state = {
            hiddenCarousel: true,
            pics: [],
            slideIndex: 0,
        };
    }

    showPhotosCarousel(index: number) {
        this.setState({
            hiddenCarousel: false,
            slideIndex: index,
        })
    }

    hidePhotosCarousel() {
        this.setState({
            hiddenCarousel: true,
        })
    }

    componentDidMount() {
        // 通过请求获取图片的链接地址
        this.setState({
            pics: [
                require("../../teacher/photos/images/pic6.png"),
                require("../../teacher/photos/images/pic7.png"),
                require("../../teacher/photos/images/pic8.png"),
                require("../../teacher/photos/images/pic9.png"),
            ],
        })
    }

    render() {
        const lazyloadProps = {
            height: 200,
        };
        const pics = {
            left: this.state.pics.slice(0, Math.floor(this.state.pics.length / 2)),
            right: this.state.pics.slice(Math.floor(this.state.pics.length / 2), this.state.pics.length),
        };
        const carouselProps = {
            pics: this.state.pics,
            slideIndex: this.state.slideIndex,
            handlerClose: this.hidePhotosCarousel.bind(this),
            hidden: this.state.hiddenCarousel,
        }

        return (
            <div id="gallery-wall">
                { this.state.hiddenCarousel ? null : <PhotosCarousel ref="carousel" { ...carouselProps } /> }
                <div className="gallery-wall-left">
                    { pics.left.map((pic, index) => {
                        return (
                            <div key={ index } className="gallery-wall-item" onClick={ this.showPhotosCarousel.bind(this, index) }>
                                <LazyLoad { ...lazyloadProps }>
                                    <img src={ pic } alt={ `图片${index}` }/>
                                </LazyLoad>
                            </div>
                        )
                    }) }
                </div>
                <div className="gallery-wall-right">
                    { pics.right.map((pic, index) => {
                        return (
                            <div key={ index } className="gallery-wall-item" onClick={ this.showPhotosCarousel.bind(this, index + Math.floor(this.state.pics.length / 2)) }>
                                <LazyLoad { ...lazyloadProps }>
                                    <img src={ pic } alt={ `图片${index + Math.floor(this.state.pics.length / 2)}` }/>
                                </LazyLoad>
                            </div>
                        )
                    }) }
                </div>
            </div>
        )
    }
}




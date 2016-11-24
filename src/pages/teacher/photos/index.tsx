import "./index.less";
import * as React from "react";
import { render, findDOMNode } from "react-dom";
import { TouchEvent, UIEvent } from "react";

import LazyLoad from "react-lazyload";
import * as Carousel from "nuka-carousel";

import * as Lodash from "lodash";

interface PhotosCarouselProps {
    pics: string[];
    slideIndex: number;
    handlerClose?(): void;
}

class PhotosCarousel extends React.Component<PhotosCarouselProps, any> {
    static propTypes = {
        pics: React.PropTypes.array.isRequired,
        slideIndex: React.PropTypes.number,
        handlerClose: React.PropTypes.func,
    }

    componentDidMount() {

    }

    render() {

        return (
            <div id="teacher-gallery-carousel" onClick={ () => { this.props.handlerClose() } }>
                <Carousel
                    autoplay={ false }
                    decorators={[]}
                    wrapAround={ true }
                    slideIndex={ this.props.slideIndex }
                    >
                    { this.props.pics.map((pic, index) => {
                        return (
                            <div key={ index } style={ {
                                backgroundImage: `url(${require(pic)})`,
                            } } ></div>
                        )
                    }) }
                </Carousel>
            </div>
        )
    }
}

interface TeacherPhotosProps {
    params: {
        [key: string]: any
    },
}
interface TeacherPhotosStates {
    hiddenCarousel?: boolean;
    pics?: string[];
    slideIndex?: number;
}

export default class TeacherPhotos extends React.Component<TeacherPhotosProps, TeacherPhotosStates> {
    constructor(props: TeacherPhotosProps, context: TeacherPhotosStates) {
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
            pics: ["./pic2.jpeg", "./pic3.jpeg", "./pic1.jpeg", "./pic4.jpeg", "./pic6.png", "./pic5.jpeg", "./pic7.png", "./pic8.png", "./pic10.jpeg", "./pic9.png", "./pic2.jpeg", "./pic1.jpeg", "./pic5.jpeg", "./pic3.jpeg", "./pic4.jpeg", "./pic6.png", "./pic8.png", "./pic9.png", "./pic10.jpeg", "./pic7.png"],
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
                                    <img src={ require(pic) } alt={ `图片${index}` }/>
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
                                    <img src={ require(pic) } alt={ `图片${index + Math.floor(this.state.pics.length / 2)}` }/>
                                </LazyLoad>
                            </div>
                        )
                    }) }
                </div>
            </div>
        )
    }
}




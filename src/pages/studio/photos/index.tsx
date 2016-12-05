import "./index.less";
import * as React from "react";
import { render } from "react-dom";

import LazyLoad from "react-lazyload";
import * as Carousel from "nuka-carousel";

import PhotosCarousel from "../../../components/photos-carousel/index";

interface LazyLoadImageProps {
    src: string;
    alt?: string;
    handlerLoaded?(): number;
    handlerClick?(index: number): void;
}

class LazyLoadImage extends React.Component<LazyLoadImageProps, any> {
    static propTypes = {
        src: React.PropTypes.string.isRequired,
        alt: React.PropTypes.string,
        handlerLoaded: React.PropTypes.func,
        handlerClick: React.PropTypes.func,
    }

    private index: number;

    handlerClick() {
        if (this.props.handlerClick) {
            this.props.handlerClick(this.index);
        }
    }

    componentDidMount() {
        if (this.props.handlerLoaded) {
            this.index = this.props.handlerLoaded();
        }
    }

    render() {
        return (
            <img src={ this.props.src } alt={ this.props.alt } onClick={ this.handlerClick.bind(this) } />
        )
    }
}

interface StudioPhotosProps {
    params: {
        [key: string]: any
    },
}
interface StudioPhotosStates {
    hiddenCarousel?: boolean;
    pics?: string[];
    loadedPics?: string[];
    slideIndex?: number;
}

export default class StudioPhotos extends React.Component<StudioPhotosProps, StudioPhotosStates> {
    constructor(props: StudioPhotosProps, context: StudioPhotosStates) {
        super(props, context);

        this.state = {
            hiddenCarousel: true,
            pics: [],
            loadedPics: [],
            slideIndex: 0,
        };
    }

    private picsOfLeftPart: string[] = [];
    private picsOfRightPart: string[] = [];

    handlerShowPhotosCarousel(index: number) {
        this.setState({
            hiddenCarousel: false,
            slideIndex: index,
        })
    }

    handlerHidePhotosCarousel() {
        this.setState({
            hiddenCarousel: true,
        })
    }

    handlerAddLoadedPics(src: string, index: number) {
        let loadedPics = this.state.loadedPics;

        loadedPics[index] = src;
        this.setState({
            loadedPics,
        })

        return index;// 返回index
    }

    componentDidMount() {
        // 通过请求获取图片的链接地址
        let pics = [
            "http://st.qmin91.com/file/NgqZ8kyR5769fcbf0f59f", "http://st.qmin91.com/file/ygfoKcXm5769fdea91875",
            "http://st.qmin91.com/file/f2gbVVWW5769fdeac7ba7", "http://st.qmin91.com/file/mxCryDL4576b918bbd3b8",
            "http://st.qmin91.com/file/BjClyLiU576b919ecfb2b", "http://st.qmin91.com/file/87Ax0Y0H576b91a99d03f",
            "http://st.qmin91.com/file/ncJWCPzR583bd174b124e", "http://st.qmin91.com/file/aQQkssF1583bd183dd9d2",
            "http://st.qmin91.com/file/jcde8bsy577474d228a48", "http://st.qmin91.com/file/GrCHT6o6577474d243e91",
            "http://st.qmin91.com/file/JbSIH4rJ577474d2704b6", "http://st.qmin91.com/file/e6eUoe1z577481a44b348",
            "http://st.qmin91.com/file/FQBdbvVM577481a480618"
        ];
        this.setState({
            pics,
        })
        pics.forEach((value, index) => {
            if (index % 2 === 0) {
                this.picsOfLeftPart.push(value);
            } else {
                this.picsOfRightPart.push(value);
            }
        })
    }

    render() {
        const lazyloadProps = {
            height: 200,
        };
        const pics = {
            left: this.picsOfLeftPart,
            right: this.picsOfRightPart,
        };
        const carouselProps = {
            pics: this.state.loadedPics,
            slideIndex: this.state.slideIndex,
            handlerClose: this.handlerHidePhotosCarousel.bind(this),
            hidden: this.state.hiddenCarousel,
        }

        return (
            <div id="gallery-wall">
                { this.state.hiddenCarousel ? null : <PhotosCarousel ref="carousel" { ...carouselProps } /> }
                <div className="gallery-wall-left">
                    { pics.left.map((src, index) => {
                        return (
                            <div key={ index * 2 } className="gallery-wall-item">
                                <LazyLoad { ...lazyloadProps }>
                                    <LazyLoadImage
                                        src={ src }
                                        handlerLoaded={ this.handlerAddLoadedPics.bind(this, src, index * 2) }
                                        handlerClick={ this.handlerShowPhotosCarousel.bind(this) }
                                        />
                                </LazyLoad>
                            </div>
                        )
                    }) }
                </div>
                <div className="gallery-wall-right">
                    { pics.right.map((src, index) => {
                        return (
                            <div key={ index * 2 + 1 } className="gallery-wall-item">
                                <LazyLoad { ...lazyloadProps }>
                                    <LazyLoadImage
                                        src={ src }
                                        handlerLoaded={ this.handlerAddLoadedPics.bind(this, src, index * 2 + 1) }
                                        handlerClick={ this.handlerShowPhotosCarousel.bind(this) }
                                        />
                                </LazyLoad>
                            </div>
                        )
                    }) }
                </div>
            </div>
        )
    }
}




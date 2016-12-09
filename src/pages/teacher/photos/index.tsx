import "./index.less";
import * as React from "react";
import { render } from "react-dom";

import LazyLoad from "react-lazyload";
import * as Carousel from "nuka-carousel";

import PhotosCarousel from "../../../components/photos-carousel/index";
import LoadingToast from "../../../components/toast/index";
import EmptyList from "../../../components/empty-list/index";

import { getPhotoList } from "../../../js/store/index";
import { Role } from "../../../js/common/config";

import { PhotoBasic, ReceivePhotoListPost } from "../../../js/interface/common";
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

interface TeacherPhotosProps {
    params: {
        tid: string;
        [key: string]: any
    },
}
interface TeacherPhotosStates {
    loading: boolean;
    hiddenCarousel?: boolean;
    pics?: PhotoBasic[];
    picsOfLeftPart?: string[];
    picsOfRightPart?: string[];
    loadedPics?: string[];
    slideIndex?: number;
}

export default class TeacherPhotos extends React.Component<TeacherPhotosProps, TeacherPhotosStates> {
    constructor(props: TeacherPhotosProps, context: TeacherPhotosStates) {
        super(props, context);

        this.state = {
            loading: false,
            hiddenCarousel: true,
            pics: [],
            picsOfLeftPart: [],
            picsOfRightPart: [],
            loadedPics: [],
            slideIndex: 0,
        };
    }

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
        this.setState({
            loading: true,
        })

        getPhotoList({
            id: Number(this.props.params.tid),
            role: Role.teacher,
        })
            .then(res => {
                let pics = res.photos;
                let picsOfLeftPart: string[] = [];
                let picsOfRightPart: string[] = [];

                pics.forEach((item, index) => {
                    if (index % 2 === 0) {
                        picsOfLeftPart.push(item.mediumSrc);
                    } else {
                        picsOfRightPart.push(item.mediumSrc);
                    }
                })

                this.setState({
                    loading: false,
                    pics,
                    picsOfLeftPart,
                    picsOfRightPart,
                })
            }, () => {
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        const lazyloadProps = {
            height: 200,
        };
        const pics = {
            left: this.state.picsOfLeftPart,
            right: this.state.picsOfRightPart,
        };
        const carouselProps = {
            pics: this.state.loadedPics,
            slideIndex: this.state.slideIndex,
            handlerClose: this.handlerHidePhotosCarousel.bind(this),
            hidden: this.state.hiddenCarousel,
        };
        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: this.state.loading,
        };

        if (this.state.pics.length) {
            return (
                <div id="gallery-wall">
                    <LoadingToast { ...loadingToastProps } />
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
        } else {
            return (
                <EmptyList tip="该老师暂未上传图片" />
            )
        }
    }
}




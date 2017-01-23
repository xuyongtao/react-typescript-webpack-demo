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
    onLoaded?(): number;
    onClick?(index: number): void;
}

class LazyLoadImage extends React.Component<LazyLoadImageProps, any> {
    static propTypes = {
        src: React.PropTypes.string.isRequired,
        alt: React.PropTypes.string,
        onLoaded: React.PropTypes.func,
        onClick: React.PropTypes.func,
    }

    private index: number;

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.index);
        }
    }

    componentDidMount() {
        if (this.props.onLoaded) {
            this.index = this.props.onLoaded();
        }
    }

    render() {
        return (
            <img src={ this.props.src } alt={ this.props.alt } onClick={ this.handleClick.bind(this) } />
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
    loading?: boolean;
    hiddenCarousel?: boolean;
    pics?: PhotoBasic[];
    picsOfLeftPart?: PhotoBasic[];
    picsOfRightPart?: PhotoBasic[];
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

    handleShowPhotosCarousel(index: number) {
        this.setState({
            hiddenCarousel: false,
            slideIndex: index,
        })
    }

    handleHidePhotosCarousel() {
        this.setState({
            hiddenCarousel: true,
        })
    }

    handleAddLoadedPics(src: string, index: number) {
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
                let picsOfLeftPart: PhotoBasic[] = [];
                let picsOfRightPart: PhotoBasic[] = [];

                pics.forEach((pic, index) => {
                    if (index % 2 === 0) {
                        picsOfLeftPart.push(pic);
                    } else {
                        picsOfRightPart.push(pic);
                    }
                })

                this.setState({
                    pics,
                    picsOfLeftPart,
                    picsOfRightPart,
                })
            })
            .handle(() => {
                this.setState({
                    loading: false,
                })
            })
    }

    render() {
        const { pics, picsOfLeftPart, picsOfRightPart, loadedPics, slideIndex, hiddenCarousel, loading } = this.state;
        const lazyloadProps = {
            height: 200,
        };
        const carouselProps = {
            pics: this.state.loadedPics,
            slideIndex: this.state.slideIndex,
            handlerClose: this.handleHidePhotosCarousel.bind(this),
            hidden: this.state.hiddenCarousel,
        };
        const loadingToastProps = {
            tip: "加载中...",
            iconClassName: "icon-loading",
            isOpen: this.state.loading,
        };

        if (loading) {
            return (
                <LoadingToast { ...loadingToastProps } />
            )
        } else {
            return (
                <div>
                    <LoadingToast { ...loadingToastProps } />
                    { hiddenCarousel ? null : <PhotosCarousel ref="carousel" { ...carouselProps } /> }
                    {
                        pics.length ?
                            <div id="gallery-wall">
                                <div className="gallery-wall-left">
                                    { picsOfLeftPart.map((pic, index) => {
                                        return (
                                            <div key={ index * 2 } className="gallery-wall-item">
                                                <LazyLoad { ...lazyloadProps }>
                                                    <LazyLoadImage
                                                        src={ pic.mediumSrc }
                                                        onLoaded={ this.handleAddLoadedPics.bind(this, pic.originalSrc, index * 2) }
                                                        onClick={ this.handleShowPhotosCarousel.bind(this) }
                                                        />
                                                </LazyLoad>
                                            </div>
                                        )
                                    }) }
                                </div>
                                <div className="gallery-wall-right">
                                    { picsOfRightPart.map((pic, index) => {
                                        return (
                                            <div key={ index * 2 + 1 } className="gallery-wall-item">
                                                <LazyLoad { ...lazyloadProps }>
                                                    <LazyLoadImage
                                                        src={ pic.mediumSrc }
                                                        onLoaded={ this.handleAddLoadedPics.bind(this, pic.originalSrc, index * 2 + 1) }
                                                        onClick={ this.handleShowPhotosCarousel.bind(this) }
                                                        />
                                                </LazyLoad>
                                            </div>
                                        )
                                    }) }
                                </div>
                            </div> :
                            <EmptyList tip="该老师暂未上传图片" />
                    }
                </div>
            )
        }
    }
}




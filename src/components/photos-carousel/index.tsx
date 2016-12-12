require("./index.less");

import * as React from "react";
import { render } from "react-dom";

import * as Carousel from "nuka-carousel";

interface PhotosCarouselProps {
    pics: string[];
    slideIndex: number;
    handlerClose?(): void;
}

export default class PhotosCarousel extends React.Component<PhotosCarouselProps, any> {
    static propTypes = {
        pics: React.PropTypes.array.isRequired,
        slideIndex: React.PropTypes.number,
        handlerClose: React.PropTypes.func,
    }

    componentDidMount() {

    }

    handlerClose() {
        if (this.props.handlerClose) {
            this.props.handlerClose();
        }
    }

    render() {

        return (
            <div id="gallery-carousel" onClick={ this.handlerClose.bind(this) }>
                <Carousel
                    autoplay={ false }
                    decorators={[]}
                    wrapAround={ true }
                    slideIndex={ this.props.slideIndex }
                    >
                    { this.props.pics.map((pic, index) => {
                        return (
                            <div key={ index } style={ {
                                backgroundImage: `url(${pic})`,
                            } } ></div>
                        )
                    }) }
                </Carousel>
            </div>
        )
    }
}
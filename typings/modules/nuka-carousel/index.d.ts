declare module "nuka-carousel" {
    interface NukaCarousel {
        afterSlide?(a: number): void;
        autoplay?: boolean;
        autoplayInterval?: number;
        beforeSlide?(a: number, b: number): void;
        cellAlign?: string;
        cellSpacing?: number;
        data?(): void;
        decorators?: any[];
        dragging?: boolean;
        easing?: string;
        framePadding?: string;
        frameOverflow?: string;
        edgeEasing?: string;
        initialSlideHeight?: number;
        initialSlideWidth?: number;
        slideIndex?: number;
        slidesToShow?: number;
        slidesToScroll?: number | string;
        slideWidth?: number | string;
        speed?: number;
        vertical?: boolean;
        width?: string;
        wrapAround?: boolean;
    }

    let NukaCarousel: __React.ClassicComponentClass<NukaCarousel>;
    export = NukaCarousel;
}

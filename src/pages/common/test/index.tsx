require("./index.less");

import * as React from "react";
import * as QueueAnim from "rc-queue-anim";
import * as Carousel from "nuka-carousel";

export default class Test extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);

    }

    render() {
        return (
            <Carousel
                autoplay={true}
                autoplayInterval={3000}
                decorators={[]}
                wrapAround={true}
                slideIndex={0}
                >
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
            </Carousel>
        );
    }
} 
declare namespace ReactLazyload {
    import React = __React;

    export interface ReactLazyloadProps extends React.Props<Lazyload> {
        height?: number | string;
        once?: boolean;
        offset?: number;
        scroll?: boolean;
        resize?: boolean;
        overflow?: boolean;
        debounce?: boolean;
        throttle?: boolean;
        placeholder?: any;
    }

    export class Lazyload extends React.Component<ReactLazyloadProps, any> {
    }
}

declare module 'react-lazyload' {
    export default ReactLazyload.Lazyload;
}

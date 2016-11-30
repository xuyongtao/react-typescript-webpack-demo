declare module "react-swipeable-views/lib/autoPlay" {
    const enum directions { 'incremental', 'decremental' }

    import React = __React;

    interface AutoPlaySwipeableViewsProps extends React.Props<AutoPlaySwipeableViews> {
        autoplay?: boolean,
        direction?: directions,
        interval?: number,
    }

    class AutoPlaySwipeableViews extends React.Component<AutoPlaySwipeableViewsProps, any> {

    }

    // function autoPlay(SwipeableViews: ReactSwipeableViews.SwipeableViews): AutoPlaySwipeableViews
    function autoPlay(SwipeableViews: any): AutoPlaySwipeableViews

    export default autoPlay;
}
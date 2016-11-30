declare module "rc-queue-anim" {
    interface ReactQueueAnim {
        type?: string | string[];
        animConfig?: any;
        className?: string;
        delay?: number | number[];
        duration?: number | number[];
        interval?: number | number[];
        leaveReverse?: boolean;
        ease?: string | string[];
        animatingClassName?: string[];
        component?: string;
        onEnd?({ key, type }: { key: string; type: string }): void;
    }

    let ReactQueueAnim: __React.ClassicComponentClass<ReactQueueAnim>;
    export = ReactQueueAnim;
}

declare module "rc-notification" {
    import React = __React;

    interface NoticeProps {
        content: React.ReactElement<any> | string;
        key?: string;
        closable?: boolean;
        onClose?: () => void;
        duration?: number;
        style?: any;
    }

    interface NotificationProps extends React.Props<Notification> {
        prefixCls: string;
        style: { [key: string]: any };
    }

    class Notification extends React.Component<NotificationProps, any> {
        static newInstance(props?: NotificationProps): {
            notice(noticeProps: NoticeProps): void;
            removeNotice(key: string): void;
            component: Notification;
            destroy(): void;
        }
    }

    namespace Notification { }

    export = Notification;
}


import "./index.less";

import * as React from "react";
import * as Notification from "rc-notification";

let defaultDuration = 1.5;
let defaultTop = "40%";
let key = 1;
let prefixCls = "qm-message";
let messageInstance = Notification.newInstance({
    // 覆盖原来的样式  
    prefixCls: prefixCls,
    style: { top: defaultTop }
});

function getMessageInstance() {
    return messageInstance;
}

function notice({
    content,
    duration = defaultDuration,
    type,
    onClose,
}: {
        content: string;
        duration?: number;
        type?: string;
        onClose?: () => void;
    }) {
    let instance = getMessageInstance();
    let iconMap: any = {
        info: "info-circle",
        success: "check-circle",
        error: "cross-circle",
        warning: "exclamation-circle",
        loading: "loading"
    };
    let iconType = iconMap[type];

    instance.notice({
        key,
        duration,
        style: {},
        content: React.createElement("div", {
            className: prefixCls + '-custom-content ' + prefixCls + '-' + type
        }, React.createElement("i", {
            type: iconType,
        }), React.createElement("span", null, content)),
        onClose,
    });

    return function () {
        var target = key++;
        return function () {
            instance.removeNotice(target);
        };
    } ();
}

interface Message {
    content: any;
    duration?: number;
    onClose?: () => void;
}

export default {
    info: function info({ content, duration, onClose }: Message) {
        return notice({
            content,
            duration,
            type: "info",
            onClose,
        })
    },
    success: function success({ content, duration, onClose }: Message) {
        return notice({
            content,
            duration,
            type: "success",
            onClose,
        })
    },
    error: function success({ content, duration, onClose }: Message) {
        return notice({
            content,
            duration,
            type: "error",
            onClose,
        })
    },
    config: function config(options: {
        top: any;
        duration: number;
        prefixCls: string;
    }) {
        if ('top' in options) {
            defaultTop = options.top;
        }
        if ('duration' in options) {
            defaultDuration = options.duration;
        }
        if ('prefixCls' in options) {
            prefixCls = options.prefixCls;
        }
    },
    destroy: function destroy() {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
    }
}
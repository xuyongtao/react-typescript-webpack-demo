require('../css/base.less');

// 百度统计代码
var _hmt = _hmt || [];
(function () {
    if (/\.com|qmjy\.app/.test(location.host)) {
        var hm = document.createElement("script");

        hm.onload = function () {
            console.info('baidu 统计代码已经安装');
        };

        hm.onerror = function () {
            console.error('百度统计代码安装失败');
        };

        hm.src = "//hm.baidu.com/hm.js?c570243a99f2a83971ba06ac8db0fc72";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }
})();

// SEO主动推送
(function () {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

var
    PAGE_MAX_WIDTH = 640,
    BASE_FONT_SIZE = 50
    ;

//在窗口各宽情况时，动态计算出html的font-size
!function () {
    var
        DOC_ROOT_STYLE = document.documentElement.style
        ;
    var timer = null;

    window.addEventListener('load', resizeFontSize);
    window.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(resizeFontSize, 100);
    });
    timer = setTimeout(resizeFontSize, 300);
    resizeFontSize();

    function resizeFontSize() {
        DOC_ROOT_STYLE.fontSize = (Math.min((document.documentElement.clientWidth) / PAGE_MAX_WIDTH * BASE_FONT_SIZE, BASE_FONT_SIZE)).toFixed(0) + 'px';
    }
} ();
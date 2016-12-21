require('../css/base.less');

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

        hm.src = "//hm.baidu.com/hm.js?460e998a78fe70c2c54d2c3f41cc7466";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }
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
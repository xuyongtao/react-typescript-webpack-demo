require('../css/base.less');

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
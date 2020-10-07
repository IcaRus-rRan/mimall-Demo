console.log('加载main.js成功');

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        "slide": "slide",
        "data": "data",
    },
    shim: {
        // 设置依赖关系
        "jquery-cookie": ["jquery"]
    }
})
require(["nav", "slide", "data"], function (nav, slide, data) {
    nav.download();
    nav.banner();
    // nav.leftNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    // nav.topNavDownload();
    nav.topSearch();


    slide.download();
    slide.slideTab();

    data.download();
    data.tabMenu();
})
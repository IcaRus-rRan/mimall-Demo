console.log("加载成功");

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        // "jquery-cookie": "jquery.cookie",
        "nav": "nav",
        // "slide": "slide",
        // "data": "data",
        "goodsList": "goodsList",
    },
})

require(["nav", "goodsList"], function (nav, goodsList) {
    nav.topNavDownload();
    nav.leftNavDownload();
    nav.topNavTab();
    nav.leftNavTab();
    nav.topSearch();
    nav.allGoodsTab();

    goodsList.download();
    goodsList.banner();
})
console.log("加载成功");

require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        // "nav": "nav",
        "goodsCart": "goodsCart",
    },

    shim: {
        "jquery-cookie": ["jquery"]

    }
})

require(["goodsCart"], function (goodsCart) {
    goodsCart.download();
    goodsCart.cartHover();
    goodsCart.loadCartData();
    goodsCart.checkFunc();
    goodsCart.changeCars();
})
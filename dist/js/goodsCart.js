define(["jquery", "jquery-cookie"], function ($) {

    // 加载购物车列表
    function loadCartData() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: "get",
                url: "../data/goodsCarList.json",
                success: function (result) {
                    resolve(result.data);
                },
                error: function (msg) {
                    reject(msg);
                }
            })
        }).then(function (arr1) {

            return new Promise(function (resolve, reject) {
                $.ajax({
                    // type:"get",
                    url: "../data/goodsList2.json",
                    success: function (result) {
                        var arr = arr1.concat(result);
                        resolve(arr);
                    },
                    error: function () {
                        reject(msg);
                    },
                })
            }).then(function (arr) {
                // console.log(arr);

                var cookieStr = $.cookie("goods");
                if (cookieStr) {
                    var cookieArr = JSON.parse(cookieStr);
                    var newArr = [];
                    for (var i = 0; i < cookieArr.length; i++) {
                        for (var j = 0; j < arr.length; j++) {
                            if (cookieArr[i].id == arr[j].product_id || cookieArr[i].id == arr[j].goodsid) {
                                arr[j].num = cookieArr[i].num;
                                arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                                newArr.push(arr[j]);
                            }
                        }
                    }
                    // console.log(newArr);

                    for (var i = 0; i < newArr.length; i++) {
                        $(`<div class="item-row clearfix" id="${newArr[i].id}"> 
                            <div class="col col-check">  
                                <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                            </div> 
                            <div class="col col-img">  
                                <a href="//item.mi.com/${newArr[i].id}.html" target="_blank" > 
                                    <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                                </a>  
                            </div> 
                            <div class="col col-name">  
                                <div class="tags">   
                                </div>     
                                <div class="tags">  
                                </div>   
                                <h3 class="name">  
                                    <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                        ${newArr[i].name} 
                                    </a>  
                                </h3>        
                            </div> 
                            <div class="col col-price"> 
                            ${newArr[i].price}元
                                <p class="pre-info">  </p> 
                            </div> 
                            <div class="col col-num">  
                                <div class="change-goods-num clearfix J_changeGoodsNum"> 
                                    <a href="javascript:void(0)" class="J_minus">
                                        <i class="iconfont"></i>
                                    </a> 
                                    <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                                    <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                                </div>  
                            </div> 
                            <div class="col col-total"> 
                            ${(newArr[i].num * newArr[i].price).toFixed(2)}元 
                                <p class="pre-info">  </p> 
                            </div> 
                            <div class="col col-action"> 
                                <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                            </div> 
                        </div>`).appendTo("#J_cartBox #J_cartListBody .J_cartGoods");
                    }

                    isAll();
                }
            })
        })

    }

    function checkFunc() {

        $("#J_selectAll").click(function () {
            var checksAll = $("#J_cartListBody").find(".col-check i");

            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).add(checksAll).removeClass("icon-checkbox-selected");
            } else {
                $(this).add(checksAll).addClass("icon-checkbox-selected");
            }
            isAll();

            return false;
        })

        $("#J_cartListBody").on("click", ".J_cartGoods .col-check i", function () {

            if ($(this).hasClass("icon-checkbox-selected")) {
                $(this).removeClass("icon-checkbox-selected");
                $("#J_selectAll").removeClass("icon-checkbox-selected");
            } else {
                $(this).addClass("icon-checkbox-selected");
            }
            isAll();


        })
    }

    function isAll() {
        var iAll = $(".J_cartGoods .col-check i");
        var num = 0;
        var priceTotal = 0;
        for (var i = 0; i < iAll.length; i++) {

            if (!$(iAll[i]).hasClass("icon-checkbox-selected")) {
                $("#J_selectAll").removeClass("icon-checkbox-selected");
            } else {
                // console.log(iAll[i]);
                var price = iAll.eq(i).parent(".col-check").siblings(".col-price").text().trim();
                var count = iAll.eq(i).parent(".col-check").siblings(".col-num").find("input").val();
                // console.log(price);
                // console.log(count);

                priceTotal += count * parseFloat(price);
                console.log(priceTotal);
                num++;
                if (num == iAll.length) {
                    $("#J_selectAll").addClass("icon-checkbox-selected");
                }
            }
        }
        $("#J_selTotalNum").text(num);
        $("#J_cartTotalNum").text(iAll.length);
        $("#J_cartTotalPrice").text(priceTotal.toFixed(2));
    }

    function download() {
        $.ajax({
            type: "get",
            url: "data/goodsCarList.json",
            success: function (result) {
                var goodsArr = result.data;
                // console.log(goodsArr);
                for (var i = 0; i < goodsArr.length; i++) {
                    var node = $(`<li class="J_xm-recommend-list span4">    
                                    <dl> 
                                        <dt> 
                                            <a href="#"> 
                                                <img src="${goodsArr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="${goodsArr[i].name}"> 
                                            </a> 
                                        </dt> 
                                        <dd class="xm-recommend-name"> 
                                            <a href="#"> 
                                                ${goodsArr[i].name} 
                                            </a> 
                                        </dd> 
                                        <dd class="xm-recommend-price">${goodsArr[i].price}元</dd> 
                                        <dd class="xm-recommend-tips">   ${goodsArr[i].comments}人好评    
                                            <a href="#" class="btn btn-small btn-line-primary J_xm-recommend-btn" id = "${goodsArr[i].goodsid}" style="display: none;">加入购物车</a>  
                                        </dd> 
                                        <dd class="xm-recommend-notice">

                                        </dd> 
                                    </dl>  
                                </li>`);
                    node.appendTo(".page-main .xm-recommend ul");
                    // console.log(goodsArr[i].productid);
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function cartHover() {
        $(".page-main .xm-recommend ul").on("mouseenter", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "block");
        });
        $(".page-main .xm-recommend ul").on("mouseleave", ".J_xm-recommend-list", function () {
            $(this).find(".xm-recommend-tips a").css("display", "none");
        })

        $(".page-main .xm-recommend ul").on("click", ".xm-recommend-tips a", function () {
            var id = this.id;
            //[{id:1,num:1},{id:2,num:2}...]
            var first = $.cookie("goods") == null ? true : false;
            if (first) {
                var cookieArr = [{ id: id, num: 1 }];
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7,
                });

            } else {
                var same = false; // 假设没有添加过
                var cookieStr = $.cookie("goods")
                var cookieArr = JSON.parse(cookieStr);
                for (var i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }

                }
                if (!same) {
                    var obj = { id: id, num: 1 };
                    cookieArr.push(obj);
                }

                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7,
                });
                // alert($.cookie("goods"));
                $("#J_cartListBody .J_cartGoods").html("");
                loadCartData();

            }

            return false;
        })
    }

    //给页面上商品数量增加减少和删除添加
    function changeCars() {
        // 数量加
        $("#J_cartListBody .J_cartGoods").on("click", ".J_changeGoodsNum .J_plus", function () {
            var id = $(this).closest(".item-row").attr("id");
            // console.log(id);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            // console.log(cookieStr);
            // console.log(cookieArr);
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr[i].num++;
                    // console.log(cookieArr[i].num);
                    break;
                }
            }

            $(this).siblings("input").val(cookieArr[i].num);
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").text()) * cookieArr[i].num;
            console.log(JSON.stringify(cookieArr));
            $(this).closest(".col-num").siblings(".col-total").text(price.toFixed(2) + "元");

            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })

            isAll();
            return false;
        });

        // 数量减
        $("#J_cartListBody .J_cartGoods").on("click", ".J_changeGoodsNum .J_minus", function () {
            var id = $(this).closest(".item-row").attr("id");
            // console.log(id);
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            // console.log(cookieStr);
            // console.log(cookieArr);
            for (var i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr[i].num == 1 ? alert("数量已经为1，不能再减少！") : cookieArr[i].num--;
                    // console.log(cookieArr[i].num);
                    break;
                }
            }

            $(this).siblings("input").val(cookieArr[i].num);
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").text()) * cookieArr[i].num;
            // console.log(price);
            $(this).closest(".col-num").siblings(".col-total").text(price.toFixed(2) + "元");

            $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })

            isAll();
            return false;
        })

        // 删除操作
        $("#J_cartListBody .J_cartGoods").on("click", ".col-action i", function () {
            var id = $(this).closest(".item-row").attr("id");
            $(this).closest(".item-row").remove();
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for (var i = 0; i < cookieArr.length; i++) {
                if (id == cookieArr[i].id) {
                    //删除数据
                    cookieArr.splice(i, 1);
                    break;
                }
            }

            cookieArr.length == 0 ? $.cookie("goods", null) : $.cookie("goods", JSON.stringify(cookieArr), {
                expires: 7
            })

            isAll();
            return false;
        })

    }

    return {
        download: download,
        cartHover: cartHover,
        loadCartData: loadCartData,
        checkFunc: checkFunc,
        changeCars: changeCars,
    }
});
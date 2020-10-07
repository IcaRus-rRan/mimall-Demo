//处理首页导航部分， 声明模块遵从AMD
define(["jquery"], function ($) {
    function download() {
        $.ajax({
            type: "get",
            url: "data/nav.json",
            success: function (result) {
                // console.log(result);
                var bannerArr = result.banner;
                // console.log(bannerArr);
                for (var i = 0; i < bannerArr.length; i++) {

                    $("#J_homeSwiper .swiper-slide").append(`<a href="${bannerArr[i].url}">
                    <img class='swiper-lazy swiper-lazy-loaded' src='images/banner/${bannerArr[i].img}' alt="" />
                </a>`);

                    var node = $(`<a href="javascript:;" class='swiper-pagination-bullet '></a>`);
                    if (i == 0) {
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    $("#J_homeSwiper .swiper-pagination").append(node);
                }

            },
            error: function (msg) {
                console.log(msg);
            }
        })

        topNavDownload();
        leftNavDownload();
    }

    function banner() {
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;

        var timer = setInterval(function () {
            iNow++;
            tab();
        }, 4500)

        //封装一个切换函数
        function tab() {
            if (!aImgs) {
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if (!aBtns) {
                aBtns = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if (iNow == aImgs.length) {
                iNow = 0
            }

            // 图片切换
            // console.log(aImgs.length);
            aImgs.hide().css("opacity", 0.2).eq(iNow).show().stop().animate({ opacity: 1 }, 500);
            aBtns.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");

        }

        // 添加鼠标移入事件
        $("#J_homeSwiper,.swiper-pagination,.swiper-button-prev,.swiper-button-next").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            clearInterval(timer);
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 4500)
        });

        // 点击小圆圈切换banner图
        $("#J_homeSwiper .swiper-pagination").on("click", "a", function () {
            // console.log($(this).index());
            iNow = $(this).index();
            tab();
        })

        // 点击左右按钮切换banner图
        $(".swiper-button-prev").click(function () {
            iNow--;
            // console.log(iNow);
            if (iNow == -1) {
                iNow = $("#J_homeSwiper .swiper-slide").find("a").length - 1;
            }
            tab();
        });
        $(".swiper-button-next").click(function () {
            iNow++;
            // console.log(iNow);
            if (iNow == $("#J_homeSwiper .swiper-slide").find("a").length) {
                iNow = 0;
            }
            tab();
        })
    }



    // 侧边导航栏数据加载
    function leftNavDownload() {
        $.ajax({
            url: "data/nav.json",
            success: function (result) {
                var sideNavArr = result.sideNav;
                // console.log(sideNavArr);
                for (var i = 0; i < sideNavArr.length; i++) {
                    var node = $(`<li class='category-item'>
                                        <a href="javascript:;" class='title'>
                                            ${sideNavArr[i].title}
                                            <em class='iconfont-arrow-right-big'></em>
                                        </a>
                                        <div class="children clearfix" >
                                            
                                        </div>
                                    </li>`)
                    node.appendTo("#J_navCategory #J_categoryList")
                    var childArr = sideNavArr[i].child;
                    // console.log(childArr);

                    // 计算多少列 设置对应class样式
                    var col = Math.ceil(childArr.length / 6);
                    node.find("div.children").addClass("children-col-" + col);
                    for (var j = 0; j < childArr.length; j++) {
                        if (j % 6 == 0) {
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}">
                                                
                                           </ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }


                        var newLi = $(`<li>
                                         <a href="http://www.mi.com/redminote8pro"
                                             data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2"
                                             class="link clearfix" data-stat-id="d678e8386e9cb0fb"
                                             onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                             <img src="${childArr[j].img}"
                                                 width="40" height="40" alt="" class="thumb">
                                             <span class="text">${childArr[j].title}</span>
                                         </a>
                                     </li>`);
                        newLi.appendTo(newUl);
                        // console.log(childArr[j].img);
                    }

                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    function topNavDownload() {
        $.ajax({
            // type: "get",
            url: "data/nav.json",
            success: function (result) {
                // console.log(result);
                var topNavArr = result.topNav;
                topNavArr.push({ title: "服务" }, { title: "社区" });
                for (var i = 0; i < topNavArr.length; i++) {
                    $(`<li data-index="${i}" class="nav-item">
                            <a href="javascript: void(0);" class = "link">
                                <span class="text">${topNavArr[i].title}</span>
                            </a> 
                        </li>`).appendTo(".site-header .header-nav .nav-list");
                    //插在顶部导航位置

                    var node = $(`<ul class = 'children-list clearfix' style = "display: ${i == 0 ? 'block' : 'none'}"></ul>`);
                    $("#J_navMenu .container").append(node);

                    if (topNavArr[i].childs) {
                        var childArrTop = topNavArr[i].childs;
                        // console.log(childArrTop);
                        for (var j = 0; j < childArrTop.length; j++) {
                            $(`<li>
                                    <a href="#">
                                        <div class = 'figure figure-thumb'>
                                            <img src="${childArrTop[j].img}" alt=""/>
                                        </div>
                                        <div class = 'title'>${childArrTop[j].a}</div>
                                        <p class = 'price'>${childArrTop[j].i}</p>
                                    </a>
                                </li>`).appendTo(node);
                            // 插在顶部导航下拉菜单部分
                            // console.log(node);
                        }
                    }

                }

            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }

    function leftNavTab() {
        $("#J_categoryList").on("mouseenter", ".category-item", function () {
            // console.log($(this).parent().index());
            // console.log($(this).find("div.children"));
            $(this).find("div.children").fadeIn("fast");
        })


        $("#J_categoryList").on("mouseleave", "li.category-item", function () {
            // var indexLi = $(this).index();
            // console.log($(this));
            $(this).find("div.children").fadeOut("fast");

        })

    }

    // function leftNavTab() {
    //     $("#J_categoryList").on("mouseenter", ".category-item", function () {
    //         console.log($(this));
    //         $(this).addClass("category-item-active");
    //     })
    //     $("#J_categoryList").on("mouseleave", "li.category-item", function () {
    //         console.log($(this));
    //         $(this).removeClass("category-item-active");
    //     })
    // }


    function topNavTab() {
        $(".header-nav .nav-list").on("mouseenter", ".nav-item", function () {
            // console.log($(this));
            $(this).addClass("nav-item-active");
            var index = $(this).index() - 1;
            if (index >= 0 && index <= 6) {
                $("#J_navMenu").css("display", "block").removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css("display", "block").siblings().css("display", "none");
            } else {
                $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
            }
        });
        $(".site-header ").on("mouseleave", ".nav-item", function () {
            $(".nav-item").removeClass("nav-item-active");
        });
        $(".site-header").on("mouseleave", function () {
            $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
            $("#J_navMenu .container").find("ul").css("display", "none");
        })
    }

    function topSearch() {
        $("#search").focus(function () {
            $("#J_keywordList").removeClass("hide");
        }).blur(function () {
            $("#J_keywordList").addClass("hide");
        })
    }

    function allGoodsTab() {
        $(".header-nav .nav-list").on("mouseenter", ".nav-category", function () {
            // $(this).addClass("nav-category-active");
            // console.log($(this));
            $(this).find(".site-category").css("display", "block");
            $("#J_navMenu").removeClass("slide-down").addClass("slide-up");
            $("#J_navMenu .container").find("ul").css("display", "none");
        });
        $(".header-nav .nav-list").on("mouseleave", ".nav-category", function () {
            $(".site-category").css("display", "none");
        })
    }

    return {
        download: download,
        banner: banner,
        leftNavDownload: leftNavDownload,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        topNavDownload: topNavDownload,
        topSearch: topSearch,
        allGoodsTab: allGoodsTab,
    }

})



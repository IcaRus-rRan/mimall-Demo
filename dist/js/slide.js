define(["jquery"], function ($) {
    function download() {
        $.ajax({
            url: "../data/slide.json",
            success: function (result) {
                var slideObj = result.data.list.list;
                // console.log(slideObj);
                for (i = 0; i < slideObj.length; i++) {
                    var node = $(`<li class='swiper-slide rainbow-item-3' style='width: 234px; margin-right: 14px;'>
                                    <a href="#" target="_blank">
                                        <div class='content'>
                                            <div class='thumb'>
                                                <img width="160" height="160"
                                                    src="${slideObj[i].pc_img}"
                                                    alt="" />
                                            </div>
                                            <h3 class='title'>${slideObj[i].goods_name}</h3>
                                            <p class='desc'>${slideObj[i].desc}</p>
                                            <p class='price'>
                                                <span>${slideObj[i].seckill_Price}</span>元
                                                <del>${slideObj[i].goods_price}元</del>
                                            </p>
                                        </div>
                                    </a>
                                </li>`);
                    node.appendTo("#J_flashSaleList .swiper-wrapper");

                }

            },
            error(msg) {
                console.log(msg);
            }
        })
    }

    function slideTab() {
        var aSpans = $(".swiper-controls ").find("span");
        var iNow = 0;
        var count = Math.ceil(26 / 4) - 1;
        var interval = function () {
            iNow++;
            tab();
            if (iNow >= count) {
                clearInterval(timer);
            }
        }
        var timer = setInterval(function () {
            interval();
        }, 4500);

        function tab() {
            // console.log(iNow);
            // console.log(count);
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled");

            var iTarget = iNow >= count ? iNow * -992 + 496 : iNow * -992;

            $("#J_flashSaleList").find("ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "800ms",
            });

        }

        aSpans.eq(0).click(function () {
            iNow--;
            iNow = Math.max(0, iNow);
            // clearInterval(timer);
            tab();
        });

        aSpans.eq(1).click(function () {
            iNow++;
            iNow = Math.min(count, iNow);
            // clearInterval(timer);
            tab();
        })

        $("#J_flashSaleList").mouseenter(function () {
            clearInterval(timer);
            console.log("stop");
        }).mouseleave(function () {
            timer = setInterval(function () {
                interval();
            }, 4500);
            console.log("start");
        })
    }

    return {
        download: download,
        slideTab: slideTab,
    }
})
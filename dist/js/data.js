define(["jquery"], function ($) {
    function download() {
        $.ajax({
            type: "get",
            url: "../data/data.json",
            success: function (result) {
                var dataArr = result[0].childs;
                var firstData = result[0];
                // console.log(firstData);

                // 手机列表 开始
                $(`<div class='home-banner-box'>
                        <a href="#">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1a2f39c9fe0804ace1d3707574c7c86f.jpg?thumb=1&w=1226&h=120&f=webp&q=90"
                                alt="" />
                        </a>
                    </div>
                    <div class="home-brick-box home-brick-row-2-box xm-plain-box">
                        <div class='box-hd'>
                            <h2 class='title'>手机</h2>
                            <div class="more">
                                <a href="#" class='more-link'>
                                    查看全部
                                    <i class='iconfont iconfont-arrow-right-big'></i>
                                </a>
                            </div>
                        </div>
                        <div class='hox-bd clearfix'>
                            <div class='row'>
                                <div class='span4'>
                                    <ul class='brick-promo-list clearfix'>
                                        <li class='brick-item brick-item-l'>
                                            <a href="#">
                                                <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/79ed6663b57e30554a5d1f0653c68b78.jpg?thumb=1&w=234&h=614&f=webp&q=90"
                                                    alt="" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div class='span16'>
                                    <ul class='brick-list clearfix'>


                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>`).appendTo(".page-main .container");
                for (var i = 0; i < dataArr.length; i++) {
                    $(`<li class='brick-item brick-item-m brick-item-m-2'>
                            <a href="#">
                                <div class='figure figure-img'>
                                    <img width="160" height="160"
                                        src="${dataArr[i].img}"
                                        alt="" />
                                </div>
                                <h3 class='title'>
                                    ${dataArr[i].title}
                                </h3>
                                <p class='desc'>${dataArr[i].desc}</p>
                                <p class='price'>
                                    <span class='num'>${dataArr[i].price}</span>
                                    元
                                    <span>起</span>
                                    ${dataArr[i].del == 0 ? "" : "<del>" + dataArr[i].del + "元</del>"}
                                </p>
                            </a>
                        </li>`).appendTo(".hox-bd .span16 ul");
                }
                // 手机列表 结束


                for (var i = 1; i < result.length; i++) {
                    // alert(1);
                    var node2 = $(`<div class = 'home-banner-box'>
                                <a href="#">
                                    <img src="${result[i].topImg}" alt=""/>
                                </a>
                            </div>
                            <div class = 'home-brick-box home-brick-row-2-box xm-plain-box'>
                                <div class = 'box-hd clearfix'>
                                    <h2 class = 'title'>${result[i].title}</h2>
                                    <div class = 'more'>
                                        <ul class = 'tab-list'>
                                            <li class = 'tab-active'>
                                                热门
                                            </li>
                                            <li>
                                            ${result[i].subTitle}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class = 'box-bd'>
                                    <div class = 'row'>
                                        <div class = 'span4'>
                                            <ul class = 'brick-promo-list clearfix'>
                                                <li class = 'brick-item  brick-item-m'>
                                                    <a href="#">
                                                        <img src="${result[i].leftChilds[0]}" alt=""/>
                                                    </a>
                                                </li>
                                                <li class = 'brick-item  brick-item-m'>
                                                    <a href="#">
                                                        <img src="${result[i].leftChilds[1]}" alt=""/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class = 'span16'>
                                            <ul class = "brick-list clearfix">
                                            </ul>
                                            <ul class = "brick-list clearfix hide">                                              
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>`)
                    node2.appendTo(".page-main .container");

                    var hotChilds = result[i].hotChilds;
                    console.log(hotChilds);
                    for (var k = 0; k < hotChilds.length; k++) {
                        var node = $(`<div>
                                        <li class = 'brick-item ${k == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                                            <a href = "#">
                                                <div class='figure figure-img'>
                                                    <img width="160" height="160" src="${hotChilds[k].img}" alt="" />
                                                </div>
                                                <h3 class='title'>${hotChilds[k].title}</h3>
                                                <p class='desc'>${hotChilds[k].desc}</p>
                                                <p class='price'>
                                                    <span class='num'>${hotChilds[k].price}</span>元
                                                    ${hotChilds[k].del == 0 ? "" : "<del>" + hotChilds[k].del + "元</del>"}
                                                </p>
                                            </a>
                                        </li>
                                    </div> `);
                        node.appendTo(node2.find(".span16 ul").eq(0));
                    }
                    $(`<li class = 'brick-item brick-item-s'>
                            <a href="#">
                                <div class = 'figure figure-more'>
                                    <i class = 'iconfont iconfont-circle-arrow-right'></i>
                                </div>
                                <div class = 'more'>
                                    浏览更多
                                    <small>热门</small>
                                </div>
                            </a>
                        </li>`).appendTo(node.appendTo(node2.find(".span16 ul").eq(0)));


                    var childs = result[i].childs;
                    for (var l = 0; l < childs.length; l++) {
                        var node = $(`<div>
                                            <li class = 'brick-item ${l == 7 ? "brick-item-s" : "brick-item-m brick-item-m-2"}'>
                                                <a href = "#">
                                                    <div class='figure figure-img'>
                                                        <img width="160" height="160" src="${childs[l].img}" alt="" />
                                                    </div>
                                                    <h3 class='title'>${childs[l].title}</h3>
                                                    <p class='desc'>${childs[l].desc}</p>
                                                    <p class='price'>
                                                        <span class='num'>${childs[l].price}</span>元
                                                        ${childs[l].del == 0 ? "" : "<del>" + childs[l].del + "元</del>"}
                                                    </p>
                                                </a>
                                            </li>
                                        </div> `);
                        node.appendTo(node2.find(".span16 ul").eq(1));
                    }
                    $(`<li class = 'brick-item brick-item-s'>
                           <a href="#">
                               <div class = 'figure figure-more'>
                                   <i class = 'iconfont iconfont-circle-arrow-right'></i>
                               </div>
                               <div class = 'more'>
                                   浏览更多
                                   <small>${result[i].subTitle}</small>
                               </div>
                           </a>
                       </li>`).appendTo(node.appendTo(node2.find(".span16 ul").eq(1)));
                }
            },
            error: function (msg) {
                console.log(msg);
            },
        })
    }

    function tabMenu() {
        $(".page-main .container").on("mouseenter", ".more .tab-list li", function () {
            // console.log($(this).index());
            $(this).addClass("tab-active").siblings().removeClass("tab-active");
            $(this).parents("div.box-hd").siblings().find("div.span16 ul").addClass("hide").eq($(this).index()).removeClass("hide");
        })

    }

    return {
        download: download,
        tabMenu: tabMenu,
    }
})
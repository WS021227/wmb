// 采供人详情页面
$(function(){
    // 采供展开(更改过先不动)
    (function(){
        let text_width=$("#text").innerWidth()
        if(text_width>=280){
            $('#pro_more').addClass("show").removeClass("display-none")
        }
    })();
    
    // 简介展开
    (function () {
        let hs = Math.round(parseFloat($('.me-content-introduction .company-detail').css('height')) / parseFloat($('.me-content-introduction .company-detail').css('line-height')))
        console.log(hs,"77777")
        if (hs >= 4) {
            $('.me-content-introduction .company-detail').addClass("collapse")
            $('.me-content-introduction .company-detail .more').addClass('show more-active')
        }
    })();
    
    // $(".viewer").viewer({
    //     url:'data-original',
    //     // 缩略图
    //     navbar: true,
    //     movable:false,
    //     button:false,
    //     toolbar:true,
    // })

    // 公司简介点击展开更多
    $("#company_detail_more").click(function(){
        if($(this).hasClass('show')){
            $('.me-content-introduction .company-detail').removeClass("collapse")
            $('.me-content-introduction .company-detail .more').removeClass("show more-active display-none")
            $(this).text('[收起]')
        }else{
            $('.me-content-introduction .company-detail').addClass("collapse")
            $('.me-content-introduction .company-detail .more').addClass("show more-active")
            $(this).text('[展开]')
        }
    })

    // 采供弹窗
    $("#pro_more").click(function(){
        layer.open({
            type: 1,
            skin: 'layui-layer-toast', //样式类名
            closeBtn: 1, //不显示关闭按钮
            title:"采购信息",
            anim: 2,
            scrollbar: false,
            shadeClose: true, //开启遮罩关闭
            content: $(this).data("pro")
        });
    })

    // 最新、热门帖子切换
    $("#new_or_hot span").click(function(){
        $(this).addClass("active").siblings().removeClass("active")
        let id = $(this).data('id')
        let user_id=$(this).parent().data("uid")

        $.loadajax('/async/get_new_or_hot', {
            datatype: 'text',
            data: {id:id,uid:user_id},
            success: function (result) {
                if (result.state == 0) {
                    put_post(result)
                }
            }
        })
    })
})


function put_post(list,more){
    console.log(list,'最新最热切换')
    $("#box_list .me-content-list-box").remove()
    $("#num").text(`共计${list.data.total}条`)
    list.data.list.forEach(function(item,index){
        let $box=$(`
                    <div class="me-content-list-box">
                        <h3>
                            <img src="${list.static_url}${item.avatar}">
                            <div><span class="user-name" id="user_name">${item.name}</span>发布于<span>${item.create_time.substr(0,10)}</span></div>
                            <a href="">咨询</a>
                        </h3>
                        <p>【<span id="cg_flag">供应</span>】 ${item.contents} </p>
                    
                        <div class="viewer" id="viewer">
                            ${picture_array(item.images).forEach(function(item,index){
                                picture_num(item.images)==1?
                                    `<img class="img1" data-original="${list.static_url}${item}" src="${list.static_url}${item}" alt="">`:
                                    picture_num(item.images)==2?`<img class="img2" data-original="${list.static_url}${item}" src="${list.static_url}${item}" alt="">`:
                                        picture_num(item.images)==3?`<img class="img3" data-original="${list.static_url}${item}" src="${list.static_url}${item}" alt="">`:
                                            `<img class="img3" data-original="${list.static_url}${item}" src="${list.static_url}${item}" alt="">
                                             <div class="sy-num"><span>${picture_num(item.images)-3}</span></div>`
                            })}
                        </div>
    
                        <div class="buttom">
                            <div class="left">此条信息<span>${item.ad_count}</span>次展示，<span>${item.view_count}</span>次查阅
                            </div>
                            ${item.reply_count>0?`
                                <div class="right"> 
                                    <span>回复<%= item.reply_count %></span>
                                    <span>编辑</span>
                                </div>
                            `:''}
                        </div>
        
                        ${item.reply_count>0?`
                            <div class="reply">
                                <div class="reply-text">
                                    <input type="search" placeholder="请输入您回复的内容">
                                    <a href="">回复</a>
                                </div>
                                <div class="reply-texts">
                                    <p><span>张三：</span>sdfgsdgsdfgsdfgsdfgsdfgsdfgsdfgsdfgggg</p>
                                    <p><span>李四：</span>sdfgsdgsdfgsdfgsdfgsdfgsdfgsdfgsdfgggg</p>
                                    <p><span>王五：</span>sdfgsdgsdfgsdfgsdfgsdfgsdfgsdfgsdfgggg</p>
                                    <p><span>我：</span>sdfgsdgsdfgsdfgsdfgsdfgsdfgsdfgsdfgggg</p>
                                </div>
                                <span>更多回复</span>
                                </div>
                        `:''}
                    </div>
            `)
            $("#box_list").append($box)
    });
}
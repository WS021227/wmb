let search_key = {
    start: 0,
    sort: 2,
    size: 10,
    is_home:1,
    is_gq:1,
    has_topic:0,
    keyword:"",
    country:""
}

let search_num=10
let active_recommend = 2

$(function(){
    // 首页
    // 活跃、推荐切换
    $('#line_index_active_recommend span').click(function () {
        search_num = 10
        search_key.start = 0
        active_recommend = $(this).data("id")
        search_key.sort = $(this).data("id")
        $(this).addClass("active").siblings().removeClass("active")

        $.loadajax('/async/get_active_recommend', {
            datatype: 'text',
            data: search_key,
            success: function (result) {
                if (result.state == 0) {
                    put_active_recommend(result)
                }
            }
        })
    })

    // 首页点击加载更多
    $('#index_more').click(function () {
        search_num += 10
        search_key.start = search_num
        
        $.loadajax('/async/get_active_recommend', {
            datatype: 'text',
            data: search_key,
            success: function (result) {
                if (result.state == 0) {
                    put_active_recommend(result, "more")
                }
            }
        })
    })
})

// 首页渲染
function put_active_recommend(res, more) {
    console.log(res.data.list,"首页活跃用户列表")
    if (!more) {
        $('.user-content .user-content-box').remove()
    }
    res.data.list.forEach(function (item, index) {
        let $box = $(`
        <div class="user-content-box">
                    <img src="${res.static_url}${item.cover}" alt="">
                    <div class="user-content-box-content">
                        <img src='${res.static_url}${item.avatar}' alt="">
                        <div>
                            <h2><span class="name">${item.name}</span><span>(${item.country})</span></h2>
                            <span>主页展示</span><span>123</span><font>|</font><span>供求</span><span>1452</span><font>|</font><span>关注</span><span>22352</span>
                        </div>
                        <div>
                            <a href="">发私信</a>
                            <a href="javascript:void(0);"><i>+</i>关注</a>
                        </div>
                    </div>
                    <div class="user-flag">
                        <span>${item.verb}</span>
                        <span>${item.position}</span>
                    </div>
                    <div class="user-bottom">
                        <span>公司：${item.company_name}</span>
                        <span>供应：${item.products}</span>
                    </div>
        </div>
        `)
        $('.user-content').append($box)
    });
}
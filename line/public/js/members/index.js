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

$(function(){
    // 发现人加载更多
    $('#members_more').click(function () {
        search_num += 10
        search_key.start = search_num
        search_key.is_home=0
        search_key.has_topic=1

        $.loadajax('/async/get_active_recommend', {
            datatype: 'text',
            data: search_key,
            success: function (result) {
                if (result.state == 0) {
                    put_members(result, "more")
                }
            }
        })
    })
})

// 发现人渲染
function put_members(res, more) {
    if (!more) {
        $('.user-content .user-content-box').remove()
    }
    res.data.list.forEach(function (item, index) {
        let $box = $(`
        <div class="user-content-box members-box">
                        <div class="user-content-box-content members-box-content">
                            <a href='/detail/${item.user_id}'><img src='${res.static_url}${item.avatar}'></a>                      
                            <div>
                                <a href='/detail/${item.user_id}'> 
                                    <h2><span class="name">${item.name}</span><span>(${item.country})</span></h2>
                                </a>
                                <div><span>任职：</span><span>${item.position}</span><font>|</font><span>${item.verb}商</span></div>
                                <div><span>职位：</span><span>${item.position}</span></div>
                                <div><span>供应：</span><span class="gy">${item.supply_demand}</span></div>
                            </div>
                            <div>
                                <a href="javascript:void(0);" onclick=${Messages()}>发私信</a>
                                <a id="follow" href="javascript:void(0);" data-id="" onclick=${Concern(this)}><i>+</i>关注</a>
                            </div>
                        </div>
                        <div class="members-box-center">
                            <div class="left ${!item.topic_images?'no-img':''}">
                                <a href='/detail/${item.user_id}'>     
                                    <p>[我在${item.verb}]${gq_title_format(item.topic_contents,100)}</p>
                                </a>
                                <span>${item.topic_create_time.substr(0,10)}发布</span>
                            </div>
                            <a href='/detail/${item.user_id}'> 
                                ${item.topic_images?`<img src="${res.static_url}${picture_format(item.topic_images)}" alt="">`:""}
                            </a>
                        </div>
                       ${item.post_cnt>1?`<div class="members-box-bottom"><span>还有${item.post_cnt}条供应信息</span></div>`:''}
                    </div>
        `)
        $('.members-box-list').append($box)
    });
}
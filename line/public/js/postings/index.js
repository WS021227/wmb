// 供求搜索参数
let postings_search_key = {
    start: 0,
    size: 20,
    sort: 2,//1推荐、2活跃
    keyword: "",
    country:"",
    type_id: 0,
    is_gq:1,
    has_reply: 0,
    is_home:1,
    has_follow:0,
    is_manage:0,
    user_id:0,
    exclude_id:0
}

// 加载更多
let postings_search_num=20

$(function(){
    // 供求加载更多
    $('#postings_more').click(function () {
        postings_search_num += 20
        postings_search_key.start = postings_search_num

        $.loadajax('/async/postings/get_postings_list', {
            datatype: 'text',
            data: postings_search_key,
            success: function (result) {
                put_postings(result, "more")
            }
        })
    })
})

// 供求渲染
function put_postings(res, more) {
    if (!more) {
        $('.user-content .user-content-box').remove()
    }
    res.users_list.forEach(function (item, index) {
        let $box = $(`
        <div class="postings-box">
                        <h3>
                            <img src="${res.static_url}${picture_format(item.images)}" alt="">
                        </h3>
                        <p>
                            <span>[${item.verb}]</span>
                            ${ gq_title_format(item.contents,100) }
                        </p>
                        <div class="bottom">
                            <img src="${res.static_url}${ item.avatar }" alt="">
                            <div>
                                <span>${ item.name }发布</span>
                                <span>${ item.ip_country_name?item.ip_country_name:item.country }${ item.ip_pro_name?item.ip_pro_name:"" }<font>|</font>${ item.company_type_name }</span>
                            </div>
                        </div>
                        ${picture_num(item.images)!=0?`<span class="num">${ picture_num(item.images) }</span>`:""}
                       
        </div>
        `)
        $('.postings-box-list').append($box)
    });
}
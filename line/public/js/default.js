let line_lang = wg.lang || 'cn'

let line_share_lang = {
  'share_open_line': { cn: '请开通邦Line', en: 'Please open B-line' },
  'share_open': { cn: '开通邦Line', en: 'Open B-line' },
  'share_no_posts': { cn: '我们的建议...', en: 'Our advice...' },
  'share_clean': { cn: '取关', en: 'Clean' },
  'share_follow': { cn: '关注', en: 'Follow' },
  'share_follow_failure': { cn: '关注失败', en: 'Focus on failure' },
  'share_remove_failure': { cn: '取关失败', en: 'Failed to clean' },
  'share_other_group': { cn: '您已经入驻其他圈子', en: 'You are already in other circles' },
  'share_other_group_tips': { cn: '入驻当前圈子的邦友所从事的行业都与胶合板及其周边产品相关，您的行业不匹配，暂不能入群。', en: 'The industries of our current circle members are all related to plywood and its peripheral products.' },
  'share_exit_group': { cn: '退出圈子', en: 'Exit the group' },
  'share_join_group': { cn: '加入圈子', en: 'Join the group' },
  'share_exit_group_failure': { cn: '退出圈子失败', en: 'Failure to exit' },
  'share_loading': { cn: '加载中...', en: 'Loading...' },
  'share_loading_more': { cn: '加载更多', en: 'Loading more' },
  'share_report_successful': { cn: '举报成功', en: 'Report successful' },
  'share_share_post': { cn: '在圈内分享供求、问答、知识...', en: 'Share supply and demand, Q&A and knowledge in the circle' },
  'share_publish': { cn: '发布', en: 'Publish' },
  'share_brilliant': { cn: '请输入您精彩的回复吧', en: 'Please enter your brilliant response!' },
  'share_being_released': { cn: '发布中', en: 'Being released' },
  'share_reply_review': { cn: '回复成功，正在审核...', en: 'Reply successful, under review' },
  'share_reply_failed': { cn: '回复失败，请稍后再试', en: 'Reply failed, please try again later' },
  'share_than_zero': { cn: '请输入大于0的页码', en: 'Please enter a page number greater than 0' },
  'share_no_open_tips': { cn: '完善邦Line主页信息，并入驻当前圈子后可完成此操作。', en: 'Complete this operation after perfecting the homepage info of Business-Line and joining in this group.' },


  'default_4_images': {cn: '最多添加4张图片', en: 'Add up to 4 images'},
  'default_image_format': {cn: '图片格式不正确', en: 'Incorrect image format'},
  'default_3_m': {cn: '图片不能大于3M，请重新上传', en: 'Image cannot be larger than 3M, please re-upload'},
  'default_only_jpg': {cn: '仅支持jpg、png、gif格式图片，尺寸不超过3M', en: 'Only jpg, png and gif images are supported, up to 3M in size'},
  'default_save_modified': {cn: '保存修改的头像', en: 'Save modified avatar'},
  'default_insert_video': {cn: '插入视频', en: 'Insert video'},
  'default_video_address': {cn: '视频地址', en: 'Video address'},
  'default_enter_video_address': {cn: '请输入视频地址', en: 'Please enter the video address'},
  'default_multimedia_video': {cn: '多媒体视频', en: 'Multimedia video'},
  'default_join_circle': {cn: '请先加入圈子', en: 'Please join the circle first'},
  'default_under_review': {cn: '发布成功，正在审核...', en: 'Posting successful, under review...'},
  'default_publish': {cn: '发布', en: 'Publish'},
  'default_being_released': { cn: '发布中', en: 'Being released' },
  'default_publish_failure': {cn: '发布失败', en: 'Posting Failure'},
  'default_loading': {cn: '加载中，请稍后...', en: 'Loading, please wait...'},
  'default_loading_more': {cn: '加载更多', en: 'Loading more'},
  'default_loading_failure': {cn: '加载失败', en: 'Loading failure'},
  'default_content_enter': {cn: '请输入内容', en: 'Please enter content'},

  'pop_no_open_title': {cn: '完善邦Line主页信息，创建专属主页', en: 'Improve the information on the Bonline homepage and create your own homepage'},
  'pop_no_open_des': {cn: '届时您可在行业圈、主页发布产品、采购、企业、个人介绍等商务信息获得免费展示;平台还会将与您可能有贸易往来的同行业用户推荐给彼此，帮您建立联系！', en: 'You will be able to post your products, purchases, companies, personal profiles and other business information in the industry circle and homepage for free display; the platform will also recommend users in the same industry with whom you may have trade contacts to each other to help you establish contact!'},
  'pop_no_open_button': {cn: '创建我的专属邦Line主页→', en: 'Create my own B-Line homepage →'},



  'layer_ok': { cn: '确认', en: 'I Know' },
  'layer_tips': { cn: '提示', en: 'Tips' },
}

/**
 * js 全局翻译
 * @param key
 * @returns {*}
 */
function global_lang(key) {
    return (line_share_lang[key] || {})[line_lang] || ''
}

// 图片路径
let img_src = $(".line-index-container").data("img")

// 搜索参数
let search_key = {
    start: 0,
    size: 10,
    sort: 2,//1推荐、2活跃
    keyword: "",
    country:"",
    type_id: 0,
    is_gq:1,
    has_topic: 1,
    is_home:1
}

// 外贸人 or 帖子搜索 
let search_input_flag='/members'//默认搜外贸人
let active_recommend = 2
let search_num = 10

$(function () {
    $("body").append($(`<span class="go_top" id="go_top"><svg t="1679975082530" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7627" width="50" height="50"><path d="M60.55936 960.55296a36.79232 36.79232 0 0 1 11.27424-28.49792L480.70656 476.3648a40.850432 40.850432 0 0 1 31.0272-14.27456c11.9296 0 23.26528 5.21216 31.0272 14.27456l408.79104 455.69024a41.385984 41.385984 0 0 1 11.37664 30.5152 41.417728 41.417728 0 0 1-14.20288 29.30688 40.599552 40.599552 0 0 1-30.22848 11.44832 40.625152 40.625152 0 0 1-29.00992-14.26432L511.6928 567.26528l-377.8048 421.7856a40.625152 40.625152 0 0 1-29.00992 14.26432 40.614912 40.614912 0 0 1-30.22848-11.44832 46.0032 46.0032 0 0 1-14.09024-31.31392z m0-441.76384a36.763648 36.763648 0 0 1 11.27424-28.49792L480.70656 34.60096a40.850432 40.850432 0 0 1 31.0272-14.27456c11.9296 0 23.26528 5.21216 31.0272 14.27456L951.552 490.2912a41.416704 41.416704 0 0 1-2.82624 59.82208 40.599552 40.599552 0 0 1-30.22848 11.44832 40.587264 40.587264 0 0 1-29.00992-14.26432L511.6928 125.4912 133.888 547.28704a40.677376 40.677376 0 0 1-29.00992 14.22336 40.674304 40.674304 0 0 1-30.22848-11.40736 45.966336 45.966336 0 0 1-14.09024-31.232v-0.08192z m0 0" fill="#BD3124" p-id="7628"></path></svg></span>`))
    
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
                    put_active_recommend(result.data.list)
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
                    put_active_recommend(result.data.list, "more")
                }
            }
        })
    })

    // 发现人加载更多
    $('#members_more').click(function () {
        search_num += 10
        search_key.start = search_num
        search_key.is_home=0

        $.loadajax('/async/get_active_recommend', {
            datatype: 'text',
            data: search_key,
            success: function (result) {
                if (result.state == 0) {
                    put_active_recommend(result.data.list, "more")
                }
            }
        })
    })

    // 外贸人 or 帖子 弹窗
    $(".select").click(function(event){
        event.stopPropagation();
        if($('.select-box').hasClass('select-active')){
            $('.select-box').removeClass("select-active")
        }else{
            $('.select-box').addClass("select-active")
        }
    })

    // 外贸人 or 帖子 选择
    $(".select-box span").click(function(){ 
            $(this).addClass("active").siblings().removeClass("active")
            $("#search_flag").text(`${$(this).text()}`)
            search_input_flag=$(this).data('id')
        }
    )

    $("html,body").click(function(event){
        console.log("8888")
        $('.select-box').removeClass('select-active')
    })

    // 侦听滚动条滚动
    $(document).scroll(function () {
        console.log("000...000")
        var scroH = $(document).scrollTop(); //滚动高度

        // 粘性定位 left_tab、right_box
        if(scroH>420){
            $(".right-box").addClass("line-right-fixed")
            $(".left-nav>ul").addClass("left-nav-fixed")
        }else{
            $(".right-box").removeClass("line-right-fixed")
            $(".left-nav>ul").removeClass("left-nav-fixed")
        }

        // 回到顶部按钮
        if (scroH > 1000) { //距离顶部大于1000px时
            $("#go_top").addClass("show")
        } else {
            $("#go_top").removeClass("show")
        }
    });

    // 回到顶部
    $("body").on("click", "#go_top", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 500);
    })
})


// 首页搜索渲染
function put_active_recommend(list, more) {
    if (!more) {
        $('.user-content .user-content-box').remove()
    }
    list.forEach(function (item, index) {
        let $box = $(`
        <div class="user-content-box">
                    ${item.cover!='cover_default.jpg'?`<img src="${img_src}${item.cover}" alt="">`:'<span class="no-back"></span>'}
                    <div class="user-content-box-content">
                        <img src='${img_src}${item.avatar}' alt="">
                        <span class="avatar"></span>
                        <div>
                            <h2><span class="name">${item.name}</span><span>(${item.country})</span></h2>
                            <span>主页展示</span><span>123</span><font>|</font><span>供求</span><span>1452</span><font>|</font><span>关注</span><span>22352</span>
                        </div>
                        <div>
                            <a href="">发私信</a>
                            <a href="javascript:void(0);">
                                <i>
                                <svg t="1679981150706" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2738" width="20" height="20"><path d="M288.191617 467.238323l447.616766 0 0 89.523353-447.616766 0 0-89.523353Z" fill="#333333" p-id="2739"></path><path d="M556.761677 288.191617l0 447.616766-89.523353 0 0-447.616766 89.523353 0Z" fill="#333333" p-id="2740"></path></svg>
                                </i>
                                关注
                            </a>
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

// 关注
function Concern($this) {
    let user_id = $($this).data("id")

    console.log(user_id,"ididid")
    $.gajax('/async/follow', {
        type: "POST",
        data: {user_id: user_id},
        success: function (result) {
            console.log(result,"关注")
        }
    })
}

// 公共navbar 搜索按钮
function search_p_or_t(){
    let search_text=get_search_input()

    if(search_text){
        search_key.is_home=0
        search_key.keyword=search_text
        $("#search_btn").attr("href",`${search_input_flag}/${search_key.keyword}`)
    }
}

// search input
function get_search_input(){
    let search_key=$("#search_input").val()
    if(search_key=="") {
        layer.alert('搜索关键字不能为空！', {icon: 5});
    }else{
        return search_key
    }
}
let _lang = 'cn'
try {
  _lang = wg.lang || _lang
} catch (e) {
}

let share_lang = {
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

  'line_right_center_title':{cn:'供求信息',en:'supply and demand'}
}



let master_host = $('meta[name="master_host"]').attr('content')
let page_mark = $('meta[name="page_mark"]').attr('content') || ''
jQuery.extend({
    gajax: function (url, options) {
        url = _lang == 'en'? '/en' + url: url
        $.ajax(url, options)
    },
    /**
     * ajax success 拦截器
     * @param url
     * @param options
     * @returns {{getAllResponseHeaders: function(): *|null, abort: function(*): *, setRequestHeader: function(*, *): *, readyState: number, getResponseHeader: function(*): null|*, overrideMimeType: function(*): *, statusCode: function(*): this}|*}
     */
    ajax_interceptor: function (url, options) {
        options = options || {}
        let success = options.success
        options.success = function (result) {
            if (result.state == 600) {
                return share_login_pop()
            }
            success(result)
        }
        return $.gajax(url, options)
    },
    /**
     * 异步请求不要用到user信息且需要拦截器的ajax方法
     * @param url
     * @param options
     * @returns {*|jQuery}
     */
    wiajax: function (url, options) {
        options = options || {}
        options['headers'] = {'WTYPE': 2};
        if (options.loading) {
            return $.loadajax(url, options)
        }
        return $.ajax_interceptor(url, options)
    },
    /**
     * 异步请求不要用到user信息的ajax方法
     * @param url
     * @param options
     * @returns {*|jQuery}
     */
    wajax: function (url, options) {
        options = options || {}
        options['headers'] = {'WTYPE': 2};
        if (options.loading) {
            return $.loadajax(url, options)
        }
        return $.gajax(url, options)
    },
    /**
     * 带加载中的ajax请求
     * @param url
     * @param options
     * @returns {*}
     */
    loadajax: function (url, options) {
        options = options || {}
        let _success = options.success, _index = $.wloading()
        options.success = function (result) {
            $.wloading_close(_index)
            if (_success) _success(result)
        }
        let _error = options.error
        options.error = function (e) {
            $.wloading_close(_index)
            if (_error) _error(e)
        }
        return $.ajax_interceptor(url, options)
    },
    /**
     * 数字千位转K
     * @param value
     * @returns {string|number}
     */
    thousand: function (value) {
        if (typeof value != "number") value = Number(value)
        if (value < 1000) return value
        return (value / 1000).toFixed(2) + 'K'
    },
    /**
     * 时间戳转日期格式
     * @param now
     * @returns {string}
     */
    formatDate: function (now, has_date = true) {
        if (typeof now != 'object') now = new Date(now);
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (date >= 0 && date <= 9) {
            date = "0" + date;
        }
        if (has_date) return year + "-" + month + "-" + date;
        return year + "-" + month
    },
    date_format: function (value) {
        return new Date(value.replace(/-/g, "/"))
    },
    date_add: function (add, date) {
        date = date || new Date()
        return new Date(date.setFullYear(date.getFullYear() + add))
    },
    /**
     * 时间相加
     * @param add  数量  可以为负数
     * @param date 时间
     * @param interval 单位   注意  M：月 m: 分
     * @returns {Date}
     */
    date_change: function (add, date, interval) {
        date = date || new Date()
        interval = interval || 'y'
        let fn = {
            // 秒
            s: function () {
                date.setSeconds(date.getSeconds() + add)
            },
            //分
            m: function () {
                date.setMinutes(date.getMinutes() + add);
            },
            // 时
            h: function () {
                date.setHours(date.getHours() + add);
            },
            //天
            d: function () {
                date.setDate(date.getDate() + add)
            },
            //月
            M: function () {
                date.setMonth(date.getMonth() + add)
            },
            //年
            y: function () {
                date.setFullYear(date.getFullYear() + add)
            }
        }
        try {
            fn[interval]()
        } catch (e) {
        }
        return date

        // var val = {
        //     d: this.getUTCDate(),
        //     D: dates.daysShort[this.getUTCDay()],
        //     DD: dates.days[this.getUTCDay()],
        //     m: this.getUTCMonth() + 1,
        //     M: dates.monthsShort[this.getUTCMonth()],
        //     MM: dates.months[this.getUTCMonth()],
        //     yy: this.getUTCFullYear().toString().substring(2),
        //     yyyy: this.getUTCFullYear()
        // }
        // return new Date(date.setFullYear(date.getFullYear() + add))
    },
    /**
     *
     * @param url 下载地址，也可以是一个blob对象，必选
     * @param saveName 保存文件名，可选
     */
    openDownloadDialog: function (url, saveName) {
        if (typeof url == 'object' && url instanceof Blob) {
            url = URL.createObjectURL(url); // 创建blob地址
        }
        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) event = new MouseEvent('click');
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    },
    parse_format: function (format) {
        var validParts = /dd?|DD?|mm?|MM?|yy(?:yy)?/g;

        if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
            return format;
        // IE treats \0 as a string end in inputs (truncating the value),
        // so it's a bad format delimiter, anyway
        var separators = format.replace(validParts, '\0').split('\0'),
            parts = format.match(validParts);
        if (!separators || !separators.length || !parts || parts.length === 0) {
            throw new Error("Invalid date format.");
        }
        return {separators: separators, parts: parts};
    },
    wloading: function () {
        return layer.load(0, {
            shade: [0.9, 'rgba(0, 0, 0, .5)']
        })
    },
    wloading_close: function (_index) {
        if (_index) return layer.close(_index)
        layer.closeAll('loading')
    },
    wModel: function (callback) {
        wpull.dopen(callback)
    },
    wSetCookie: function (name, value, expire, callback) {
        $.ajax('/async/cookie/set', {
            type: 'get',
            data: {name: name, value: value, expire: expire},
            success: function () {
                if (callback) callback()
            }
        })
    },
    alert: function (msg) {
        if (typeof layer == "undefined") {
            alert(msg)
        } else {
            layer.alert(msg, {'title': unity_lang('layer_tips'), area: ['400px', 'auto'], btn: unity_lang('layer_ok')})
        }
    }
})

// 图片格式处理
function picture_format(pic_url){
  console.log(pic_url,"头像地址")
  let index=pic_url.indexOf(',')
  if(index==-1) return pic_url
  let pic=pic_url.substr(0,index)
  return pic
}
function picture_num(pic_url){
  let num=pic_url.split(",").length - 1
  return num
}
// 文本格式处理
function gq_title_format(title,str_num){
  if(title.length<=str_num) return title
  let new_title=title.replace(new RegExp('<br>', 'g'),'')
  let new_title1=new_title.replace(new RegExp('<br/>', 'g'),'')
  return new_title1.substr(0,str_num)+'...'
}
// 供求信息日期格式处理
function gq_date_format(date){
  let today=new Date()
  let new_date=new Date(date)
  let day=today-new_date
  return new Date(day).getDay()
}

function picture_array(pic_url){
  let list=pic_url.split(",")
  return list
}





/**
 * 统一翻译方法
 * @param key
 * @returns {*}
 */
function unity_lang(key) {
  return (share_lang[key] || {})[_lang] || ''
}

function referrer_link(a, _src, redirect) {
  a = $(a).attr("href");
  let b = redirect != null ? redirect : location.href;
  let _href = 1 < a.split("?").length ? (a + "&redirectUrl=" + encodeURIComponent(b)) : (a + "?redirectUrl=" + encodeURIComponent(b));
  location.href = (_src ? (_href + '&_src=' + _src) : _href) + '&pn=bang_line'
  return !1
}
/**
 * 验证是否登录
 * @param options
 *      login: 为true: 直接跳转到登录界面，为false 则返回验证状态
 *      has_sign: 是否需要验证登录情况
 * @returns {*}
 */
function verify_sign(options) {
  options = options || {};
  if (wg.user.uid) {
      if (!wg.user.user_id) {
          $.alert('' + unity_lang('share_no_open_tips') + '')
          return false
      }
      if (options.successful) return options.successful()
      return true
  }
  if (options.login) {
      // console.log(master_host() + '/login?redirectUrl=' + encodeURIComponent(window.location.href))
    window.location.href = master_host + '/login?redirectUrl=' + encodeURIComponent(window.location.href)
    return false
  }
  if (options.only_return) return false;
  if (options.call_sign) {
    options.call_sign();
    return false;
  }
  share_login_pop()
  return false
}

//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?00bdcd0867f6302e6879735ba7dc93d0";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

// 延迟加载或使用时加载js
var js_file_interval = {};

function load_js_file(call, callback) {
    if (typeof window[call] !== 'undefined' || typeof $.fn[call] !== 'undefined') {
        callback()
        return false;
    }

    var js_dom = document.createElement('script');
    js_dom.type = 'text/javascript';
    js_dom.async = true;
    js_dom.src = $('#' + call + '_js').val();
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(js_dom);
    js_file_interval[call] = window.setInterval(function () {
        if (typeof window[call] !== 'undefined' || typeof $.fn[call] !== 'undefined') {
            window.clearInterval(js_file_interval[call])
            callback()
        }
    }, 1000)
}



/**
 * 验证是否登录  未登录则跳转登录
 * @param callback
 */
function to_login(callback) {
  verify_sign({
    login: true,
    successful: callback
  })
}

/**
 * 验证是否登录 未登录直接返回状态
 * @returns {*}
 */
function return_sign(){
  return verify_sign({only_return: true})
}


/**
 * 语言路由
 * @returns {string}
 */
function route_lang() {
  return _lang == 'cn' ? '' : '/en'
}
/**
 * 提示登录弹窗
 */
function share_login_pop() {
  layer.open({
    type: 1,
    area: ['500px', 'auto'],
    shadeClose: true, //点击遮罩关闭
    content: '<div class="update-box">\n' +
      '<div class="update-img"></div>\n' +
      '<span class="update-text">' + unity_lang('membership_vistor_rights') + '</span>\n' +
      '<div class="update-btn" ><a class="update" href="/register" onclick="return referrer_link(this, \'detail\')" >' + unity_lang('membership_register') + '</a><a class="update" href="/login" onclick="return referrer_link(this, \'detail\')">' + unity_lang('membership_login') + '</a></div>\n' +
      '</div>'
  });
}

$(function () {
    // 统一tab切换
    $(document).on('click', '.tab:not(.failure)', function () {
        // failure 切换功能失效，但是样式啥的都要保留
        $(this).addClass('active').siblings('.tab').removeClass('active')
        var _target = $(this).data('target'), _pos = $(this).data('pos')
        if (_target) {

            if (_pos) {
                $(_target).find(_pos).addClass('active').siblings('.tab-pane').removeClass('active')
            } else {
                $(_target).find('.tab-pane').eq($(this).index()).addClass('active').siblings('.tab-pane').removeClass('active')
            }
        }
    })
    // region 输入框的清空相关操作
    $(document).on('focus', '.clear-target', function () {
        if ($(this).val()) {
            $(this).siblings('.clear-txt').show()
        } else {
            $(this).siblings('.clear-txt').hide()
        }
    })
    $(document).on('input', '.clear-target', function () {
        if ($(this).val()) {
            $(this).siblings('.clear-txt').show()
        } else {
            $(this).siblings('.clear-txt').hide()
        }
    })
    $(document).on('blur', '.clear-target', function () {
        if ($(this).val()) {
            $(this).siblings('.clear-txt').show()
        } else {
            $(this).siblings('.clear-txt').hide()
        }
    })
    $(document).on('click', '.clear-txt', function () {
        let $search = $($(this).data('esearch'))
        $(this).siblings('.clear-target').val('').change()
        $(this).hide()
        if ($search.length > 0) return $search.click()
        let efun = $(this).data('efun')
        try {
            window[efun]()
        } catch (e) { }
    })
    // endregion
    //小组成员排序方式切换
    $('.topic-sort').on('click', function () {
        let $this = $(this), sort = $this.data('value'), has = $this.data('has')
        if (!has) {
            $this.data('has', 1)
            unity_topic_list(sort, 1)
        }
    })
    nav_notification()
    full_pop()
})

function full_pop(){
    let open_options = {
        type: 1,
        skin: 'layui-layer-rim',
        area: ['600px', '500px'], // 配置长高
        shadeClose: false, //点击遮罩关闭
        maxmin: false,
        closeBtn: 1
    }
    $.gajax('/async/full/pop', {
        type: 'get',
        cache: false,
        datatype: "text/html",
        data: { pop_page_mark: page_mark },
        success: function (result) {
            if (result.state == 0) {
                open_options['content'] = result.content
                switch (result.mark) {
                    case 'yq_open':
                        open_options['area'] = ['600px', '']
                        open_options['title'] = '' + unity_lang('share_open') + ''
                        open_options['content'] = '<div class="no-open"><h2>' + unity_lang('pop_no_open_title') + '</h2><p>' + unity_lang('pop_no_open_des') + '</p><a href="'+ master_host +'/user/line/edit" target="_blank">' + unity_lang('pop_no_open_button') + '</a></div>'
                        break
                    case 'group_no_topic':
                        open_options['area'] = ['600px', '']
                        open_options['title'] = '' + unity_lang('share_no_posts') + ''
                        break
                    default:
                        break

                }
                layer.open(open_options);
            }
        }
    })
}

function sign_out() {
    $.get('/async/sign/out', function () {
        window.location.href = "/";
    })
}/**
 * 导航消息统计
 */
function nav_notification(){
  if($('.nav-notification').length > 0){
    $.ajax('/async/nav/notification', {
      datatype: 'json',
      type: 'get',
      success: function (result){
        if(result.state == 0){
          $.each(result.data, function (a, b){
            if(b > 0) {
                $('#' + a).addClass('hav').find('font').html(b)
                $($('#' + a).data('point')).removeClass('hide')
            }
          })
        }
      }
    })
  }
}

/**
 * 关注
 * @param elem
 */
function follow(elem) {
  to_login(function () {
    let $this = $(elem), user_id = $this.data('uid')
    $.ajax_interceptor('/async/follow', {
      data: {user_id: user_id},
      datatype: 'json',
      type: 'get',
      success: function (result) {
        if (result.state == 0) {
          return $this.html('' + unity_lang('share_clean') + '').attr('onclick', 'unfollow(this)')
        }
        $.alert('' + unity_lang('share_follow_failure') + '')
      }
    })
  })
}

/**
 * 取关
 * @param elem
 */
function unfollow(elem){
  to_login(function () {
    let $this = $(elem), user_id = $this.data('uid')
    $.ajax_interceptor('/async/unfollow', {
      data: {user_id: user_id},
      datatype: 'json',
      type: 'get',
      success: function (result) {
        if (result.state == 0) {
          return $this.html('' + unity_lang('share_follow') + '').attr('onclick', 'follow(this)')
        }
        $.alert('' + unity_lang('share_remove_failure') + '')
      }
    })
  })
}

/**
 * 入驻小组
 * @param elem
 */
function inbound_group(elem){
  to_login(function () {
    let $this = $(elem), group_id = $this.data('gid')
    $.ajax_interceptor('/async/inbound/group', {
      data: {group_id: group_id},
      datatype: 'json',
      type: 'get',
      success: function (result) {
          if(result.state == 304) return $('' + unity_lang('share_other_group') + '')
        if (result.state == 0) {
            try{
                is_join_group = 1
            }catch (e){
              console.log(e)
            }
            return $this.html('' + unity_lang('share_exit_group') + '').attr('onclick', 'exit_group(this)')
        }
        $.alert('' + unity_lang('share_other_group_tips') + '')
      }
    })
  })
}

/**
 * 退出小组
 * @param elem
 */
function exit_group(elem){
  to_login(function () {
    let $this = $(elem), group_id = $this.data('gid')
    $.ajax_interceptor('/async/exit/group', {
      data: {group_id: group_id},
      datatype: 'json',
      type: 'get',
      success: function (result) {
        if (result.state == 0) {
            try{
                is_join_group = 0
            }catch (e){
            }
            return $this.html('' + unity_lang('share_join_group') + '').attr('onclick', 'inbound_group(this)')
        }
        $.alert('' + unity_lang('share_exit_group_failure') + '')
      }
    })
  })
}

/**
 *
 */
function more_topic(){
    let $tab = $('.topic-sort.active'), sort = $tab.data('value'), $topic = $('#topic_list_' + sort)
    if($topic.length <= 0) return;
    // 加载中则不再次加载
    if($topic.data('loading')) return;
    let page = $topic.data('page')
    $topic.data('loading', '1')
    unity_topic_list(sort, page)
}
/**
 * 统一获取贴子列表
 * @param sort
 * @param page
 */
function unity_topic_list(sort, page) {
    let group_id = $('#group_id').val() || 0
    let user_id = $('#user_id').val() || 0
    page = Number(page || 1)
    let $topic = $('#topic_list_' + sort)
    $('.more-topic').html('' + unity_lang('share_loading') + '').removeAttr('onclick', 'more_topic()')
    $.gajax('/async/topic', {
        data: {page: page, sort: sort, group_id:  group_id, user_id: user_id},
        datatype: 'text',
        success: function (result) {
            $topic.append(result)
            let nt = $topic.find('.not-next').length
            if (nt <= 0) {
                $('.more-topic').removeClass('hide').html('' + unity_lang('share_loading_more') + '').attr('onclick', 'more_topic()')
                $topic.data('loading', '').data('page', page + 1)
            }
            else $('.more-topic').remove()
        }, error: function (e) {
            $('.more-topic').html('' + unity_lang('share_loading_more') + '').attr('onclick', 'more_topic()')
            $topic.data('loading', '')
        }
    })
}

/**
 *
 * @param topic_id
 */
function topic_report(topic_id) {
    to_login(function () {
        $.wiajax('/async/topic/report', {
            data: {topic_id: topic_id},
            type: "get",
            datatype: 'json',
            success: function (result) {
                if (result.state == 0) {
                    $.alert('' + unity_lang('share_report_successful') + '')
                    return false
                }
                $.alert(result.message)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
    })
}

/**
 *
 * @param topic_id
 */
function open_reply(topic_id) {
    to_login(function () {
        $('.open-reply:not(.open-reply-' + topic_id + ')').data('state', 'close')
        let $obtn = $('.open-reply-' + topic_id), state = $obtn.data('state'),
            avatar = $obtn.data('avatar'), uname = $obtn.data('uname')
        if (state == 'close') {
            $('.reply-edit-' + topic_id).html(
                '<div class="item-reply-edit">' +
                '<img class="item-reply-head" src="' + avatar + '" alt="">\n' +
                '    <div class="item-edit">\n' +
                '      <input type="text" class="item-reply-text" placeholder="' + uname + '' + unity_lang('share_share_post') + '">\n' +
                '        <button class="item-reply-btn" data-tid="' + topic_id + '" onClick="add_reply(this)">' + unity_lang('share_publish') + '</button>\n' +
                '</div></div>'
            )
            $('.reply-edit:not(.reply-edit-' + topic_id + ')').html('')
            $obtn.data('state', 'open')
        } else {
            $('.reply-edit').html('')
            $obtn.data('state', 'close')
        }
    })
}
/**
 * 添加贴子回复
 * @param elem
 */
function add_reply(elem) {
    to_login(function () {
        let $btn = $(elem), content = $btn.siblings('.item-reply-text').val(),
            topic_id = $btn.data('tid')
        if (!content) return $.alert('' + unity_lang('share_brilliant') + '')
        $btn.html('' + unity_lang('share_being_released') + '')
        $.wiajax('/async/topic/reply', {
            data: {content: content, topic_id: topic_id},
            datatype: 'text',
            type: 'post',
            success: function (result) {
                $btn.html('' + unity_lang('share_publish') + '')
                if (result.state == 0) {
                    $btn.siblings('.item-reply-text').val('')
                    return $.alert('' + unity_lang('share_reply_review') + '')
                }
                $.alert('' + unity_lang('share_reply_failed') + '')
            }, error: function (e) {
                $btn.html('' + unity_lang('share_publish') + '')
            }
        })
    })
}

/**
 * 更多回复
 */
function more_topic_reply(elem) {
    // 有初始加载的条数，所以要补 start
    let $btn = $(elem), start = $btn.data('start'), page = $btn.data('page'),
        topic_id = $btn.data('tid')
    $.wiajax('/async/topic/reply', {
        data: {start: start, page: page, topic_id: topic_id},
        datatype: 'text',
        type: 'get',
        success: function (result) {
            $btn.parents('.item-reply-content').find('.reply-content-list').append(result)
            if($btn.parents('.item-reply-content').find('.not-next').length > 0){
                $btn.parents('.reply-content-more').remove()
            }
        }, error: function (e) {
        }
    })
}

function pop_all(elem){
    let $this = $(elem), all = $this.data('all'), title = $this.data('title')

    layer.open({
        type: 1,
        skin: 'layui-layer-rim',
        area: ['600px', '300px'], // 配置长高
        shadeClose: false, //点击遮罩关闭
        maxmin: false,
        closeBtn: 1,
        title: title,
        // id: 'avatar_crop',
        content: all
    });
}

/**
 *
 * @returns {void|jQuery}
 */
function video_pop(elem) {
    let src = $(elem).data('src')
    layer.open({
        type: 1,
        skin: 'layui-layer-rim',
        area: ['940px', 'auto'], // 配置长高
        shadeClose: false, //点击遮罩关闭
        maxmin: false,
        closeBtn: 1,
        title: '' + unity_lang('default_multimedia_video') + '',
        id: 'video_show',
        content: '<div class="video-body">' +
            '<video autoplay="auto" class="editor" controls="controls" width="100%">' +
            '<source src="'+ src +'"></video></div>'
    });
}

/*  分页  */
(function ($) {
    var paging = function (elem, options) {
        this.$this = $(elem);
        this.options = options
        this.init()
    }
    paging.prototype = {
        /**
         *初始化
         */
        init: function () {
            this.cal()
            this.$pageCtrl = $('<div class="page_ctrl"></div>').appendTo(this.$this)
            this.$pageNum = $('<div></div>').appendTo(this.$pageCtrl)
            this.$pageDW = $('<div></div>').appendTo(this.$pageCtrl)
            this.$pageCtrl.append('<div>' + unity_lang('filter_page_to') + '</span><input class="input_page_num" type="text" value=""><span class="page_text"></span><a class="to_page_num">' + unity_lang('filter_page_confirm') + '</a></div>')
            this._render_length_menu()
            this.render()
            let _this = this
            this.$this.on('click', 'a[class="prev_page"]', function () {
                _this.prev_page()
            })
            this.$this.on('click', 'a[class="next_page"]', function () {
                _this.next_page()
            })
            this.$this.on('click', 'a[class="page_num"]', function () {
                _this.skip_page($(this).html())
            })
            this.$this.on('click', 'a[class="to_page_num"]', function () {
                let _page = parseInt(_this.$this.find('.input_page_num').val())
                if (isNaN(_page) || _page == 0) return this._alert('' + unity_lang('share_than_zero') + '')
                _this.skip_page(_page)
            })
        },
        _alert: function (msg) {
            // 注意 ： 这里需要配合layer  没有layer 插件则alert
            if (typeof layer != "undefined") layer.msg(msg)
            else alert(msg)
        },
        /**
         * 计算分页数据
         */
        cal: function () {
            this.total = parseInt(this.options.total || 10)
            this.per_num = parseInt(this.options.per || 10)
            this.current_page = parseInt(this.options.current || 1)
            this.total_page = Math.ceil(this.options.total / this.per_num);//计算总页数,
        },
        _render_length_menu: function () {
            if (!this.options.lengthChange) return;
            let _that = this
            if (typeof this.$pageDW.wdropdown != 'undefined') {
                this.$pageDW.wdropdown({
                    data: function (that) {
                        $.each(_that.options.lengthMenu, function () {
                            that.render_item({ value: this, text: this, selected: this == _that.per_num })
                        })
                    },
                    selected: function (e) {
                        _that.options.per = e.value
                        _that.per_num = e.value
                        _that.options.lengthChange(e.value)
                    }
                })
            }
        },
        /**
         * 渲染分页
         */
        render: function () {

            var page_num_html = '<a class="prev_page">' + unity_lang('filter_page_previous') + '</a>';
            for (var i = 0; i < this.total_page - 1; i++) {
                if (this.total_page > 4 && this.current_page > 2 && i < this.current_page - 1) {
                    if (i < 1) {
                        page_num_html += '<a class="page_num" >' + (i + 1) + '</a>';
                    } else if (i == 1) {
                        page_num_html += '<a class="page_dot">•••</a>';
                    }
                } else if (this.total_page > 4 && this.current_page < this.total_page - 3 && i > this.current_page + 1) {
                    if (this.current_page > 4 && i == this.current_page + 2) {
                        page_num_html += '<a class="page_dot">•••</a>';
                    } else if (this.current_page < 4) {
                        if (i < 4) {
                            page_num_html += '<a class="page_num">' + (i + 1) + '</a>';
                        } else if (i == 4) {
                            page_num_html += '<a class="page_dot">•••</a>';
                        }
                    }
                    //page_num_html+='<span class="page_dot">•••</span>';
                } else {
                    if (i == this.current_page - 1) {
                        page_num_html += '<a class="page_num current_page">' + (i + 1) + '</a>';
                    } else {
                        page_num_html += '<a class="page_num">' + (i + 1) + '</a>';
                    }
                }
            }
            if (this.current_page == this.total_page) {
                page_num_html += '<a class="page_num current_page">' + (i + 1) + '</a>';
            } else {
                page_num_html += '<a class="page_num" >' + (i + 1) + '</a>';
            }
            page_num_html += '<a class="next_page" >' + unity_lang('filter_page_next') + '</a><span class="page_total">' + this.current_page + '/ ' + this.total_page
            this.$pageNum.html(page_num_html);
            if (this.current_page == 1) {
                this.$this.find('.page_ctrl .prev_page').attr('disabled', 'disabled').addClass('btn_dis');
            } else {
                this.$this.find('.page_ctrl .prev_page').removeAttr('disabled').removeClass('btn_dis');
            }
            if (this.current_page == this.total_page) {
                this.$this.find('.page_ctrl .next_page').attr('disabled', 'disabled').addClass('btn_dis');
            } else {
                this.$this.find('.page_ctrl .next_page').removeAttr('disabled').removeClass('btn_dis');
            }
            this.$this.show()
            // if()
        },
        /**
         * 上一页
         */
        prev_page: function () {
            if (this.current_page > 1) {
                this.current_page--;
                this.callback()
            }
        },
        /**
         * 下一页
         */
        next_page: function () {
            if (this.current_page < this.total_page) {
                this.current_page++;
                this.callback()
            }
        },
        /**
         * 跳页
         * @param page
         */
        skip_page: function (page) {
            this.current_page = parseInt(page);

            if (this.current_page > 0 && this.current_page <= this.total_page) {
                this.callback()
            }
        },
        reload: function (options) {
            this.options = $.extend({}, this.options, options, true);

            this.cal()
            this.render()
        },
        /**
         * 回调函数
         */
        callback: function () {
            if (this.options.btn) {

            }
            var _that = this
            // start: size 模式
            if (this.options.offset == true) {
                this.options.callback((this.current_page - 1) * this.per_num, function () {
                    _that.render()
                }, this.per_num)
            } else {
                this.options.callback(this.current_page, function () {
                    _that.render()

                }, this.per_num)
            }
        },
        clear: function () {
            this.$this.hide()
        }

    }

    /**
     * 插件化
     */
    function plugin(options) {
        var page_obj = $(this).data('paging')
        if (page_obj) {
            if (options && options.reload) {
                page_obj.reload(options)
            }
            return page_obj
        }
        let defaults = {
            callback: function (page_or_start, call, per) {
                return true
            },
            total: 10,
            per: 10,
            current: 1,
            offset: false,  // 是否为 start size  模式[第一页： 0到行数]
            lengthChange: false,  // 是否可以改变每页大小
            lengthMenu: [20, 40, 60],  // 可以改变每页大小的情况下的页码菜单
        }


        options = $.extend(defaults, options);
        page_obj = new paging(this, $.extend({}, options, $(this).data()))
        console.log(page_obj, 'page_obj')
        $(this).data('paging', page_obj)
        return page_obj
    }

    $.fn.paging = plugin;
})(jQuery);
/*!
 * layer - 通用 Web 弹出层组件
 * MIT Licensed
 */
(function (window, undefined) {
  "use strict";

  var isLayui = window.layui && layui.define, $, win, ready = {
    config: {}, end: {}, minIndex: 0, minLeft: [],
    btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],

    //五种原始层模式
    type: ['dialog', 'page', 'iframe', 'loading', 'tips'],

    //获取节点的style属性值
    getStyle: function (node, name) {
      var style = node.currentStyle ? node.currentStyle : window.getComputedStyle(node, null);
      return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
    },

  };

  //默认内置方法。
  var layer = {
    v: '3.5.1',
    ie: function () { //ie版本
      var agent = navigator.userAgent.toLowerCase();
      return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
        (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
      ) : false;
    }(),
    index: (window.layer && window.layer.v) ? 100000 : 0,
    config: function (options, fn) {
      options = options || {};
      layer.cache = ready.config = $.extend({}, ready.config, options);
      typeof options.extend === 'string' && (options.extend = [options.extend]);

      //如果设置了路径，则加载样式
      if (ready.config.path) layer.ready();

      if (!options.extend) return this;
      return this;
    },

    //主体CSS等待事件
    ready: function (callback) {
      return this;
    },

    //各种快捷引用
    alert: function (content, options, yes) {
      var type = typeof options === 'function';
      if (type) yes = options;
      return layer.open($.extend({
        content: content,
        yes: yes
      }, type ? {} : options));
    },

    confirm: function (content, options, yes, cancel) {
      var type = typeof options === 'function';
      if (type) {
        cancel = yes;
        yes = options;
      }
      return layer.open($.extend({
        content: content,
        btn: ready.btn,
        yes: yes,
        btn2: cancel
      }, type ? {} : options));
    },

    msg: function (content, options, end) { //最常用提示层
      var type = typeof options === 'function', rskin = ready.config.skin;
      var skin = (rskin ? rskin + ' ' + rskin + '-msg' : '') || 'layui-layer-msg';
      var anim = doms.anim.length - 1;
      if (type) end = options;
      return layer.open($.extend({
        content: content,
        time: 3000,
        shade: false,
        skin: skin,
        title: false,
        closeBtn: false,
        btn: false,
        resize: false,
        end: end
      }, (type && !ready.config.skin) ? {
        skin: skin + ' layui-layer-hui',
        anim: anim
      } : function () {
        options = options || {};
        if (options.icon === -1 || options.icon === undefined && !ready.config.skin) {
          options.skin = skin + ' ' + (options.skin || 'layui-layer-hui');
        }
        return options;
      }()));
    },

    load: function (icon, options) {
      return layer.open($.extend({
        type: 3,
        icon: icon || 0,
        resize: false,
        shade: 0.01
      }, options));
    },

    tips: function (content, follow, options) {
      return layer.open($.extend({
        type: 4,
        content: [content, follow],
        closeBtn: false,
        time: 3000,
        shade: false,
        resize: false,
        fixed: false,
        maxWidth: 260
      }, options));
    }
  };

  var Class = function (setings) {
    var that = this, creat = function () {
      that.creat();
    };
    that.index = ++layer.index;
    that.config.maxWidth = $(win).width() - 15 * 2; //初始最大宽度：当前屏幕宽，左右留 15px 边距
    that.config = $.extend({}, that.config, ready.config, setings);
    document.body ? creat() : setTimeout(function () {
      creat();
    }, 30);
  };

  Class.pt = Class.prototype;

  //缓存常用字符
  var doms = ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'];
  doms.anim = ['layer-anim-00', 'layer-anim-01', 'layer-anim-02', 'layer-anim-03', 'layer-anim-04', 'layer-anim-05', 'layer-anim-06'];

  doms.SHADE = 'layui-layer-shade';
  doms.MOVE = 'layui-layer-move';

  //默认配置
  Class.pt.config = {
    type: 0,
    shade: 0.3,
    fixed: true,
    move: doms[1],
    title: '&#x4FE1;&#x606F;',
    offset: 'auto',
    area: 'auto',
    closeBtn: 1,
    time: 0, //0表示不自动关闭
    zIndex: 19891014,
    maxWidth: 360,
    anim: 0,
    isOutAnim: true, //退出动画
    minStack: true, //最小化堆叠
    icon: -1,
    moveType: 1,
    resize: true,
    scrollbar: true, //是否允许浏览器滚动条
    tips: 2
  };

  //容器
  Class.pt.vessel = function (conType, callback) {
    var that = this, times = that.index, config = that.config;
    var zIndex = config.zIndex + times, titype = typeof config.title === 'object';
    var ismax = config.maxmin && (config.type === 1 || config.type === 2);
    var titleHTML = (config.title ? '<div class="layui-layer-title" style="' + (titype ? config.title[1] : '') + '">'
      + (titype ? config.title[0] : config.title)
      + '</div>' : '');

    config.zIndex = zIndex;
    callback([
      //遮罩
      config.shade ? ('<div class="' + doms.SHADE + '" id="' + doms.SHADE + times + '" times="' + times + '" style="' + ('z-index:' + (zIndex - 1) + '; ') + '"></div>') : '',

      //主体
      '<div class="' + doms[0] + (' layui-layer-' + ready.type[config.type]) + (((config.type == 0 || config.type == 2) && !config.shade) ? ' layui-layer-border' : '') + ' ' + (config.skin || '') + '" id="' + doms[0] + times + '" type="' + ready.type[config.type] + '" times="' + times + '" showtime="' + config.time + '" conType="' + (conType ? 'object' : 'string') + '" style="z-index: ' + zIndex + '; width:' + config.area[0] + ';height:' + config.area[1] + ';position:' + (config.fixed ? 'fixed;' : 'absolute;') + '">'
      + (conType && config.type != 2 ? '' : titleHTML)
      + '<div id="' + (config.id || '') + '" class="layui-layer-content' + ((config.type == 0 && config.icon !== -1) ? ' layui-layer-padding' : '') + (config.type == 3 ? ' layui-layer-loading' + config.icon : '') + '">'
      + (config.type == 0 && config.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + config.icon + '"></i>' : '')
      + (config.type == 1 && conType ? '' : (config.content || ''))
      + '</div>'
      + '<span class="layui-layer-setwin">' + function () {
        var closebtn = ismax ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '';
        config.closeBtn && (closebtn += '<a  class="layui-layer-ico ' + doms[7] + ' ' + doms[7] + (config.title ? config.closeBtn : (config.type == 4 ? '1' : '2')) + '" href="javascript:;"></a>');
        return closebtn;
      }() + '</span>'
      + (config.btn ? function () {
        var button = '';
        typeof config.btn === 'string' && (config.btn = [config.btn]);
        for (var i = 0, len = config.btn.length; i < len; i++) {
          let _href = config.btn_href && config.btn_href.length >= i ? config.btn_href[i] : ''
          button += '<a class="' + doms[6] + '' + i + '" ' + (_href ? (' target="_blank" href="' + _href + '"') : '') + '>' + config.btn[i] + '</a>'
        }
        return '<div class="' + doms[6] + ' layui-layer-btn-' + (config.btnAlign || '') + '">' + button + '</div>'
      }() : '')
      + (config.resize ? '<span class="layui-layer-resize"></span>' : '')
      + '</div>'
    ], titleHTML, $('<div class="' + doms.MOVE + '" id="' + doms.MOVE + '"></div>'));
    return that;
  };

  //创建骨架
  Class.pt.creat = function () {
    var that = this
      , config = that.config
      , times = that.index, nodeIndex
      , content = config.content
      , conType = typeof content === 'object'
      , body = $('body');

    if (config.id && $('#' + config.id)[0]) return;

    if (typeof config.area === 'string') {
      config.area = config.area === 'auto' ? ['', ''] : [config.area, ''];
    }

    //anim兼容旧版shift
    if (config.shift) {
      config.anim = config.shift;
    }

    if (layer.ie == 6) {
      config.fixed = false;
    }

    switch (config.type) {
      case 0:
        config.btn = ('btn' in config) ? config.btn : ready.btn[0];
        layer.closeAll('dialog');
        break;
      case 2:
        var content = config.content = conType ? config.content : [config.content || '', 'auto'];
        config.content = '<iframe scrolling="' + (config.content[1] || 'auto') + '" allowtransparency="true" id="' + doms[4] + '' + times + '" name="' + doms[4] + '' + times + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + config.content[0] + '"></iframe>';
        break;
      case 3:
        delete config.title;
        delete config.closeBtn;
        config.icon === -1 && (config.icon === 0);
        layer.closeAll('loading');
        break;
      case 4:
        conType || (config.content = [config.content, 'body']);
        config.follow = config.content[1];
        config.content = config.content[0] + '<i class="layui-layer-TipsG"></i>';
        delete config.title;
        config.tips = typeof config.tips === 'object' ? config.tips : [config.tips, true];
        config.tipsMore || layer.closeAll('tips');
        break;
    }
    //建立容器
    that.vessel(conType, function (html, titleHTML, moveElem) {
      body.append(html[0]);
      conType ? function () {
        (config.type == 2 || config.type == 4) ? function () {
          $('body').append(html[1]);
        }() : function () {
          if (!content.parents('.' + doms[0])[0]) {
            content.data('display', content.css('display')).show().addClass('layui-layer-wrap').wrap(html[1]);
            $('#' + doms[0] + times).find('.' + doms[5]).before(titleHTML);
          }
        }();
      }() : body.append(html[1]);
      $('#' + doms.MOVE)[0] || body.append(ready.moveElem = moveElem);

      that.layero = $('#' + doms[0] + times);
      that.shadeo = $('#' + doms.SHADE + times);

      config.scrollbar || doms.html.css('overflow', 'hidden').attr('layer-full', times);
    }).auto(times);

    //遮罩
    that.shadeo.css({
      'background-color': config.shade[1] || '#000'
      , 'opacity': config.shade[0] || config.shade
    });

    config.type == 2 && layer.ie == 6 && that.layero.find('iframe').attr('src', content[0]);

    //坐标自适应浏览器窗口尺寸
    config.type == 4 ? that.tips() : function () {
      that.offset()
      //首次弹出时，若 css 尚未加载，则等待 css 加载完毕后，重新设定尺寸
      parseInt(ready.getStyle(document.getElementById(doms.MOVE), 'z-index')) || function () {
        that.layero.css('visibility', 'hidden');
        layer.ready(function () {
          that.offset();
          that.layero.css('visibility', 'visible');
        });
      }();
    }();

    //如果是固定定位
    if (config.fixed) {
      win.on('resize', function () {
        that.offset();
        (/^\d+%$/.test(config.area[0]) || /^\d+%$/.test(config.area[1])) && that.auto(times);
        config.type == 4 && that.tips();
      });
    }

    config.time <= 0 || setTimeout(function () {
      layer.close(that.index);
    }, config.time);
    that.move().callback();

    //为兼容jQuery3.0的css动画影响元素尺寸计算
    if (doms.anim[config.anim]) {
      var animClass = 'layer-anim ' + doms.anim[config.anim];
      that.layero.addClass(animClass).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass(animClass);
      });
    }


    //记录关闭动画
    if (config.isOutAnim) {
      that.layero.data('isOutAnim', true);
    }
  };

  //自适应
  Class.pt.auto = function (index) {
    var that = this, config = that.config, layero = $('#' + doms[0] + index);

    if (config.area[0] === '' && config.maxWidth > 0) {
      //为了修复IE7下一个让人难以理解的bug
      if (layer.ie && layer.ie < 8 && config.btn) {
        layero.width(layero.innerWidth());
      }
      layero.outerWidth() > config.maxWidth && layero.width(config.maxWidth);
    }

    var area = [layero.innerWidth(), layero.innerHeight()]
      , titHeight = layero.find(doms[1]).outerHeight() || 0
      , btnHeight = layero.find('.' + doms[6]).outerHeight() || 0
      , setHeight = function (elem) {
      elem = layero.find(elem);
      elem.height(area[1] - titHeight - btnHeight - 2 * (parseFloat(elem.css('padding-top')) | 0));
    };

    switch (config.type) {
      case 2:
        setHeight('iframe');
        break;
      default:
        if (config.area[1] === '') {
          if (config.maxHeight > 0 && layero.outerHeight() > config.maxHeight) {
            area[1] = config.maxHeight;
            setHeight('.' + doms[5]);
          } else if (config.fixed && area[1] >= win.height()) {
            area[1] = win.height();
            setHeight('.' + doms[5]);
          }
        } else {
          setHeight('.' + doms[5]);
        }
        break;
    }


    return that;
  };

  //计算坐标
  Class.pt.offset = function () {
    var that = this, config = that.config, layero = that.layero;
    var area = [layero.outerWidth(), layero.outerHeight()];
    var type = typeof config.offset === 'object';
    that.offsetTop = (win.height() - area[1]) / 2;
    that.offsetLeft = (win.width() - area[0]) / 2;

    if (type) {
      that.offsetTop = config.offset[0];
      that.offsetLeft = config.offset[1] || that.offsetLeft;
    } else if (config.offset !== 'auto') {

      if (config.offset === 't') { //上
        that.offsetTop = 0;
      } else if (config.offset === 'r') { //右
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === 'b') { //下
        that.offsetTop = win.height() - area[1];
      } else if (config.offset === 'l') { //左
        that.offsetLeft = 0;
      } else if (config.offset === 'lt') { //左上角
        that.offsetTop = 0;
        that.offsetLeft = 0;
      } else if (config.offset === 'lb') { //左下角
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = 0;
      } else if (config.offset === 'rt') { //右上角
        that.offsetTop = 0;
        that.offsetLeft = win.width() - area[0];
      } else if (config.offset === 'rb') { //右下角
        that.offsetTop = win.height() - area[1];
        that.offsetLeft = win.width() - area[0];
      } else {
        that.offsetTop = config.offset;
      }

    }

    if (!config.fixed) {
      that.offsetTop = /%$/.test(that.offsetTop) ?
        win.height() * parseFloat(that.offsetTop) / 100
        : parseFloat(that.offsetTop);
      that.offsetLeft = /%$/.test(that.offsetLeft) ?
        win.width() * parseFloat(that.offsetLeft) / 100
        : parseFloat(that.offsetLeft);
      that.offsetTop += win.scrollTop();
      that.offsetLeft += win.scrollLeft();
    }

    if (layero.attr('minLeft')) {
      that.offsetTop = win.height() - (layero.find(doms[1]).outerHeight() || 0);
      that.offsetLeft = layero.css('left');
    }

    layero.css({ top: that.offsetTop, left: that.offsetLeft });
  };

  //Tips
  Class.pt.tips = function () {
    var that = this, config = that.config, layero = that.layero;
    var layArea = [layero.outerWidth(), layero.outerHeight()], follow = $(config.follow);
    if (!follow[0]) follow = $('body');
    var goal = {
      width: follow.outerWidth(),
      height: follow.outerHeight(),
      top: follow.offset().top,
      left: follow.offset().left
    }, tipsG = layero.find('.layui-layer-TipsG');

    var guide = config.tips[0];
    config.tips[1] || tipsG.remove();

    goal.autoLeft = function () {
      if (goal.left + layArea[0] - win.width() > 0) {
        goal.tipLeft = goal.left + goal.width - layArea[0];
        tipsG.css({ right: 12, left: 'auto' });
      } else {
        goal.tipLeft = goal.left;
      }

    };

    //辨别tips的方位
    goal.where = [function () { //上
      goal.autoLeft();
      goal.tipTop = goal.top - layArea[1] - 10;
      tipsG.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', config.tips[1]);
    }, function () { //右
      goal.tipLeft = goal.left + goal.width + 10;
      goal.tipTop = goal.top;
      tipsG.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', config.tips[1]);
    }, function () { //下
      goal.autoLeft();
      goal.tipTop = goal.top + goal.height + 10;
      tipsG.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', config.tips[1]);
    }, function () { //左
      goal.tipLeft = goal.left - layArea[0] - 10;
      goal.tipTop = goal.top;
      tipsG.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', config.tips[1]);
    }];
    goal.where[guide - 1]();

    /* 8*2为小三角形占据的空间 */
    if (guide === 1) {
      goal.top - (win.scrollTop() + layArea[1] + 8 * 2) < 0 && goal.where[2]();
    } else if (guide === 2) {
      win.width() - (goal.left + goal.width + layArea[0] + 8 * 2) > 0 || goal.where[3]()
    } else if (guide === 3) {
      (goal.top - win.scrollTop() + goal.height + layArea[1] + 8 * 2) - win.height() > 0 && goal.where[0]();
    } else if (guide === 4) {
      layArea[0] + 8 * 2 - goal.left > 0 && goal.where[1]()
    }

    layero.find('.' + doms[5]).css({
      'background-color': config.tips[1],
      'padding-right': (config.closeBtn ? '30px' : '')
    });
    layero.css({
      left: goal.tipLeft - (config.fixed ? win.scrollLeft() : 0),
      top: goal.tipTop - (config.fixed ? win.scrollTop() : 0)
    });
  }

  //拖拽层
  Class.pt.move = function () {
    var that = this
      , config = that.config
      , _DOC = $(document)
      , layero = that.layero
      , moveElem = layero.find(config.move)
      , resizeElem = layero.find('.layui-layer-resize')
      , dict = {};

    if (config.move) {
      moveElem.css('cursor', 'move');
    }

    moveElem.on('mousedown', function (e) {
      e.preventDefault();
      if (config.move) {
        dict.moveStart = true;
        dict.offset = [
          e.clientX - parseFloat(layero.css('left'))
          , e.clientY - parseFloat(layero.css('top'))
        ];
        ready.moveElem.css('cursor', 'move').show();
      }
    });

    resizeElem.on('mousedown', function (e) {
      e.preventDefault();
      dict.resizeStart = true;
      dict.offset = [e.clientX, e.clientY];
      dict.area = [
        layero.outerWidth()
        , layero.outerHeight()
      ];
      ready.moveElem.css('cursor', 'se-resize').show();
    });

    _DOC.on('mousemove', function (e) {

      //拖拽移动
      if (dict.moveStart) {
        var X = e.clientX - dict.offset[0]
          , Y = e.clientY - dict.offset[1]
          , fixed = layero.css('position') === 'fixed';

        e.preventDefault();

        dict.stX = fixed ? 0 : win.scrollLeft();
        dict.stY = fixed ? 0 : win.scrollTop();

        //控制元素不被拖出窗口外
        if (!config.moveOut) {
          var setRig = win.width() - layero.outerWidth() + dict.stX
            , setBot = win.height() - layero.outerHeight() + dict.stY;
          X < dict.stX && (X = dict.stX);
          X > setRig && (X = setRig);
          Y < dict.stY && (Y = dict.stY);
          Y > setBot && (Y = setBot);
        }

        layero.css({
          left: X
          , top: Y
        });
      }

      //Resize
      if (config.resize && dict.resizeStart) {
        var X = e.clientX - dict.offset[0]
          , Y = e.clientY - dict.offset[1];

        e.preventDefault();

        layer.style(that.index, {
          width: dict.area[0] + X
          , height: dict.area[1] + Y
        })
        dict.isResize = true;
        config.resizing && config.resizing(layero);
      }
    }).on('mouseup', function (e) {
      if (dict.moveStart) {
        delete dict.moveStart;
        ready.moveElem.hide();
        config.moveEnd && config.moveEnd(layero);
      }
      if (dict.resizeStart) {
        delete dict.resizeStart;
        ready.moveElem.hide();
      }
    });

    return that;
  };

  Class.pt.callback = function () {
    var that = this, layero = that.layero, config = that.config;
    that.openLayer();
    if (config.success) {
      if (config.type == 2) {
        layero.find('iframe').on('load', function () {
          config.success(layero, that.index, that);
        });
      } else {
        config.success(layero, that.index, that);
      }
    }
    layer.ie == 6 && that.IE6(layero);

    //按钮
    layero.find('.' + doms[6]).children('a').on('click', function () {
      var index = $(this).index();
      if (index === 0) {
        if (config.yes) {
          config.yes(that.index, layero)
        } else if (config['btn1']) {
          config['btn1'](that.index, layero)
        } else {
          layer.close(that.index);
        }
      } else {
        var close = config['btn' + (index + 1)] && config['btn' + (index + 1)](that.index, layero);
        close === false || layer.close(that.index);
      }
    });

    //取消
    function cancel() {
      var close = config.cancel && config.cancel(that.index, layero);
      close === false || layer.close(that.index);
    }

    //右上角关闭回调
    layero.find('.' + doms[7]).on('click', cancel);

    //点遮罩关闭
    if (config.shadeClose) {
      that.shadeo.on('click', function () {
        layer.close(that.index);
      });
    }

    //最小化
    layero.find('.layui-layer-min').on('click', function () {
      var min = config.min && config.min(layero, that.index);
      min === false || layer.min(that.index, config);
    });

    //全屏/还原
    layero.find('.layui-layer-max').on('click', function () {
      if ($(this).hasClass('layui-layer-maxmin')) {
        layer.restore(that.index);
        config.restore && config.restore(layero, that.index);
      } else {
        layer.full(that.index, config);
        setTimeout(function () {
          config.full && config.full(layero, that.index);
        }, 100);
      }
    });

    config.end && (ready.end[that.index] = config.end);
  };

  //for ie6 恢复select
  ready.reselect = function () {
    $.each($('select'), function (index, value) {
      var sthis = $(this);
      if (!sthis.parents('.' + doms[0])[0]) {
        (sthis.attr('layer') == 1 && $('.' + doms[0]).length < 1) && sthis.removeAttr('layer').show();
      }
      sthis = null;
    });
  };

  Class.pt.IE6 = function (layero) {
    //隐藏select
    $('select').each(function (index, value) {
      var sthis = $(this);
      if (!sthis.parents('.' + doms[0])[0]) {
        sthis.css('display') === 'none' || sthis.attr({ 'layer': '1' }).hide();
      }
      sthis = null;
    });
  };

  //需依赖原型的对外方法
  Class.pt.openLayer = function () {
    var that = this;

    //置顶当前窗口
    layer.zIndex = that.config.zIndex;
    layer.setTop = function (layero) {
      var setZindex = function () {
        layer.zIndex++;
        layero.css('z-index', layer.zIndex + 1);
      };
      layer.zIndex = parseInt(layero[0].style.zIndex);
      layero.on('mousedown', setZindex);
      return layer.zIndex;
    };
  };

  //记录宽高坐标，用于还原
  ready.record = function (layero) {
    var area = [
      layero.width(),
      layero.height(),
      layero.position().top,
      layero.position().left + parseFloat(layero.css('margin-left'))
    ];
    layero.find('.layui-layer-max').addClass('layui-layer-maxmin');
    layero.attr({ area: area });
  };

  ready.rescollbar = function (index) {
    if (doms.html.attr('layer-full') == index) {
      if (doms.html[0].style.removeProperty) {
        doms.html[0].style.removeProperty('overflow');
      } else {
        doms.html[0].style.removeAttribute('overflow');
      }
      doms.html.removeAttr('layer-full');
    }
  };

  /** 内置成员 */

  window.layer = layer;

  //获取子iframe的DOM
  layer.getChildFrame = function (selector, index) {
    index = index || $('.' + doms[4]).attr('times');
    return $('#' + doms[0] + index).find('iframe').contents().find(selector);
  };

  //得到当前iframe层的索引，子iframe时使用
  layer.getFrameIndex = function (name) {
    return $('#' + name).parents('.' + doms[4]).attr('times');
  };

  //iframe层自适应宽高
  layer.iframeAuto = function (index) {
    if (!index) return;
    var heg = layer.getChildFrame('html', index).outerHeight();
    var layero = $('#' + doms[0] + index);
    var titHeight = layero.find(doms[1]).outerHeight() || 0;
    var btnHeight = layero.find('.' + doms[6]).outerHeight() || 0;
    layero.css({ height: heg + titHeight + btnHeight });
    layero.find('iframe').css({ height: heg });
  };

  //重置iframe url
  layer.iframeSrc = function (index, url) {
    $('#' + doms[0] + index).find('iframe').attr('src', url);
  };

  //设定层的样式
  layer.style = function (index, options, limit) {
    var layero = $('#' + doms[0] + index)
      , contElem = layero.find('.layui-layer-content')
      , type = layero.attr('type')
      , titHeight = layero.find(doms[1]).outerHeight() || 0
      , btnHeight = layero.find('.' + doms[6]).outerHeight() || 0
      , minLeft = layero.attr('minLeft');

    if (type === ready.type[3] || type === ready.type[4]) {
      return;
    }

    if (!limit) {
      if (parseFloat(options.width) <= 260) {
        options.width = 260;
      }


      if (parseFloat(options.height) - titHeight - btnHeight <= 64) {
        options.height = 64 + titHeight + btnHeight;
      }

    }

    layero.css(options);
    btnHeight = layero.find('.' + doms[6]).outerHeight();

    if (type === ready.type[2]) {
      layero.find('iframe').css({
        height: parseFloat(options.height) - titHeight - btnHeight
      });
    } else {
      contElem.css({
        height: parseFloat(options.height) - titHeight - btnHeight
          - parseFloat(contElem.css('padding-top'))
          - parseFloat(contElem.css('padding-bottom'))
      })
    }
  };

  //最小化
  layer.min = function (index, options) {
    options = options || {};
    var layero = $('#' + doms[0] + index)
      , shadeo = $('#' + doms.SHADE + index)
      , titHeight = layero.find(doms[1]).outerHeight() || 0
      , left = layero.attr('minLeft') || (181 * ready.minIndex) + 'px'
      , position = layero.css('position')
      , settings = {
      width: 180
      , height: titHeight
      , position: 'fixed'
      , overflow: 'hidden'
    };

    //记录宽高坐标，用于还原
    ready.record(layero);

    if (ready.minLeft[0]) {
      left = ready.minLeft[0];
      ready.minLeft.shift();
    }

    //是否堆叠在左下角
    if (options.minStack) {
      settings.left = left;
      settings.top = win.height() - titHeight;
      layero.attr('minLeft') || ready.minIndex++; //初次执行，最小化操作索引自增
      layero.attr('minLeft', left);
    }

    layero.attr('position', position);
    layer.style(index, settings, true);

    layero.find('.layui-layer-min').hide();
    layero.attr('type') === 'page' && layero.find(doms[4]).hide();
    ready.rescollbar(index);

    //隐藏遮罩
    shadeo.hide();
  };

  //还原
  layer.restore = function (index) {
    var layero = $('#' + doms[0] + index)
      , shadeo = $('#' + doms.SHADE + index)
      , area = layero.attr('area').split(',')
      , type = layero.attr('type');

    //恢复原来尺寸
    layer.style(index, {
      width: parseFloat(area[0]),
      height: parseFloat(area[1]),
      top: parseFloat(area[2]),
      left: parseFloat(area[3]),
      position: layero.attr('position'),
      overflow: 'visible'
    }, true);

    layero.find('.layui-layer-max').removeClass('layui-layer-maxmin');
    layero.find('.layui-layer-min').show();
    layero.attr('type') === 'page' && layero.find(doms[4]).show();
    ready.rescollbar(index);

    //恢复遮罩
    shadeo.show();
  };

  //全屏
  layer.full = function (index) {
    var layero = $('#' + doms[0] + index), timer;
    ready.record(layero);
    if (!doms.html.attr('layer-full')) {
      doms.html.css('overflow', 'hidden').attr('layer-full', index);
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      var isfix = layero.css('position') === 'fixed';
      layer.style(index, {
        top: isfix ? 0 : win.scrollTop(),
        left: isfix ? 0 : win.scrollLeft(),
        width: win.width(),
        height: win.height()
      }, true);
      layero.find('.layui-layer-min').hide();
    }, 100);
  };

  //改变title
  layer.title = function (name, index) {
    var title = $('#' + doms[0] + (index || layer.index)).find(doms[1]);
    title.html(name);
  };
  layer.closeByChild = function ($el) {
    layer.close($el.parents('.layui-layer').attr('times') || 1)
  }
  //关闭layer总方法
  layer.close = function (index, callback) {
    var layero = $('#' + doms[0] + index), type = layero.attr('type'), closeAnim = 'layer-anim-close';
    if (!layero[0]) return;
    var WRAP = 'layui-layer-wrap', remove = function () {
      if (type === ready.type[1] && layero.attr('conType') === 'object') {
        layero.children(':not(.' + doms[5] + ')').remove();
        var wrap = layero.find('.' + WRAP);
        for (var i = 0; i < 2; i++) {
          wrap.unwrap();
        }
        wrap.css('display', wrap.data('display')).removeClass(WRAP);
      } else {
        //低版本IE 回收 iframe
        if (type === ready.type[2]) {
          try {
            var iframe = $('#' + doms[4] + index)[0];
            iframe.contentWindow.document.write('');
            iframe.contentWindow.close();
            layero.find('.' + doms[5])[0].removeChild(iframe);
          } catch (e) {
          }
        }
        layero[0].innerHTML = '';
        layero.remove();
      }
      typeof ready.end[index] === 'function' && ready.end[index]();
      delete ready.end[index];
      typeof callback === 'function' && callback();
    };

    if (layero.data('isOutAnim')) {
      layero.addClass('layer-anim ' + closeAnim);
    }

    $('#layui-layer-moves, #' + doms.SHADE + index).remove();
    layer.ie == 6 && ready.reselect();
    ready.rescollbar(index);
    if (layero.attr('minLeft')) {
      ready.minIndex--;
      ready.minLeft.push(layero.attr('minLeft'));
    }

    if ((layer.ie && layer.ie < 10) || !layero.data('isOutAnim')) {
      remove()
    } else {
      setTimeout(function () {
        remove();
      }, 200);
    }
  };

  //关闭所有层
  layer.closeAll = function (type, callback) {
    if (typeof type === 'function') {
      callback = type;
      type = null;
    }

    var domsElem = $('.' + doms[0]);
    $.each(domsElem, function (_index) {
      var othis = $(this);
      var is = type ? (othis.attr('type') === type) : 1;
      is && layer.close(othis.attr('times'), _index === domsElem.length - 1 ? callback : null);
      is = null;
    });
    if (domsElem.length === 0) typeof callback === 'function' && callback();
  };

  /**

   拓展模块，layui 开始合并在一起

   */

  var cache = layer.cache || {}, skin = function (type) {
    return (cache.skin ? (' ' + cache.skin + ' ' + cache.skin + '-' + type) : '');
  };

  //仿系统prompt
  layer.prompt = function (options, yes) {
    var style = '';
    options = options || {};

    if (typeof options === 'function') yes = options;

    if (options.area) {
      var area = options.area;
      style = 'style="width: ' + area[0] + '; height: ' + area[1] + ';"';
      delete options.area;
    }
    var prompt,
      content = options.formType == 2 ? '<textarea class="layui-layer-input"' + style + '></textarea>' : function () {
        return '<input type="' + (options.formType == 1 ? 'password' : 'text') + '" class="layui-layer-input">';
      }();

    var success = options.success;
    delete options.success;

    return layer.open($.extend({
      type: 1
      , btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;']
      , content: content
      , skin: 'layui-layer-prompt' + skin('prompt')
      , maxWidth: win.width()
      , success: function (layero) {
        prompt = layero.find('.layui-layer-input');
        prompt.val(options.value || '').focus();
        typeof success === 'function' && success(layero);
      }
      , resize: false
      , yes: function (index) {
        var value = prompt.val();
        if (value === '') {
          prompt.focus();
        } else if (value.length > (options.maxlength || 500)) {
          layer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (options.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', prompt, { tips: 1 });
        } else {
          yes && yes(value, index, prompt);
        }
      }
    }, options));
  };


  //主入口
  ready.run = function (_$) {
    $ = _$;
    win = $(window);
    doms.html = $('html');
    layer.open = function (deliver) {
      var o = new Class(deliver);
      return o.index;
    };
  };

  //加载方式
  window.layui && layui.define ? (
    layer.ready()
      , layui.define('jquery', function (exports) { //layui 加载
      layer.path = layui.cache.dir;
      ready.run(layui.$);

      //暴露模块
      window.layer = layer;
      exports('layer', layer);
    })
  ) : (
    (typeof define === 'function' && define.amd) ? define(['jquery'], function () { //requirejs 加载
      ready.run(window.jQuery);
      return layer;
    }) : function () { //普通 script 标签加载
      layer.ready();
      ready.run(window.jQuery);
    }()
  );

})(window);


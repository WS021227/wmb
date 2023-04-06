let ggroup_id = $('#group_id').val(),
    is_join_group = Number($('#is_join_group').val())
$(function () {
    // $.alert('sdf')

    // 初始化swiper
    initSwiper();

    $(window).on('scroll', scrollListen)
    //小组成员排序方式切换
    $('.member-sort').on('click', function () {
        let $this = $(this), sort = $this.data('value'), has = $this.data('has')
        if (!has) {
            $this.data('has', 1)
            unity_member_list(sort, 1)
        }
        $('.member-total .ct').html($('.member-total').data(sort=='1'?'rct':'total'))
    })
    $(document).on('click', '.image-upload', function () {
        let _index = $(this).data('index'), f = $('#file_topic_image')
        if (_index) {
            f.data('index', _index)
        } else {
            let imgs = $('.topic-pics .pic-item.hav').length
            if (imgs >= 8) return $.alert('' + unity_lang('default_4_images') + '')
        }
        f.click()
    })
    $(document).on('click', '.topic-image-delete', function () {
        $(this).parents('.pic-item').remove()
        let imgs = $('.topic-pics .pic-item.hav').length
        if (imgs <= 0) $('.topic-pics').addClass('hide')
    })
    $(document).on('change', '#file_topic_image', function () {
        let $this = $(this), findex = $this.data('index')
        let imgs = $('.topic-pics .pic-item.hav').length
        if (imgs >= 4) return $.alert('' + unity_lang('default_4_images') + '')
        let filePath = this.value, ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase(),
            allow_ext = ".jpg|.jpeg|.gif|.png|"//全部图片格式类型
        //限制图片类型
        if (allow_ext.indexOf(ext + "|") == -1) return $.alert('' + unity_lang('default_image_format') + '')
        // let isIE = /msie/i.test(navigator.userAgent) && !window.opera,
        //     file_size = 0
        // if (isIE && !this.fields) {
        //     let fs = new ActiveXObject('Scripting.FileSystemObject'),
        //         file = fs.GetFile(filePath)
        //     file_size = file.size;
        // } else {
        //     file_size = this.files[0].size;
        // }
        // // file_size=Math.round(file_size/1024*100)/100; //单位为KB
        // if (file_size > 3145728) return $.alert('' + unity_lang('default_3_m') + '')
        var data = new FormData($('#form_topic_image_upload')[0])
        $.gajax('/async/upload/topic/image', {
            type: 'post',
            data: data,
            dataType: 'json',
            processData: false,
            contentType: false,

            beforeSend: function () {
                // _this.submitStart();
            },

            success: function (result) {
                $this.val('');
                if (findex) {
                    $('.pic-item[data-index="' + findex + '"]').data('filename', result.file_name).find('img')
                        .attr('src', 'https://static.52wmb.com/bangline/upload/images/' + result.file_name + '')
                    return;
                }
                $('.topic-pics').append('<div class="pic-item topic-image  image-upload hav" data-filename="' + result.file_name + '" data-index="' + (imgs + 1) + '"><img src="https://static.52wmb.com/bangline/upload/images/' + result.file_name + '" alt="">' +
                    '<button class="btn image-upload-pop topic-image-delete">&#10005;</button></div>').removeClass('hide')
                // let $fimages = $('#topic_form [name="images"]')
                // $fimages.val($fimages.val() + ',' + result.file_name)
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // _this.submitFail(textStatus || errorThrown);
            },

            complete: function () {
                // _this.submitEnd();
            }
        });
    })


    $('.reply-text').on({
        input: function () {
            $(this).css({
                height: '90px'
            })
            let scrollHeight = this.scrollHeight + 2;
            $(this).css({
                height: scrollHeight + 'px'
            })
        }
    })
})

function initSwiper() {
  new Swiper('.shop-banner', {
    observer: true,
    observeParents: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
}


function scrollListen() {
  let top = $(this).scrollTop()
  let nav_h = ($('nav').height() || 65) - 1;
  let fixed_top = $('.group-content').offset().top
  let group_tab_fiexd = top > fixed_top - nav_h
  $('.group-tab').toggleClass('fixed', group_tab_fiexd)
  // 滚动到底部获加载跟多
  if(top >= $('body').height() - $(window).height()){
    more_member()
    more_topic()
  }
}

function more_member() {
    let $tab = $('.member-sort.active'), sort = $tab.data('value'), $member = $('#member_list_' + sort)
    if ($tab.data('next') == '0') return;
    if ($member.length <= 0) return;
    // 加载中则不再次加载
    if ($member.data('loading')) return;
    let page = $member.data('page')
    $member.data('loading', '1')
    // console.log(page, 'page')
    unity_member_list(sort, page)
}
function unity_member_list(sort, page) {
  page = Number(page || 1)
  let $member = $('#member_list_' + sort)
  $.gajax('/async/member', {
    data: {page: page, sort: sort, group_id: ggroup_id},
    datatype: 'text',
    success: function (result) {
      $member.append(result)
      let nt = $member.find('.not-next').length
      if (nt <= 0) $member.data('loading', '').data('page', page + 1)
    }, error: function (e) {
      $member.data('loading', '')
    }
  })
}



/**
 *
 * @returns {void|jQuery}
 */
function topic_images_pop() {
    let imgs = $('.topic-pics .pic-item.hav').length
    if (imgs >= 4) return $.alert('' + unity_lang('default_4_images') + '')
    layer.open({
        type: 1,
        skin: 'layui-layer-rim',
        area: ['900px', '530px'], // 配置长高
        shadeClose: false, //点击遮罩关闭
        maxmin: false,
        closeBtn: 1,
        title: '上传图片',
        id: 'avatar_crop',
        content: '<div class="avatar-body">\n' +
            '<form class="avatar-form" action="/async/upload/topic/image" enctype="multipart/form-data" method="post">\n' +
            '<div class="gp">\n' +
            '<input class="avatar-src" name="avatar_src" type="hidden">\n' +
            '<input class="avatar-data" name="crop_data" type="hidden">\n' +
            '<input class="avatar-input" id="avatarInput" name="avatar_file" type="file">\n' +
            '</div>\n' +
            '<div class="avatar-row gp">\n' +
            '<div class="left col">\n' +
            '<div class="avatar-wrapper">\n' +
            '<div class="wrapper-img"><img src="https://static.52wmb.com/images/userphoto/190_20220406090705.jpg"></div>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="right col">\n' +
            '<div class="avatar-preview preview-lg">\n' +
            '<img src="https://static.52wmb.com/images/userphoto/190_20220406090705.jpg">\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '<div class="gp" style="padding-top:5px;font-size:14px;color:#999;display: inline-block;">  (' + unity_lang('default_only_jpg') + ')</div>\n' +
            '<div class="avatar-btn-group gp">\n' +
            '<div><button type="submit" class="avatar-btn avatar-save">' + unity_lang('default_save_modified') + '</button></div>\n' +
            '</div>\n' +
            '</form>\n' +
            '</div>\n',
        success: function (layero, index, that) {
            new layCrop($('#crop_avatar'), {
                lay_index: index,
                avatarView: false,
                cropDone: function (url) {
                    let $img = imgs < 3 ? $('.topic-pics .pic-item:not(.hav):first') : $('<div class="pic-item hav"></div>').appendTo($('.topic-pics')),
                        $fimages = $('#topic_form [name="images"]')

                    $img.append('<img src="https://static.52wmb.com/bangline/upload/images/' + url + '" alt=""><button class="btn image-upload-pop">&#10005;</button>').addClass('hav')
                    $fimages.val($fimages.val() + ',' + url)
                }
            });
        }
    });
}

/**
 *
 */
function add_video() {
    let old_url = $('#topic_form [name="video"]').val()
    layer.open({
        type: 1,
        btn: ['&#x786E;&#x5B9A;'],
        skin: 'layui-layer-rim',
        area: ['500px', ''], // 配置长高
        shadeClose: false, //点击遮罩关闭
        maxmin: false,
        closeBtn: 1,
        title: '' + unity_lang('default_insert_video') + '',
        content: '<div class="video-body">' + unity_lang('default_video_address') + '：<input type="text" id="video_url" value="' + old_url + '" placeholder="' + unity_lang('default_enter_video_address') + '"></div>',
        yes: function (a) {
            let url = $('#video_url').val()
            if (!url) return $.alert('' + unity_lang('default_enter_video_address') + '')
            $('#topic_form [name="video"]').val(url)
            $('.video-show').val(url).parents('.video-src').removeClass('hide')
            layer.close(a)
        }
    });
}

function video_remove(elem) {
    $(elem).siblings('.video-show').val('').parents('.video-src').addClass('hide')
    $('#topic_form [name="video"]').val('')
}


/**
 *
 * @param elem
 * @returns {void|jQuery}
 */
function topic_add(elem) {
    to_login(function () {
        // console.log(is_join_group, 'is_join_group')
        if(!is_join_group) return $.alert('' + unity_lang('default_join_circle') + '')
        let $this = $(elem)
        let $from = $('#topic_form'), content = $from.find('[name="contents"]').val()
        if (!content) return $.alert('' + unity_lang('default_content_enter') + '')
        let imgs = ''
        $.each($('.topic-image'), function (){
            imgs += (',' + $(this).data('filename'))
        })
        $('#topic_form [name="images"]').val(imgs.slice(1))
        $this.html('' + unity_lang('default_being_released') + '').prop('disabled', true)
        let formdata = new FormData($from[0])

        $.gajax('/async/topic/add', {
            data: formdata,
            type: "POST",
            processData: false,
            contentType: false,
            success: function (result) {
                $this.html('' + unity_lang('default_publish') + '').prop('disabled', false)
                _lock = false;
                if (result.state == 0) {
                    $from.find('[name="contents"]').val('')
                    $from.find('[name="images"]').val('')
                    $from.find('[name="video"]').val('')
                    $('.topic-edit .topic-pics').html('').addClass('hide')
                    $('.topic-edit .video-src').addClass('hide').find('.video-show').val('')
                    $.alert('' + unity_lang('default_under_review') + '')
                    return false
                }
                if(result.state == 1001) return $.alert('' + unity_lang('default_join_circle') + '')
                if(result.state == 100){
                    let error = result.error||{}, keys = Object.keys(error)
                    if(keys.length > 0){
                        return $.alert(error[keys[0]])
                    }
                }
                $.alert(result.message)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $this.html('' + unity_lang('default_publish') + '').prop('disabled', false)
                $.alert('' + unity_lang('default_publish_failure') + '')
            }
        });
    })
}

function more_views_users(elem) {
  let $this = $(elem), page = Number($this.data('page')), topic_id = $this.data('tid')
  $this.html('' + unity_lang('default_loading') + '').removeAttr('onclick')
  $.gajax('/async/topic/views', {
    data: {page: page, topic_id: topic_id},
    datatype: 'text',
    success: function (result) {
      $('#views_list').append(result)
      let nt = $('#views_list').find('.not-next').length
      if (nt <= 0) $this.data('page', page + 1).html('' + unity_lang('default_loading_more') + '').attr('onclick', 'more_views_users(this)')
      else $this.remove()
    }, error: function (e) {
      $this.html('' + unity_lang('default_loading_failure') + '').attr('onclick', 'more_views_users(this)')
    }
  })
}
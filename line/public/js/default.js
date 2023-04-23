// head 全局搜索参数
let global_search_key = {
    start: 0,
    sort: 2,
    size: 10,
    is_home:1,
    is_gq:1,
    has_topic:0,
    keyword:"",
    country:""
}

// 外贸人 or 帖子搜索 
let search_input_flag='/members'//默认搜外贸人

$(function () {
    $("body").append($(`<span class="go_top" id="go_top"><svg t="1647013805377" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3787" width="30" height="30"><path d="M66.56 105.805a38.927 38.927 0 0 1 38.922-38.928h813.036c21.504 0 38.927 17.429 38.927 38.928a38.927 38.927 0 0 1-38.927 38.932H105.482a38.927 38.927 0 0 1-38.922-38.932z m445.527 109.767a38.938 38.938 0 0 1 38.933 38.933v663.69a38.932 38.932 0 0 1-77.86 0V254.5a38.932 38.932 0 0 1 38.927-38.928z" fill="#555" p-id="3788"></path><path d="M484.572 227.22a38.932 38.932 0 0 1 55.04 0L831.74 519.357a38.922 38.922 0 0 1 0 55.046 38.912 38.912 0 0 1-55.04 0L484.572 282.27a38.912 38.912 0 0 1 0-55.05z" fill="#555" p-id="3789"></path><path d="M539.612 227.22a38.932 38.932 0 0 1 0 55.056L247.475 574.403a38.902 38.902 0 0 1-55.045 0 38.912 38.912 0 0 1 0-55.046L484.572 227.22a38.932 38.932 0 0 1 55.04 0z" fill="#555" p-id="3790"></path></svg></span>`))

    // head
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
        $('.select-box').removeClass('select-active')
    })

    // 侦听滚动条滚动
    $(document).scroll(function () {
        console.log("000...000")
        var scroH = $(document).scrollTop(); //滚动高度
        var win_height=$(window).height()/2; 
        // 粘性定位 left_tab、right_box
        if(scroH>win_height){
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

// 关注
function Messages($this) {
    return false
}

// 关注
function Concern($this) {
    return false
    // let user_id = $($this).data("id")

    // console.log(user_id,"ididid")
    // $.gajax('/async/follow', {
    //     type: "POST",
    //     data: {user_id: user_id},
    //     success: function (result) {
    //         console.log(result,"关注")
    //     }
    // })
}

// 公共navbar 搜索按钮
function search_p_or_t(){
    let search_text=get_search_input()

    if(search_text){
        global_search_key.is_home=0
        global_search_key.keyword=search_text
        $("#search_btn").attr("href",`${search_input_flag}/${global_search_key.keyword}`)
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
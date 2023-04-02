$(function () {
  // swiper初始化
  var mySwiper = new Swiper('.swiper', {
    // 改可视区域可以显示的轮播框的个数
    loop: true,
    slidesPerView: 'auto',
    loopedSlides: 5,
  })
 
  // 搜索框
  $("#search").click(() => {
    // 全局的搜索弹窗
    search_toast()
  });

  // 轮播标题按钮切换
  // 热门
  $(".title-hot-right span").click(function (event) {
    $(this).addClass("active").siblings().removeClass("active");

    // 切换到指定tab
    $(".swiper-context").find("div:eq(" + $(this).index() + ")").attr("class", "corg  corg_active").siblings().attr("class", "corg  no_corg_active")
  });

  // 关注
  $(".title-look-right span").click(function (event) {
    $(this).addClass("active").siblings().removeClass("active");

    // 切换到指定tab
    $(".swiper-context1").find("div:eq(" + $(this).index() + ")").attr("class", "corg  corg_active").siblings().attr("class", "corg  no_corg_active")
  });

});
let header = document.querySelector("header");
window.addEventListener("scroll", e => {
    if(window.pageYOffset!=0){
        header.style = "box-shadow: 0 8px 6px -6px gray; ";
        $(`.bgC`).css('position', 'static');
    }
    else
        header.style = "";
})

$(document).ready(function(){
    $("#carousel1").owlCarousel({
        loop: true, // 循環播放
        margin: 30, // 外距 10px
        responsiveClass:true,
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 3, // 螢幕大小為 600~1000 顯示 3 個項目
            nav: true
          },
          
        }
      });

      $("#carousel2").owlCarousel({
        loop: true, // 循環播放
        margin: 30, // 外距 10px
        responsiveClass:true,
        responsive: {
          0: {
            items: 1,
            nav: true,
          },
        }
      });

    $(`.owl-nav`).css('display', 'flex');
});
$(document).ready(function() {

    if ($(window).width() > 768) $(`.navbar-toggler`).hide();
    else $(`.nav-menu`).hide();

    $(`.owl-prev`).hide();
    $(`.owl-next`).hide();
    // console.log($(window).height());
    // if (($(window).width() > 768 || $(window).width() < 400) && ($(window).height() > 560 && $(window).height() < 1400)) $(`.bg-light`).css("position", "relative");
    // if ($(window).width() == 540) $(`.bg-light`).css("position", "relative");
});

  
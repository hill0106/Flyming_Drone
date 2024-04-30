$(document).ready(function() {

    if ($(window).width() > 768) $(`.navbar-toggler`).hide();
    else $(`.nav-menu`).hide();

    $(`.owl-prev`).hide();
    $(`.owl-next`).hide();
    
    handleTypeTab();

});

function handleTypeTab() {
    $(`.type-tab li button`).on('click', () => {
        var Id = $(this).attr('id');
        console.log(Id);
    })
}
  
$(document).ready(function() {

    if ($(window).width() > 768) $(`.navbar-toggler`).hide();
    else $(`.nav-menu`).hide();

    $(`.owl-prev`).hide();
    $(`.owl-next`).hide();
    
    handleTypeTab();

});

function handleTypeTab() {
    $(`.projectC .topC1 .type-tab ul li button`).on("click", function() {
        var Id = $(this).attr('id').split("tab")[1];
        var tab_id = $(this).attr('id');
        if ($(`.projectC .topC1 .type-tab ul li button`).has("active")) {
            $(`.projectC .topC1 .type-tab ul li button`).removeClass('active');
        }
        $(`.projectC .topC1 .type-tab ul li .${tab_id}`).addClass('active');
        $.ajax({
            url: '/send-data', // Backend endpoint to handle the request
            method: 'POST', // HTTP method
            contentType: 'application/json', // Data type
            data: JSON.stringify({ data: Id }), // Data to send (converted to JSON)
            success: function(response) {
                let allProjectHTML = ``;
                response.map(element => {
                  const projectHTML = `<div class="row g-0 position-relative">
                  <div class="pj col-md-6 mb-md-0 p-md-4">
                    <img src=${element.img_link} class="w-100" alt="...">
                    <a href="${element.video_link}" target="_blank" class="stretched-link"><i class="fa-brands fa-youtube" style="color: red; margin-right: 5px; font-size: 50px;"></i></a>
                  </div>
                    <div class="col-md-6 p-4 ps-md-0">
                      <h5 class="mt-0" style="font-size: 1.5rem;">${element.video_title}</h5>
                      <p style="font-size: 1.2rem;"><i class="fa-regular fa-calendar"></i> ${element.video_time}</p>
                      <p style="font-size: 1.2rem;">${element.video_des}</p>
                      <span class="badge text-bg-secondary" style="font-size: 1.3rem;  margin-right: 5px;"><i class="fa-solid fa-eye"></i> 觀看次數 ${element.view_count }</span>
                      <span class="badge text-bg-primary" style="font-size: 1.3rem;"><i class="fa-solid fa-thumbs-up"></i> 按讚 ${element.like_count }</span>
                    </div>
                  </div>`;
                  allProjectHTML += projectHTML;
                });
                  
                
              $(`.project-temp`).html(allProjectHTML);
              allProjectHTML = ``;
            },
            error: function(xhr, status, error) {
              console.error('Error sending data:', error);
            }
          });
    })
}
  
$(document).ready(function(){
    $(".image_card").on("click", function(){
        $("#image_modal .modal-content img").attr("src", $(this).attr("src"))
        $("#image_modal").fadeIn()
    })

    $("#image_modal").on("click", function(e){
        if (!$(e.target).hasClass('modal-content')) {
            $(this).fadeOut()
        }
    });
})
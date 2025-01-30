$(document).ready(function(){
    $(".slider").on("click", function(){
        console.log($(this).hasClass("is_night_mode"))
        if($(this).hasClass("is_night_mode")){
            $(this).removeClass("is_night_mode")
            $(".container").removeClass("night-mode")
            $("body").removeClass("night-mode")
        }
        else{
            $(this).addClass("is_night_mode")
            $(".container").addClass("night-mode")
            $("body").addClass("night-mode")
        }
    })
})
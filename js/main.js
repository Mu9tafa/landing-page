

window.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // declaring variables
    var header = $(".header"),
        mySlider = $(".bxslider"),
        burger_menu = document.querySelector(".fa-bars");
    var sections = document.querySelectorAll("section");
    var ul = document.querySelector("#menu");

    // assign header height
    header.height($(window).height());
    
    // on resize function
    $(window).resize(function () {
        // resize the header height
        header.height($(window).height());  
        // add paddingTop to the ul (centering the ul) on resizing
        mySlider.each(function () {
            $(this).css('paddingTop', ($(window).height() - $('.bxslider li').height()) / 2);
        });
    });

    /* Building UI nav-bar dynamically
    **************************************************************************/
   let ui = "";
   (function buildUI() {
       sections.forEach(section => {
        ui += `<li><a class="nav-link" data-link="${section.id}">${section.id.charAt(0).toUpperCase() + section.id.slice(1)}</a></li>`;
       })
   })()
   ul.innerHTML += ui;



    /* Add paddingTop to the ul (centering the ul)
    **************************************************************************/
    mySlider.each(function () {
        $(this).css('paddingTop', ($(window).height() - $('.bxslider li').height()) / 2)
    })

    mySlider.bxSlider({
        pager: false
    });




    /* Scroll to element function using JQuery 
    **************************************************************************/
    // $('.nav-link').click(function() {
    //     $('html, body').animate({
    //         scrollTop: $(`#${$(this).data('link')}`).offset().top - 65
    //     }, 1000)        
    // });




    /* Sroll to  an element function using vanilla javascript 
    **************************************************************************/
    var links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
        link.onclick = function() {
            var sec = document.querySelector(`[id=${link.getAttribute("data-link")}]`);
            sec.scrollIntoView({
                behavior:"smooth",
                block:"center"
            });
        }
    });




    /* Intersection observer api 
    **************************************************************************/
   let options = {
        root:null,
        rootMargin: "0px",
        threshold: 0.79,
    }
    let observer = new IntersectionObserver(beTouching, options);
    sections.forEach(section => {
        observer.observe(section);
    });
    function beTouching(entries) {
        entries.forEach(entry => {
            var x = document.querySelector(`[data-link="${entry.target.id}"]`);
            if(entry.isIntersecting) {
                x.parentElement.classList.add("active");
            } else {
                x.parentElement.classList.remove("active");
            }
        });
    }
    



    /* Auto slider for testimonials
    **************************************************************************/
    (function autoSlider() {
        $(".slider .active").each(function() {
            if(!($(this).is(":last-child"))) {

                $(this).delay(1000).fadeOut(1000,  function() {
                    $(this).removeClass("active").next().fadeIn(1000).addClass("active")
                    autoSlider();
                });

            } else {
                $(this).delay(1000).fadeOut(1000,  function() {
                    $(this).removeClass("active");
                    $(".slider div").eq(0).fadeIn(1000).addClass("active");
                    autoSlider();
                });
            }
        });
    }());




    /* Triggering mixitup plugin
    **************************************************************************/
    $(".portfolio .row").mixItUp();




    // adding class selected to the li
    $(".portfolio li").click(function() {
        if($(this).is(":first-child")){
            $(".portfolio .row").css("justifyContent", "space-between");
        } else {
            $(".portfolio .row").css("justifyContent","space-around");
        }
        $(this).addClass("selected").siblings().removeClass("selected")
    });




    /* Triggering niceScroll plugin
    **************************************************************************/ 
    $("body").niceScroll({
        cursorcolor:"#1abc9c",
        cursorwidth:"12px",
        cursorborder:"none",
        cursorborderradius:5
    });  




    /* Adding fixed class to navbar when scrollY > 550
    **************************************************************************/
    $(window).scroll(function() {
        if(window.scrollY > 550) {
            $(".navBar").addClass("fixed");
            $(".upBtn").addClass("show");
        } else {
            $(".navBar").removeClass("fixed");
            $(".upBtn").removeClass("show");
        } 
    });




    /* Scroll to top button
    **************************************************************************/
    $(".upBtn").click(()=>{
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });

    


    /* Adding class show-nav to burger menu
    **************************************************************************/
    $(".fa-bars").click(()=>{
        $("nav").toggleClass("show-nav");
    })
    $(document).click((e)=>{
        if(e.target !== burger_menu ) {
            $("nav").removeClass("show-nav");
        }
    })

});
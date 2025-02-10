import './styles.scss';
import $ from './jquery';

let navMenu = $(".nav-list-contact");
let barBtn = $(".nav-bar");
let barLine1 = $(".bar1");
let barLine3 = $(".bar3");


$(document).ready(function (){
    $(document).click(function(e) {
        if(!$(e.target).closest(".nav-list-contact").length && $(navMenu)[0].style.top == '0px') {
                $(barLine1).toggleClass("change");
                $(barLine3).toggleClass("change");
                $(navMenu).animate({top:'-330px'}, 1000)
            }
    });
    $("a").click(function (a){
        if (a.target.hash) {
            $('html, body').animate({
                scrollTop: $(a.target.hash).offset().top
            }, 2000);
            $(barLine1).toggleClass("change");
                $(barLine3).toggleClass("change");
            $(navMenu).animate({top:'-330px'}, 1000)
        }
    });
    $(barBtn).click(function (){
        $(barLine1).toggleClass("change");
        $(barLine3).toggleClass("change");
        if($(navMenu)[0].style.top != '0px') {
            $(navMenu).animate({top:'0px'}, 1000)
        } else {
             $(navMenu).animate({top:'-330px'}, 1000)
        }  
    }); 
        $(window).on('scroll', function () {
            $('.intro_count').each(function () {
                if (isVisible($(this))) {
                    startCounter($(this));
                    $(this).removeClass('intro_count');
                }
            });
        });
});  
function isVisible(element) {
    let win = $(window);
    let viewportTop = win.scrollTop();
    let viewportBottom = viewportTop + win.height();
    let elementTop = element.offset().top;
    let elementBottom = elementTop + element.height();
        
    return elementBottom > viewportTop && elementTop < viewportBottom;
}
    
function startCounter(element) {
    element.prop('Counter', 0).animate({
        Counter: element.text()
    }, {
        duration: 3000,
        easing: 'swing',
        step: function (now) {
            element.text(Math.ceil(now));
        }
    });
}

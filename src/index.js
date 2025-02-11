import "./styles.scss";
import $ from "./jquery";

let navMenu = $(".nav-list-contact");
let barBtn = $(".nav-bar");
let barLine1 = $(".bar1");
let barLine3 = $(".bar3");
let arrow = $(".bounce");

$(document).ready(function () {
  if (window.innerWidth <= 768) {
    let video = $("#myVideo");
    if (video) {
        video.remove();
    }
  }
  $(window).on("scroll", function () {
    let scrollHeight = 700; // Wysokość, po której strzałka się pojawi
    if ($(window).scrollTop() > scrollHeight) {
      $(arrow).fadeIn(1); // Pokazuje strzałkę z animacją
    } else {
      $(arrow).fadeOut(1); // Ukrywa strzałkę z animacją
    }
  });
  $(arrow).click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1000); // Przewinięcie do góry w 1 sekundę
  });
  
  

  $(document).click(function (e) {
    if (
      !$(e.target).closest(".nav-list-contact").length &&
      $(navMenu)[0].style.top == "0px"
    ) {
      $(barLine1).toggleClass("change");
      $(barLine3).toggleClass("change");
      $(navMenu).animate({ top: "-330px" }, 1000);
    }
  });
  $("a").click(function (a) {
    if (a.target.hash) {
      $("html, body").animate(
        {
          scrollTop: $(a.target.hash).offset().top,
        },
        2000
      );
      $(barLine1).toggleClass("change");
      $(barLine3).toggleClass("change");
      $(navMenu).animate({ top: "-330px" }, 1000);
    }
  });
  $(barBtn).click(function () {
    $(barLine1).toggleClass("change");
    $(barLine3).toggleClass("change");
    if ($(navMenu)[0].style.top != "0px") {
      $(navMenu).animate({ top: "0px" }, 1000);
    } else {
      $(navMenu).animate({ top: "-330px" }, 1000);
    }
  });
  checkVisibility();
  $(window).on("scroll", checkVisibility);
});

function checkVisibility() {
  $(".intro_count").each(function () {
    if (isVisible($(this))) {
      startCounter($(this));
      $(this).removeClass("intro_count");
    }
  });
}
function isVisible(element) {
  let win = $(window);
  let viewportTop = win.scrollTop();
  let viewportBottom = viewportTop + win.height();
  let elementTop = element.offset().top;
  let elementBottom = elementTop + element.height();

  return elementBottom > viewportTop && elementTop < viewportBottom;
}

function startCounter(element) {
  element.prop("Counter", 0).animate(
    {
      Counter: element.text(),
    },
    {
      duration: 3000,
      easing: "swing",
      step: function (now) {
        element.text(Math.ceil(now));
      },
    }
  );
}

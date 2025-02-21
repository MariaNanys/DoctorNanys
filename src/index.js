import "./styles.scss";
import faqImplants from "./faq_implants";
import faqProsthetics from "./faq_prothetics";
import faqSurgery from "./faq_surgery";
import "slick-carousel";
import "slick-lightbox";

let navMenu = $(".nav-list-contact");
let barBtn = $(".nav-bar");
let barLine1 = $(".bar1");
let barLine3 = $(".bar3");
let arrow = $(".bounce");
let faqImplantList = $(".main__offer_dental_implantology_faq");
let faqSurgeryList = $(".main__offer_surgery_faq");
let faqProstheticsList = $(".main__offer_prosthetics_faq");

function loopIt(item, source) {
  for (var i = 0; i < item.length; i++) {
    $(source).append(
      `<li class="faq-item"><div id=${item[i].id} class="main__offer_question"><strong>${item[i].question}</strong><img class="arrow_down" src="./images/arrow_down.webp"/></div><p class='hide'>${item[i].desc}</p></li>`
    );
  }
}
loopIt(faqImplants, faqImplantList);
loopIt(faqSurgery, faqSurgeryList);
loopIt(faqProsthetics, faqProstheticsList);

$(document).ready(function () {
  $(document).on("click", "a[target='_blank']", function (e) {
    e.preventDefault();
    window.open($(this).attr("href"), "_blank");
  });
  jQuery.event.special.touchstart = {
    setup: function (_, ns, handle) {
      this.addEventListener("touchstart", handle, {
        passive: !ns.includes("noPreventDefault"),
      });
    },
  };
  jQuery.event.special.touchmove = {
    setup: function (_, ns, handle) {
      this.addEventListener("touchmove", handle, {
        passive: !ns.includes("noPreventDefault"),
      });
    },
  };
  jQuery.event.special.wheel = {
    setup: function (_, ns, handle) {
      this.addEventListener("wheel", handle, { passive: true });
    },
  };
  jQuery.event.special.mousewheel = {
    setup: function (_, ns, handle) {
      this.addEventListener("mousewheel", handle, { passive: true });
    },
  };
  $(".diplomas").slick({
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    mobileFirst: true,
    pauseOnHover: true,
    variableWidth: true,
    initialSlide: 6,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 280,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "20px",
          slidesToShow: 1,
          autoplay: true,
          speed: 1000,
        },
      },
    ],
  });

  $(".diplomas").slickLightbox({
    src: "src",
    itemSelector: "div > img",
  });
  if (window.innerWidth <= 768) {
    let video = $("#myVideo");
    if (video) {
      video.remove();
    }
  }
  $(window).on("scroll", function () {
    let scrollHeight = 500; // Wysokość, po której strzałka się pojawi
    if ($(window).scrollTop() > scrollHeight) {
      $(arrow).fadeIn(1); // Pokazuje strzałkę z animacją
    } else {
      $(arrow).fadeOut(1); // Ukrywa strzałkę z animacją
    }
  });
  $(arrow).click(function (e) {
    e.preventDefault();
    window.history.pushState("", "", "/");
    $("html, body").animate({ scrollTop: 0 }, 1000); // Przewinięcie do góry w 1 sekundę
  });

  $(".main__offer_question").click(function () {
    $(this).find(".arrow_down").toggleClass("rotated"); // Obrót strzałki
    $(this).closest("li").find("p").toggleClass("show");
  });

  $(".btn_read_more").click(function (e) {
    e.preventDefault();
    $(this).closest("li").find("article").slideToggle(1500);

    let clickedLi = $(this).closest("li");
    let faqItem = clickedLi.find(".main__offer_faq");
    let list = $(".list");

    if (clickedLi.hasClass("active")) {
      // Jeśli już aktywny – wróć do normalnego stanu
      clickedLi.removeClass("active");
    } else {
      // Resetuje inne elementy
      list.find("li").removeClass("active");

      // Rozszerza kliknięty element
      clickedLi.addClass("active");
    }

    if ($(this).text() === "Czytaj więcej...") {
      $(this).text("Zwiń");
    } else {
      $(this).text("Czytaj więcej...");
      $("html, body").animate({ scrollTop: clickedLi.offset().top - 39 }, 1000);
      if (faqItem.find("p").hasClass("show")) {
        faqItem.find("p").removeClass("show");

        if (faqItem.find(".arrow_down").hasClass("rotated")) {
          faqItem.find(".arrow_down").removeClass("rotated");
        }
      }
    }
  });

  $(document).click(function (e) {
    e.preventDefault();
    if (
      !$(e.target).closest(".nav-list-contact").length &&
      $(navMenu)[0].style.top == "-1px"
    ) {
      $(barLine1).toggleClass("change");
      $(barLine3).toggleClass("change");
      $(navMenu).animate({ top: "-330px" }, 1000);
    }
  });
  $("a").click(function (a) {
    console.log(a);
    a.preventDefault();
    if (a.target.hash) {
      $("html, body").animate(
        {
          scrollTop: $(a.target.hash).offset().top,
        },
        2000
      );

      if (window.innerWidth <= 600) {
        $(barLine1).toggleClass("change");
        $(barLine3).toggleClass("change");
        $(navMenu).animate({ top: "-330px" }, 1000);
      }
    }
    
  });
  $(barBtn).click(function (e) {
    e.preventDefault();
    $(barLine1).toggleClass("change");
    $(barLine3).toggleClass("change");
    if ($(navMenu)[0].style.top != "-1px") {
      $(navMenu).animate({ top: "-1px" }, 1000);
    } else {
      $(barLine1).toggleClass("change");
      $(barLine3).toggleClass("change");
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

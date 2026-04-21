/** @format */

jQuery(document).ready(function ($) {
  $(document).ready(function () {
    $(".c-sec-menutab__nav-link").on("click", function (e) {
      e.preventDefault();

      const selectedTab = $(this).data("tab");

      $(".c-sec-menutab__nav-link").removeClass("active");

      $(this).addClass("active");

      $(".c-sec-menutab__content-item, .finance-menutab__menutab-item")
        .removeClass("active")
        .hide();

      $(
        `.c-sec-menutab__content-item[data-tab="${selectedTab}"], .finance-menutab__menutab-item[data-tab="${selectedTab}"]`
      )
        .addClass("active")
        .fadeIn(200);
    });

    $(".c-sec-offices__menutab-item").on("click", function () {
      const location = $(this).data("location");

      $(".c-sec-offices__menutab-item").removeClass("active");
      $(this).addClass("active");

      $(".c-sec-offices__tabcontent-item").removeClass("active").hide();

      $(`.c-sec-offices__tabcontent-item[data-location="${location}"]`)
        .addClass("active")
        .fadeIn(200);

      $(".c-sec-offices__map-item").removeClass("active");
      $(`.c-sec-offices__map-item[data-location="${location}"]`).addClass("active").fadeIn(200);
    });

    const swiper = new Swiper(".c-sec-meet-the-team__members", {
      slidesPerView: 2,
      spaceBetween: 32,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true,
      },

      pagination: {
        el: ".swiper-pagination-count",
        type: "fraction",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },

        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    });

    $(".leare-more-bar__select").on("change", function () {
      const selectedValue = $(this).val();
      if (selectedValue) {
        window.location.href = selectedValue;
      }
    });

    const swiper2 = new Swiper(".c-testimonials__swiper", {
      slidesPerView: 3,
      spaceBetween: 32,
      loop: true,
      navigation: {
        nextEl: ".nav-slider-testimonials .swiper-button-next",
        prevEl: ".nav-slider-testimonials .swiper-button-prev",
      },
      pagination: false,
      breakpoints: {
        0: {
          slidesPerView: 1,
          autoHeight: true,
        },
        768: {
          slidesPerView: 2,
        },
        1025: {
          slidesPerView: 3,
        },
      },
    });

    const $showMoreLink = $('.c-sec-profile-banner__more-link[data-action="show-more"]');
    const $showLessLink = $('.c-sec-profile-banner__more-link[data-action="show-less"]');
    const $openingDesc = $(".c-sec-profile-banner__desc:not(.c-component-mb)");
    const $openingDescMobile = $(".c-sec-profile-banner__desc.c-component-mb");

    function handleParagraphDisplay($container) {
      const $paragraphs = $container.find("p");

      if ($paragraphs.length > 3) {
        $paragraphs.slice(3).hide();
        $showMoreLink.show();
        $showLessLink.hide();
      } else {
        $paragraphs.show();
        $showMoreLink.hide();
        $showLessLink.hide();
      }
    }

    $showMoreLink.on("click", function (e) {
      e.preventDefault();
      const isDesktop = $(window).width() > 767;
      const $targetDesc = isDesktop ? $openingDesc : $openingDescMobile;

      $targetDesc.find("p").show();
      $showMoreLink.hide();
      $showLessLink.show();
    });

    $showLessLink.on("click", function (e) {
      e.preventDefault();
      const isDesktop = $(window).width() > 767;
      const $targetDesc = isDesktop ? $openingDesc : $openingDescMobile;

      $targetDesc.find("p").each(function (index) {
        $(this).toggle(index < 3);
      });

      $showMoreLink.show();
      $showLessLink.hide();
    });

    function initParagraphToggles() {
      handleParagraphDisplay($openingDesc);
      handleParagraphDisplay($openingDescMobile);
    }

    $(window).on("load", function () {
      initParagraphToggles();
    });

    $(window).on("resize", function () {
      initParagraphToggles();
    });
  });
});

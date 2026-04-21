jQuery(document).ready(function ($) {
    const swiper = new Swiper(".list-slider-tn", {
        slidesPerView: 4,
        spaceBetween: 32,
        loop: false,
        freeMode: false,
        navigation: {
            nextEl: ".list-slider-tn .swiper-button-next",
            prevEl: ".list-slider-tn .swiper-button-prev",
        },
        scrollbar: {
            el: ".list-slider-tn .swiper-scrollbar",
            hide: false,
            draggable: true
        },
        pagination: {
            el: ".list-slider-tn .swiper-pagination-count",
            type: "fraction",
        },
        breakpoints: {
            1024: {
                slidesPerView: 4,
                spaceBetween: 32
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 32
            },
            400: {
                slidesPerView: 1.5,
                spaceBetween: 32
            },
            0: {
                slidesPerView: 1.24,
                spaceBetween: 32
            }
        }
    });
    function handleAccordionDisplay() {
        var $items = $('.faq-two-column .item-accordion');
        var maxVisible = 7;

        if ($(window).width() <= 768) {
            if ($items.length > maxVisible) {
                $items.hide(); 
                $items.slice(0, maxVisible).show();
                $('#show-faq-tn').show();
            } else {
                $items.show();
                $('#show-faq-tn').hide();
            }

            $('#show-faq-tn').off('click').on('click', function (e) {
                e.preventDefault();
                $items.slideDown();
                $(this).hide();
            });

        } else {
            $items.show(); 
            $('#show-faq-tn').hide(); 
        }
    }

    handleAccordionDisplay();

    $(window).on('resize', function () {
        handleAccordionDisplay();
    });
});

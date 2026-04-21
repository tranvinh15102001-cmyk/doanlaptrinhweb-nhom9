jQuery(document).ready(function ($) {
  $(document).ready(function () {
    const swiper = new Swiper(".slider-reviews", {
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
          slidesPerView: 1.135,
          spaceBetween: 16,
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

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
        (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function runCounter() {
      $(".number-counter").each(function () {
        var $this = $(this);
        if (isElementInViewport($this[0]) && !$this.hasClass("counted")) {
          $this.addClass("counted");
          var countTo = $this.text().replace(/[^0-9]/g, "");
          var suffix = $this.text().replace(/[0-9]/g, "");

          $({ countNum: 0 }).animate(
            {
              countNum: countTo,
            },
            {
              duration: 2000,
              easing: "swing",
              step: function () {
                $this.text(Math.floor(this.countNum) + suffix);
              },
              complete: function () {
                $this.text(countTo + suffix);
              },
            }
          );
        }
      });
    }

    $(window).on("scroll", runCounter);
    runCounter();

    // FAQ
    $(".accordion-content").hide();
    $(".accordion-header").on("click", function () {
      var $item = $(this).closest(".item-accordion");
      $item.find(".accordion-content").slideToggle(300);
      $item.find(".icon-accordion").toggleClass("active");

      $(".item-accordion").not($item).find(".accordion-content").slideUp(300);
      $(".item-accordion")
        .not($item)
        .find(".icon-accordion")
        .removeClass("active");
    });

    // Partner Slider mobile
    new Swiper(".list-partners-mb", {
      slidesPerView: "auto",
      spaceBetween: 14.61,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: false,
    });
  });

  $(document).ready(function () {
    $(".main-media-strip").each(function () {
      const $container = $(this);
      const $video = $container.find("video").get(0);
      const $thumbnail = $container.find(".thumbnail-video-strip");
      const $playIcon = $container.find(".icon-play-strip");
      const isMobile = $container.hasClass("display-mb");
      const $activeThumbnail = isMobile
        ? $container.find(".thumbnail-video-strip.display-mb")
        : $container.find(".thumbnail-video-strip.display-pc");

      function playVideo() {
        $thumbnail.hide();
        $playIcon.hide();
        $($video).addClass("playing").css("display", "block");
        $video.play();
      }

      function pauseVideo() {
        $video.pause();
        $($video).removeClass("playing").css("display", "none");
        $activeThumbnail.show();
        $playIcon.show();
      }

      $container.on(
        "click",
        ".icon-play-strip, .thumbnail-video-strip, video",
        function () {
          if ($video.paused) {
            playVideo();
          } else {
            pauseVideo();
          }
        }
      );

      // $video.onended = function () {
      //   pauseVideo();
      // };
    });
  });

  // dtjs
  $(document).ready(function () {
    $("form").on("submit", function (e) {
      e.preventDefault();
    });

    $(".number-input button").on("click", function (e) {
      e.preventDefault();
      var $input = $(this).siblings("input");
      var min = parseInt($input.attr("min")) || 0;
      var max = parseInt($input.attr("max")) || 120;
      var step = parseInt($input.attr("data-step")) || 1;
      var currentValue = parseInt($input.val()) || 0;
      var isIncrease = $(this).hasClass("increase");

      var newValue = isIncrease ? currentValue + step : currentValue - step;

      newValue = Math.max(min, Math.min(max, newValue));
      $input.val(newValue);
    });

    $(".number-input input").on("input", function () {
      var $input = $(this);
      var min = parseInt($input.attr("min")) || 0;
      var max = parseInt($input.attr("max")) || 120;
      var value = parseInt($input.val()) || 0;

      if (value < min) $input.val(min);
      else if (value > max) $input.val(max);
    });
  });

  $(document).ready(function () {
    const $range1 = $("#range1");
    const $rate1 = $("#rate1");

    $range1.on("input", function () {
      const value = $(this).val();
      const percentage = (value / 140) * 100;

      $(this).css(
        "background",
        `linear-gradient(to right, #EE1338 0%, #EE1338 ${percentage}%, rgba(38, 38, 38, 0.1) ${percentage}%, rgba(38, 38, 38, 0.1) 100%)`
      );

      $rate1.text(value + "%");
    });
  });

  $(document).ready(function () {
    $(".accordion-header").on("click", function () {
      var $content = $(this).next(".accordion-content_total");
      var $header = $(this);
      $(".accordion-content_total")
        .not($content)
        .slideUp(300, function () {
          $(this).prev(".accordion-header").removeClass("active");
        });
      $content.slideToggle(300, function () {
        $header.toggleClass("active", $content.is(":visible"));
      });
    });

    $(".accordion-item:first .accordion-content_total").slideDown(
      300,
      function () {
        $(this).prev(".accordion-header").addClass("active");
      }
    );

    $(".form-submit").on("click", function (e) {
      if (e.target.tagName.toLowerCase() !== "input") {
        $(this).find('input[type="submit"]').trigger("click");
      }
    });
  });

  $(document).ready(function () {
    function setupDropdownMock() {
      if ($(window).width() <= 767) {
        var $inner = $(".inner-filter");
        var $filterList = $inner.find(".filter-list");

        if (!$filterList.find(".from-label").length) {
          var labelText = $inner.find("p").text().trim();
          $filterList.prepend(
            '<li class="filter-item from-label" disabled>' + labelText + "</li>"
          );
        }
        if ($inner.find(".dropdown-label").length === 0) {
          var labelText = $inner.find("p").text().trim();
          var $label = $('<div class="dropdown-label">' + labelText + "</div>");
          $inner.append($label);
        }

        $inner.addClass("dropdown-mode");
      } else {
        $(".dropdown-label").remove();
        $(".inner-filter .from-label").remove();
        $(".inner-filter").removeClass("dropdown-mode open");
      }
    }

    $(document).on("click", ".dropdown-label", function () {
      $(this).parent(".inner-filter").toggleClass("open");
    });

    $(document).on(
      "click",
      ".dropdown-mode .filter-list li:not(.from-label)",
      function () {
        $(".filter-list li").removeClass("active");
        $(this).addClass("active");

        var text = $(this).text().trim();
        $(this).closest(".inner-filter").find(".dropdown-label").text(text);
        $(this).closest(".inner-filter").removeClass("open");
      }
    );
    setupDropdownMock();
    $(window).on("resize", function () {
      setupDropdownMock();
    });
  });

  $(document).ready(function () {
    $(".number-weekly").addClass("active");
    $(".text-estimates-calculator p").text("per week");

    $(".item-loaninfo .tab").on("click", function () {
      $(".tab").removeClass("active");
      $(this).addClass("active");
      var tabValue = $(this).data("value");
      $(".number-estimates-calculator p").removeClass("active");
      if (tabValue === "weekly") {
        $(".number-weekly").addClass("active");
        $(".text-estimates-calculator p").text("per week");
      } else if (tabValue === "monthly") {
        $(".number-monthly").addClass("active");
        $(".text-estimates-calculator p").text("per month");
      }
    });
  });
});










function formatCurrency(value) {
  return '$' + parseFloat(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function parseCurrency(value) {
  return parseFloat(value.replace(/[$,]/g, '')) || 0;
}

function parsePercentage(value) {
  return parseFloat(value.replace('%', '')) || 0;
}

function calculateLoanRepayment(principal, annualRate, years) {
  let monthlyRate = annualRate / 100 / 12;
  let n = years * 12;
  return principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -n));
}

function calculate() {
 
  const loanAmount = parseCurrency(document.getElementById('loan-amount-input').value);
  const interestRate = parsePercentage(document.getElementById('interest-rate-input').value);
  const loanTerm = parseFloat(document.getElementById('loan-term-input').value);
  const balloonInput = document.getElementById('balloon-percentage');
  const balloonPercentage = balloonInput ? parseFloat(balloonInput.value) || 0 : 0;
  let frequency;

  const selectEl = document.getElementById('repayment-frequency');
  if (selectEl) {
    frequency = selectEl.value;
  } else {
    const radioEl = document.querySelector('input[name="frequency"]:checked');
    frequency = radioEl ? radioEl.id : 'weekly';
  }

  const valueEl = document.querySelector('.repayment-value');
  const labelEl = document.querySelector('.repayment-label');
  const interestPaidOutput = document.getElementById('interest-paid');
  const totalPaidOutput = document.getElementById('total-paid');

  const totalMonths = loanTerm * 12;
  const monthlyRate = interestRate / 100 / 12;

  // Discount factor approach with balloon payment
  let discountFactor = 0;
  for (let i = 1; i <= totalMonths; i++) {
    discountFactor += 1 / Math.pow(1 + monthlyRate, i);
  }

  const balloonFactor = Math.pow(1 + monthlyRate, totalMonths);
  const adjustedLoanAmount = loanAmount * (1 - (balloonPercentage / 100) / balloonFactor);
  const monthlyRepayment = adjustedLoanAmount / discountFactor;

  let repayment;
  let label;

  switch (frequency) {
    case 'weekly':
      repayment = (monthlyRepayment * 12) / 52;
      label = 'per week';
      break;
    case 'fortnightly':
      repayment = (monthlyRepayment * 12) / 26;
      label = 'per fortnight';
      break;
    case 'daily':
      repayment = (monthlyRepayment * 12) / 365;
      label = 'per day';
      break;
    default:
      repayment = monthlyRepayment;
      label = 'per month';
  }
  console.log(valueEl)
  console.log(labelEl)
  if (valueEl && labelEl) {
    valueEl.textContent = formatCurrency(repayment.toFixed(2));
    labelEl.textContent = label;
  }

  const totalPaid = monthlyRepayment * totalMonths;
  const interestPaid = totalPaid - loanAmount;
  if(interestPaidOutput && totalPaidOutput){
  interestPaidOutput.textContent = `Interest Paid: ${formatCurrency(interestPaid)}`;
  totalPaidOutput.textContent = `Total Paid: ${formatCurrency(totalPaid)}`;
  }

}

function attachListeners() {

  const inputs = document.querySelectorAll(
    '#loan-amount-input, #interest-rate-input, #loan-term-input, #balloon-percentage, input[name="frequency"], #repayment-frequency'
  );

  inputs.forEach(input => {
    input.addEventListener('input', calculate);
    input.addEventListener('change', calculate);
  });

  document.getElementById('loan-amount-input')?.addEventListener('blur', function () {
    const parsed = parseCurrency(this.value);
    this.value = formatCurrency(parsed);
    calculate();
  });

  document.getElementById('interest-rate-input')?.addEventListener('blur', function () {
    this.value = parsePercentage(this.value).toFixed(2) + '%';
  });
}

// window.addEventListener('DOMContentLoaded', () => {
//   attachListeners();
//   calculate();
// });

jQuery(document).ready(function ($) {
  $(document).ready(function () {
    $("#menu-toggle").on("click", function () {
      $(".header-menu__mobile").addClass("active");
      $("body").addClass("no-scroll");
    });
    $(".link-close-menu").on("click", function () {
      $(".header-menu__mobile").removeClass("active");
      $("body").removeClass("no-scroll");
      $(".sub-menu-mobile").removeClass("active");
      $(".mega-menu-mobile").removeClass("active");
    });
    $(".mobile-menu-body li.menu-item-has-children > a").on(
      "click",
      function (e) {
        e.preventDefault();

        var $parent = $(this).parent();

        var $subMenu = $parent.children("ul.sub-menu-mobile");
        if ($subMenu.length) {
          $subMenu.addClass("active");
          return;
        }

        var $megaMenu = $parent.children(".mega-menu-mobile");
        if ($megaMenu.length) {
          $megaMenu.addClass("active");
        }
      }
    );

    $(document).on("click", ".back-mega-menu-mobile a", function (e) {
      e.preventDefault();
      $(".mega-menu-mobile").removeClass("active");
    });
  });
});

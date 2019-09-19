$(function() {
  // Filter by tags

  let filter = $("[data-filter]");

  filter.on("click", function(event) {
    event.preventDefault();

    let cat = $(this).data("filter");

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function() {
        let itemCat = $(this).data("cat");

        if (itemCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  // Modals

  let modalOpen = $("[data-modal]");
  let modalClose = $("[data-close]");

  modalOpen.on("click", function(event) {
    event.preventDefault();
    let modalId = $(this).data("modal");
    $(modalId).addClass("show");
    $("body").addClass("no-scroll");

    // Animation
    setTimeout(function() {
      $(modalId)
        .find(".modal__dialog")
        .css({
          transform: "rotateX(0)"
        });
    }, 100);

    // Т.к. по умолчанию слайдер скрыт, вызывается эвент setPosition, чтобы не было проблем
    $(".worksSlider").slick("setPosition");
  });

  modalClose.on("click", function(event) {
    let modalParent = $(this).parents(".modal");
    event.preventDefault();

    // Animation
    modalParent.find(".modal__dialog").css({
      transform: "rotateX(90deg)"
    });

    setTimeout(function() {
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 100);
  });

  // Close modal by clicking on the empty space
  $(".modal").on("click", function() {
    let $this = $(this); // Фигня какая-то. Глупая конструкция, но не могу понять, как без неё в данном случае

    $this.find(".modal__dialog").css({
      transform: "rotateX(90deg)"
    });

    setTimeout(function() {
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 100);
  });

  // stopPropagation - отмена события при клике по родителю окна
  // (чтобы окно не скрывалось при клике на него)
  $(".modal__dialog").on("click", function(event) {
    event.stopPropagation();
  });

  // Slider (https://kenwheeler.github.io/slick/)
  $(".worksSlider").slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  });

  $(".slickNext").on("click", function(event) {
    event.preventDefault();
    $("#worksSlider").slick("slickNext");
  });

  $(".slickPrev").on("click", function(event) {
    event.preventDefault();
    $("#worksSlider").slick("slickPrev");
  });
});

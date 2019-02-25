$('.responsive').slick({
  dots: false,
  prevArrow: false,
  nextArrow: false,
  infinite: false,
  speed: 400,
  slidesToShow: 3,
  infinite: true,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

var stHeight = $('.slick-track').height();
$('.slick-slide').css('height',stHeight + 'px' );

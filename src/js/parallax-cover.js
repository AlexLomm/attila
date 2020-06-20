// TODO: remove jquery dependency
export const initParallaxCover = () => {
  const $html = $('html');
  const $window = $(window);
  const $cover = $('.cover');

  let coverPosition = 0;

  const parallax = () => {
    if ($cover.length >= 1) {
      const windowPosition = $window.scrollTop();

      windowPosition > 0
        ? (coverPosition = Math.floor(windowPosition * 0.25))
        : (coverPosition = 0);

      $cover.css({
        '-webkit-transform': `translate3d(0, ${coverPosition}px, 0)`,
        transform: `translate3d(0, ${coverPosition}px, 0)`,
      });

      $window.scrollTop() < $cover.height()
        ? $html.addClass('cover-active')
        : $html.removeClass('cover-active');
    }
  };

  parallax();

  $window.on({
    scroll: parallax,
    resize: parallax,
    orientationchange: parallax,
  });
};

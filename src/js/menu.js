// TODO: remove jquery dependency
export const initMenu = () => {
  const $html = $('html');
  const $viewport = $(window);

  const menu = () => {
    $html.toggleClass('menu-active');
  };

  $('#menu').on({ click: menu });
  $('.nav-menu').on({ click: menu });
  $('.nav-close').on({ click: menu });

  $viewport.on({
    resize: () => {
      $html.removeClass('menu-active');
    },
    orientationchange: () => {
      $html.removeClass('menu-active');
    },
  });
};

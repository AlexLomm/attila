import '../sass/style.scss';
import './libs/jquery.history.min';

import { initMenu } from './menu';
import { initParallaxCover } from './parallax-cover';
import { gallery } from './gallery';

initMenu();
initParallaxCover();
gallery();

window.addLineNumbersToCode = () =>
  $('pre code').each(function (index, element) {
    $(this).addClass('line-numbers');
  });

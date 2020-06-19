import fitvids from 'fitvids';

$(document).ready(function () {
  const $window = $(window);
  const $post = $('.post-content');

  // Responsive videos with fitvids
  fitvids();

  // Format code blocks and add line numbers
  window.addLineNumbersToCode();

  // Reading progress bar on window top
  const readingProgress = () => {
    const postBottom = $post.offset().top + $post.height();
    const viewportHeight = $window.height();

    const progress =
      100 -
      ((postBottom - ($window.scrollTop() + viewportHeight) + viewportHeight / 3) /
        (postBottom - viewportHeight + viewportHeight / 3)) *
        100;

    $('.progress-bar').css('width', `${progress}%`);

    const $progressContainer = $('.progress-container');

    progress > 100
      ? $progressContainer.addClass('complete')
      : $progressContainer.removeClass('complete');
  };

  readingProgress();

  // Trigger reading progress
  $window.on({
    scroll: readingProgress,
    resize: readingProgress,
    orientationchange: readingProgress,
  });

  // Check if disqus is defined by code injection
  if (disqus) {
    $('#show-disqus').on('click', function () {
      $.ajax({
        type: 'GET',
        url: `//${disqus}.disqus.com/embed.js`,
        dataType: 'script',
        cache: true,
      });

      $(this).parent().addClass('activated');
    });
  } else {
    // hide comment section
    $('.post-comments').css({ display: 'none' });
  }
});

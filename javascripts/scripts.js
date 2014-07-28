function menuHighlight() {
  $('.nav-bar').hover(function() {
    $(this).addClass('hover');
  }, function() {
    $(this).removeClass('hover');
  });
}

function menuToggle(clickedItem) {
  var current = $('.current');
  current.removeClass('current')
  $(clickedItem).addClass('current');
}




$(function() {
  menuHighlight();
  menuToggle();
})
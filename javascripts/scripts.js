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

function makeVisible(div) {
  var visible = $('.visible');
  visible.removeClass('visible animated fadeInLeft').hide();
  div.addClass('visible animated fadeInLeft').show();
}

function menuClick() {

  $('.menu-home').click(function(e) {
    menuToggle(e.target);
    var home = $('.home');
    makeVisible(home);
  })

  $('.menu-work').click(function(e) {
    menuToggle(e.target);
    var work = $('.work');
    makeVisible(work);
  })

  $('.menu-resume').click(function(e) {
    menuToggle(e.target);
    var resume = $('.resume');
    makeVisible(resume);
  })

  $('.menu-about').click(function(e) {
    menuToggle(e.target);
    var about = $('.about');
    makeVisible(about);
  })
}


function appInitialize() {
  $('.section').hide();
  var home = $('.home');
  home.addClass('visible');
  makeVisible(home);

  menuHighlight();
  menuClick();

}

$(function() {
  appInitialize();
})
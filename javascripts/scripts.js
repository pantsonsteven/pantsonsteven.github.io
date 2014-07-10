

$(function() {
   var body = $('body, html');
   $('.home').click(function() {
      var top = $('.fifth').offset().top;
      body.animate({scrollTop: top}, 750, 'linear');
   })

   $('.about').click(function() {
      $(window).scrollTop($('.second').offset().top);
   })

   $('.work').click(function() {
      $(window).scrollTop($('.third').offset().top);
   })

   $('.resume').click(function() {
      $(window).scrollTop($('.fourth').offset().top);
   })   

   $('.contact').click(function() {
      $(window).scrollTop($('.fifth').offset().top);
   })
})
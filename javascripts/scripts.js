

$(function() {
   // var body = $('body, html');
   $('#').click(function() {
      console.log('yay')
      $(window).scrollTop($('.fifth').offset().top);
   })

   $('#about').click(function() {
      $(window).scrollTop($('.second').offset().top);
   })

   $('#work').click(function() {
      $(window).scrollTop($('.third').offset().top);
   })

   $('#resume').click(function() {
      $(window).scrollTop($('.fourth').offset().top);
   })   

   $('#contact').click(function() {
      $(window).scrollTop($('.fifth').offset().top);
   })
})


var Portfolio = {
   Models      : {},
   Collections : {},
   Views       : {},
   Router      : null,
   initialize  : function() {
      this.ViewManager  = new Portfolio.Views.ViewManager({el: $('.container')})
      this.router       = new Portfolio.Router();
      Backbone.history.start();
   }
}


// <!-- ROUTER -->
Portfolio.Router = Backbone.Router.extend({
   routes: {
   ''             : 'index',
   'peddlr'       : 'peddlr',
   'valence'      : 'valence',
   'publivations' : 'publications',
   'about'        : 'about'
   },
   index: function() {
      // body...      
   },
   peddlr: function() {
      // body...      
   },
   valence: function() {
      // body...      
   },
   publications: function() {
      // body...      
   },
   about: function() {
      // body...      
   }
});


// <!-- VIEW MANAGER -->
Portfolio.Views.ViewManager = Backbone.View.extend({
   display : function(view) {
      var previousView = this.currentView || null;
      var nextView = view;
      if (previousView){
         previousView.remove();
      };
      nextView.render().$el.hide().appendTo(this.$el).fadeIn();
      this.currentView = nextView;
   }

});


// <!-- MODEL -->
Portfolio.Models.Page = Backbone.Model.extend({
   defaults: {
      section  : "",
      imageUrl : "",
      content  : "",
      span1    : "",
      span2    : "",
      videoMp4 : "",
      videoOgg : ""
   }
});


// <!-- COLLECTION -->
Portfolio.Collections.PageCollection = Backbone.Collection.extend({
   model : Portfolio.Models.Page
});


// <!-- VIEW -->
Portfolio.Views.PageView = Backbone.View.extend({
   template : _.template($('page-template').html()),
   render   : function() {
      var html = (this.template(this.model.attributes));
      this.$el.html(html);
      $('container').append(this.$el);
      return this;
   }
})


// <!-- APP -->

var introPage = {
   section  : "",
   imageUrl : "",
   content  : "",
   span1    : "",
   span2    : "",
   videoMp4 : "",
   videoOgg : ""
}

// <!-- ON LOAD -->
$(function() {
   Portfolio.initialize();
})
// <!-- INITIALIZE -->

var Portfolio = {
   Models      : {},
   Collections : {},
   Views       : {},
   Router      : null
}

var pages = [
   {
      page     : "index",
      heading  : "index",
      imageUrl : "",
      content  : "ask me about my knitting",
      span1    : "",
      span2    : "",
      videoMp4 : "",
      videoOgg : ""
   },
   {
      page     : "peddlr",
      heading  : "peddlr",
      imageUrl : "",
      content  : "peddlr is an app that helps you plan your Citi Bike trips",
      span1    : "",
      span2    : "",
      videoMp4 : "",
      videoOgg : ""
   },
   {
      page     : "valence",
      heading  : "valence",
      imageUrl : "",
      content  : "Valence lets you visualize and shape your playlists",
      span1    : "",
      span2    : "",
      videoMp4 : "",
      videoOgg : ""
   },
   {
      page     : "publications",
      heading  : "publications",
      imageUrl : "",
      content  : "Once upon a time I was an academic, here's some of my work",
      span1    : "",
      span2    : "",
      videoMp4 : "",
      videoOgg : ""
   },
   {
      page     : "about",
      heading  : "about",
      imageUrl : "",
      content  : "I like to knit. Thanks for asking. I went to school for a long time and came out a doctor. But I like making things more than I like thinking quietly in isolation about things so I became a web developer.",
      span1    : "",
      span2    : "",
      videoMp4 : "",
      videoOgg : ""
   }
]

Portfolio.initialize = function() {
   this.viewManager   = new Portfolio.Views.ViewManager({el: $('.container')})
   this.collection    = new Portfolio.Collections.PageCollection(pages);
   this.router        = new Portfolio.Router();
   Backbone.history.start();
};

// <!-- ROUTER -->
Portfolio.Router = Backbone.Router.extend({
   initialize : function() {
      this.collection = Portfolio.collection;
   },
   routes: {
   ''             : 'index',
   'peddlr'       : 'peddlr',
   'valence'      : 'valence',
   'publications' : 'publications',
   'about'        : 'about'
   },
   index: function() {
      var page             = this.collection.where({page: 'index'})[0];
      var indexView        = new Portfolio.Views.PageView({ model : page });
      Portfolio.viewManager.display(indexView);
   },
   peddlr: function() {
      var page             = this.collection.where({page: 'peddlr'})[0];
      var peddlrView       = new Portfolio.Views.PageView({ model : page });
      Portfolio.viewManager.display(peddlrView);   
   },
   valence: function() {
      var page             = this.collection.where({page: 'valence'})[0];
      var valenceView      = new Portfolio.Views.PageView({ model : page });
      Portfolio.viewManager.display(valenceView);   
   },
   publications: function() {
      var page             = this.collection.where({page: 'publications'})[0];
      var publicationsView = new Portfolio.Views.PageView({ model : page });
      Portfolio.viewManager.display(publicationsView);   
   },
   about: function() {
      var page             = this.collection.where({page: 'about'})[0];
      var aboutView        = new Portfolio.Views.PageView({ model : page });
      Portfolio.viewManager.display(aboutView);   
   }
});


// <!-- MODEL -->
Portfolio.Models.Page = Backbone.Model.extend({
   defaults: {
      page     : "",
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


// <!-- VIEW MANAGER -->
Portfolio.Views.ViewManager = Backbone.View.extend({
   display : function(view) {
      var previousView = this.currentView || null;
      var nextView     = view;
      if (previousView){
         previousView.remove();
      };
      nextView.render().$el.hide().appendTo(this.$el).fadeIn();
      this.currentView = nextView;
   }

});


// <!-- VIEW -->
Portfolio.Views.PageView = Backbone.View.extend({
   template : _.template($('.page-template').html()),
   render   : function() {
      var html = (this.template(this.model.attributes));
      this.$el.html(html);
      $('container').append(this.$el);
      return this;
   }
})


// <!-- APP -->





// <!-- ON LOAD -->
$(function() {
   Portfolio.initialize();
})
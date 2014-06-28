// <!-- INITIALIZE -->

var Portfolio = {
   Models      : {},
   Collections : {},
   Views       : {},
   Router      : null
}

var pages = [
   {
      page        : "index",
      heading     : "index",
      imageUrl    : "",
      content1    : "ask me about my knitting",
      content2    : "",
      span1       : "",
      span2       : "",
      videoMp4    : "",
      videoOgg    : "",
      videoWidth  : "",
      videoHeight : ""
   },
   {
      page        : "peddlr",
      heading     : "peddlr",
      imageUrl    : "./images/peddlr.jpg",
      content1    : "peddlr is an app that helps you plan your Citi Bike trips",
      content2    : "",
      span1       : "",
      span2       : "",
      videoMp4    : "",
      videoOgg    : "",
      videoWidth  : "",
      videoHeight : ""
   },
   {
      page        : "valence",
      heading     : "valence",
      imageUrl    : "./images/valence01.jpg",
      content1    : "Valence lets you visualize and shape your playlists",
      content2    : "",
      span1       : "",
      span2       : "",
      videoMp4    : "",
      videoOgg    : "",
      videoWidth  : "",
      videoHeight : ""
   },
   {
      page        : "publications",
      heading     : "publications",
      imageUrl    : "",
      content1    : "Once upon a time I was an academic, here's some of my work",
      content2    : "",
      span1       : "",
      span2       : "",
      videoMp4    : "",
      videoOgg    : "",
      videoWidth  : "",
      videoHeight : ""
   },
   {
      page        : "about",
      heading     : "about",
      imageUrl    : "",
      content1    : "I like to knit. Thanks for asking. I went to school for a long time and came out a doctor*. But I like making things more than I like thinking quietly in isolation about things so I became a web developer.",
      content2    : "*Of media...",
      span1       : "",
      span2       : "",
      videoMp4    : "",
      videoOgg    : "",
      videoWidth  : "",
      videoHeight : ""
   }
]

Portfolio.initialize = function() {
   this.viewManager   = new Portfolio.Views.ViewManager({el: $('.page-wrapper')})
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
   'home'         : 'index',
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
      heading  : "",
      imageUrl : null,
      content1  : "",
      content2 : "",
      span1    : "",
      span2    : "",
      videoMp4 : "",
      videoOgg : "",
      videoWidth: null,
      videoHeight: null
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

      nextView.render({ page: true }).$el.appendTo(this.$el);

      if (previousView){

         nextView.transitionIn(function() {
            previousView.remove();
         });
         this.currentView = nextView;

      } else {

         nextView.transitionIn();
         this.currentView = nextView; 

      };


   }
});




// <!-- VIEW -->
Portfolio.Views.PageView = Backbone.View.extend({
   
   template : _.template($('.page-template').html()),

   render   : function(options) {

      options = options || {};

      var html = (this.template(this.model.attributes));
      this.$el.html(html);
      this.$el.addClass(this.model.attributes.page+' section')

      if (options.page === true){
         this.$el.addClass('page');
      }

      $('.page-wrapper').append(this.$el);
      return this;
   },

   transitionIn: function(callback) {
      var that = this;
      var animateIn = function() {
         that.$el.addClass('is-visible');
         that.$el.one('transitionend', function () {
            console.log("all loaded!")
            if (_.isFunction(callback)) {
               callback();
               console.log('it worked')
            }
         });
      };

      _.delay(animateIn, 20);

   },

})


// <!-- ON LOAD -->
$(function() {
   Portfolio.initialize();
})
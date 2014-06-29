
// <!-- INITIALIZE -->

var Portfolio = {
   Models      : {},
   Collections : {},
   Views       : {},
   Router      : null
}

var pages = [
{
   position    : 1,
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
   position    : 2,
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
   position    : 3,   
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
   position    : 4,
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
   position    : 5,
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

// ---------------------------------------------------------------------------
// <!-- ROUTER -->
Portfolio.Router = Backbone.Router.extend({
   initialize : function() {
      this.collection = Portfolio.collection;
   },
   routes: {
      ''             : 'index',
      'home'         : 'home',
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
   home: function() {
      var page             = this.collection.where({page: 'index'})[0];
      var homeView        = new Portfolio.Views.PageView({ model : page });
      Portfolio.viewManager.display(homeView);
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


// ---------------------------------------------------------------------------
// <!-- MODEL -->
Portfolio.Models.Page = Backbone.Model.extend({
   defaults: {
      position    : null,
      page        : "",
      heading     : "",
      imageUrl    : null,
      content1    : "",
      content2    : "",
      span1       : "",
      span2       : "",
      videoMp4    : null,
      videoOgg    : null,
      videoWidth  : null,
      videoHeight : null
   }
});


// ---------------------------------------------------------------------------
// <!-- COLLECTION -->
Portfolio.Collections.PageCollection = Backbone.Collection.extend({
   model : Portfolio.Models.Page
});


// ---------------------------------------------------------------------------
// <!-- VIEW MANAGER -->
Portfolio.Views.ViewManager = Backbone.View.extend({
   display : function(view) {
      var previousView = this.currentView || null;
      var nextView     = view;

      if (previousView){ 
         nextView.render({bottom: true})
            .$el
            .appendTo(this.$el);
         nextView.transitionIn(function() {
            previousView.remove();
         });
      } else { // for initial page load or reload
         nextView.render({centered: true}) 
            .$el
            .hide()
            .appendTo(this.$el)
            .fadeIn(); 
      };

      var position = nextView.model.get('position');
      nextView.renderAboveAndBelowPage(position);

      this.currentView = nextView;
   }
});


// ---------------------------------------------------------------------------
// <!-- VIEW -->
Portfolio.Views.PageView = Backbone.View.extend({
   template : _.template($('.page-template').html()),
   render   : function(options) {
      var html = (this.template(this.model.attributes));
      this.$el.html(html);
      this.$el.addClass(this.model.attributes.page+' page')

      options = options || null;

      if (options.bottom === true){
         this.$el.addClass('bottom');
      } else if (options.top === true){
         this.$el.addClass('top');
      } else if (options.centered === true){
         this.$el.addClass('centered');
      }

      $('.page-wrapper').append(this.$el);
      return this;
   },
   transitionIn: function(callback) {
      var that = this;
      var animateIn = function() {
         that.$el.addClass('is-visible');
         that.$el.one('transitionend', function () {
            callback(); 
         });
      };
      _.delay(animateIn, 20);
   },
   renderAboveAndBelowPage: function(position) {
      var pages = Portfolio.collection;

      if (position > 1){
         var above = getPageAbove(pages, position);
         var below = getPageBelow(pages, position);
      };
   },

});


function getAbovePage (collection, position) {
   var above = collection.find(function(page) {
         return page.get('page') === parseInt(position-1);
      });
   return above;
}

function getBelowPage (collection, position) {
   var below = collection.find(function(page) {
      return page.get('page') === parseInt(position+1);
   });
   return below;
}


// ---------------------------------------------------------------------------
// <!-- ON LOAD -->
$(function() {
   Portfolio.initialize();
});
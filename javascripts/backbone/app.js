

var Portfolio = {
   Models      : {},
   Collections : {},
   Views       : {},
   Router      : null,
   initialize  : function() {
      this.ViewManager  = new Portfolio.Views.ViewManager
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

});


// <!-- MODEL -->
Portfolio.Models.Page = Backbone.Model.extend({

});


// <!-- COLLECTION -->
Portfolio.Collections.PageCollection = Backbone.Collection.extend({

});


// <!-- VIEW -->
Portfolio.Views.PageView = Backbone.View.extend({

})


// <!-- APP -->



// <!-- ON LOAD -->
$(function() {
   Portfolio.initialize();
})
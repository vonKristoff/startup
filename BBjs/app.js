define(['backbone','performer','router'], function (Backbone,Performer,Router) {

	var App = {};

	App.AppView = Backbone.View.extend({
		el:'#content',
		initialize:function(){

			Global.Vent.on('start',this.start,this);
			App.router = new Router();
			Backbone.history.start();	
		},
		start:function(){

			var self = this; // !mportant

			// this.performers = new Performer.Collection();
			// this.performers.fetch().done(function(result){
				
			// 	self.scheduleCollectionView = new Performer.Views.Collection({ collection: self.performers })
				
			// 	self.render()
			// }) 
		},
		render:function(){
			this.$el.append( this.scheduleCollectionView.render().el );	
		}
	})

	return App
})
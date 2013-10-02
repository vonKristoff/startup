define(['backbone'],function (Backbone){
	
	var Router = Backbone.Router.extend({

		routes:{
			'':'index'
		},
		index:function(){
			console.log('Router:: App Started');
			Global.Vent.trigger('start');		// you can also pass an {object:true}
		}

	})
	return Router

})
define(['backbone'],function (Backbone){

	var Performer = { Views: {} };

	Performer.Model = Backbone.Model.extend({
		defaults:{
			duration:5
		}
	});
	Performer.Collection = Backbone.Collection.extend({
		model: Performer.Model,
		url:'custom.json',
		comparator:function(model){
			return model.get('ordinal')
		}
	})

	Performer.Views.Single = Backbone.View.extend({
		tagName:'li',
		initialize:function(){
			
			this.order = this.model.get('ordinal');
			this.$el.attr( 'data-id', this.order);

		},
		render:function(){
			this.$el.append(this.model.get('name'));
			return this;
		}
	})

	Performer.Views.Collection = Backbone.View.extend({
		tagName:'ul',
		initialize:function(){
			this.order = [];								// order array
			this.collection.on('add',this.addOne,this)

			Global.Vent.on('dragndrop',this.sort,this);

			this.$el.sortable({
				stop:function(e,obj){
					
					Global.Vent.trigger('dragndrop',{
						newpos: obj.item.index(),			// new index position in li
						from:   obj.item.attr('data-id')	// original data-id to track who is where
					});
					
				}
			})
		},

		sort: function(obj) {
			// this.collection.remove(model);
        	var to = obj.newpos,
        		from = obj.from,
        		part1 = this.order.splice(0,from),
        		part2 = this.order.splice(1,this.order.length-1),
        		remains = [];

        	remains = part1.concat(part2);

        	var plucked = remains.splice(0,to),
        		rearranged = [].concat.apply([],[plucked,this.order,remains])

        	this.order = rearranged;

        	this.update();
    	},
		update:function(){
	
			this.collection.each(function(model,i){
				
				id = this.order[i];
				var index = this.order.indexOf(i)

				console.log(i,id,index);
				model.set('ordinal',index);

			},this)
	
		},
		addOne:function(model){
			this.order.push(model.toJSON().ordinal)
			this.$el.append( new Performer.Views.Single({ model:model }).render().el );	
		},
		render:function(){
			
			this.collection.each(function(model){
				
				this.addOne(model)

			},this);	
			return this;
		}
	})

	return Performer;
});
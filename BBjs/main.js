require.config({
    baseUrl: 'js',
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone:'../bower_components/backbone/backbone',
        underscore:'../bower_components/underscore/underscore',
        Handlebars:'../bower_components/handlebars/handlebars',
        storage:'../bower_components/backbone.localStorage/backbone.localStorage',
        text:'../bower_components/requirejs-text/text' 
    },
    shim: {
        backbone:{
            deps:['underscore','jquery'],
            exports:'Backbone'
        },
        Handlebars: {
            exports: 'Handlebars'
        },
        sortable:{
            deps:['jquery']
        },
        ui:{
            deps:['jquery']
        }
    }
});

require(['app'], function (App) {

    window.Global = {
        Vent:_.extend({},Backbone.Events)
    };

    var ApplicationName = new App.AppView();
    
})  
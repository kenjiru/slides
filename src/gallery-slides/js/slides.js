Y.on('domready', function(){
    new Y.slides.App();
});

Y.namespace('slides').App = Y.Base.create('app', Y.Base, [], {
    navigation : null,

    initializer : function() {
        this.navigation = new Y.slides.Navigation({
            app : this
        });

        // Navigation sets all the CSS classes, and Layout needs to know about some classes
        this.layout = new Y.slides.Layout({
            app : this
        });
        this.overview = new Y.slides.Overview({
            app : this
        });

        new Y.slides.NavigationControls({
            app : this
        }).render();
        new Y.slides.ProgressBar({
            app : this
        }).render();
    }
});
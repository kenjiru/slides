Y.on('domready', function(){
    new Y.slides.Layout();
    Y.navigation = new Y.slides.Navigation();

    new Y.slides.NavigationControls().render();
});
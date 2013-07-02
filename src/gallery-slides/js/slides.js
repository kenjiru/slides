Y.on('domready', function(){
    Y.navigation = new Y.slides.Navigation();
    // Navigation sets all the CSS classes, and Layout needs to know about some classes
    new Y.slides.Layout();
    new Y.slides.NavigationControls().render();
    new Y.slides.ProgressBar().render();
});
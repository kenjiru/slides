Y.on('domready', function(){
    new Layout();
    Y.navigation = new Navigation();

    new NavigationControls().render();
});
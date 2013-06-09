Y.namespace('slides').NavigationControls = Y.Base.create('navigationControls', Y.Widget, [ Y.WidgetParent ], {
    CONTENT_TEMPLATE : null,
    _nextButton : null,
    _previousButton : null,

    initializer : function() {
        var previous = new NavigationButton({
            name : 'previous',
            clickCallback : Y.bind(Y.navigation.showPrevious, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasPrevious, Y.navigation)
        });

        var next = new NavigationButton({
            name : 'next',
            clickCallback : Y.bind(Y.navigation.showNext, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasNext, Y.navigation)
        });

        this.add(previous);
        this.add(next);

        this._nextButton = next;
        this._previousButton = previous;
    }
});
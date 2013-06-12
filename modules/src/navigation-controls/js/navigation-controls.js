Y.namespace('slides').NavigationControls = Y.Base.create('navigationControls', Y.Widget, [ Y.WidgetParent ], {
    CONTENT_TEMPLATE : null,
    _nextButton : null,
    _previousButton : null,

    initializer : function() {
        var previous = new NavigationButton({
            name : 'previous',
            clickCallback : Y.bind(Y.navigation.showPreviousHoriz, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasPreviousHoriz, Y.navigation)
        });

        var next = new NavigationButton({
            name : 'next',
            clickCallback : Y.bind(Y.navigation.showNextHoriz, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasNextHoriz, Y.navigation)
        });

        this.add(previous);
        this.add(next);

        this._nextButton = next;
        this._previousButton = previous;
    }
});
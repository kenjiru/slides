Y.namespace('slides').NavigationControls = Y.Base.create('navigationControls', Y.Widget, [ Y.WidgetParent ], {
    CONTENT_TEMPLATE : null,
    _moveRightButton : null,
    _moveLeftButton : null,

    initializer : function() {
        this._moveRightButton = new NavigationButton({
            name : 'right',
            clickCallback : Y.bind(Y.navigation.showRight, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasRight, Y.navigation)
        });

        this._moveLeftButton = new NavigationButton({
            name : 'left',
            clickCallback : Y.bind(Y.navigation.showLeft, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasLeft, Y.navigation)
        });

        this.add(this._moveRightButton);
        this.add(this._moveLeftButton);
    }
});
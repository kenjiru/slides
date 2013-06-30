Y.namespace('slides').NavigationControls = Y.Base.create('navigationControls', Y.Widget, [ Y.WidgetParent ], {
    CONTENT_TEMPLATE : null,
    _moveRightButton : null,
    _moveLeftButton : null,
    _moveUpButton : null,
    _moveDownButton : null,

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

        this._moveUpButton = new NavigationButton({
            name : 'up',
            clickCallback : Y.bind(Y.navigation.showUp, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasUp, Y.navigation)
        });

        this._moveDownButton = new NavigationButton({
            name : 'down',
            clickCallback : Y.bind(Y.navigation.showDown, Y.navigation),
            checkCallback : Y.bind(Y.navigation.hasDown, Y.navigation)
        });

        this.add(this._moveRightButton);
        this.add(this._moveLeftButton);
        this.add(this._moveUpButton);
        this.add(this._moveDownButton);
    }
});
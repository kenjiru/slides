Y.namespace('slides').NavigationControls = Y.Base.create('navigationControls', Y.Widget, [ Y.WidgetParent ], {
    CONTENT_TEMPLATE : null,

    _app : null,
    _moveRightButton : null,
    _moveLeftButton : null,
    _moveUpButton : null,
    _moveDownButton : null,

    initializer : function(config) {
        this._app = config.app;

        this._moveRightButton = new NavigationButton({
            app : this._app,
            name : 'right',
            clickCallback : this._app.navigation.showRight,
            checkCallback : this._app.navigation.hasRight
        });

        this._moveLeftButton = new NavigationButton({
            app : this._app,
            name : 'left',
            clickCallback : this._app.navigation.showLeft,
            checkCallback : this._app.navigation.hasLeft
        });

        this._moveUpButton = new NavigationButton({
            app : this._app,
            name : 'up',
            clickCallback : this._app.navigation.showUp,
            checkCallback : this._app.navigation.hasUp
        });

        this._moveDownButton = new NavigationButton({
            app : this._app,
            name : 'down',
            clickCallback : this._app.navigation.showDown,
            checkCallback : this._app.navigation.hasDown
        });

        this.add(this._moveRightButton);
        this.add(this._moveLeftButton);
        this.add(this._moveUpButton);
        this.add(this._moveDownButton);
    }
});
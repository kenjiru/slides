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
            clickCallback : Y.bind(this._app.navigation.showRight, this._app.navigation),
            checkCallback : Y.bind(this._app.navigation.hasRight, this._app.navigation)
        });

        this._moveLeftButton = new NavigationButton({
            app : this._app,
            name : 'left',
            clickCallback : Y.bind(this._app.navigation.showLeft, this._app.navigation),
            checkCallback : Y.bind(this._app.navigation.hasLeft, this._app.navigation)
        });

        this._moveUpButton = new NavigationButton({
            app : this._app,
            name : 'up',
            clickCallback : Y.bind(this._app.navigation.showUp, this._app.navigation),
            checkCallback : Y.bind(this._app.navigation.hasUp, this._app.navigation)
        });

        this._moveDownButton = new NavigationButton({
            app : this._app,
            name : 'down',
            clickCallback : Y.bind(this._app.navigation.showDown, this._app.navigation),
            checkCallback : Y.bind(this._app.navigation.hasDown, this._app.navigation)
        });

        this.add(this._moveRightButton);
        this.add(this._moveLeftButton);
        this.add(this._moveUpButton);
        this.add(this._moveDownButton);
    }
});
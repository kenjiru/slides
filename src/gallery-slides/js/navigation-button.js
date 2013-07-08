var NavigationButton = Y.Base.create('navigationButton', Y.Widget, [ Y.WidgetChild ], {
    CONTENT_TEMPLATE : null,

    _app : null,
    _className : null,
    _clickCallback : null,
    _checkCallback : null,

    initializer : function(config) {
        this._app = config.app;
        this._className = this.getClassName(config.name);

        this._clickCallback = Y.bind(config.clickCallback, this._app.navigation);
        this._checkCallback = Y.bind(config.checkCallback, this._app.navigation);

        this._checkEnabled();
    },

    bindUI : function() {
        var contentBox = this.get('contentBox');

        contentBox.on('click', this._handleClick, this);
        this._app.on('navigation:changed', this._checkEnabled, this);
    },

    _handleClick : function() {
        if (this.get('disabled') == false) {
            this._clickCallback();
        }
    },

    _checkEnabled : function() {
        if (this._checkCallback()) {
            this.enable();
        } else {
            this.disable();
        }
    },

    renderUI : function() {
        var contentBox = this.get('contentBox');

        contentBox.addClass(this._className);
    }
}, {
    ATTRS : {
        name : null
    }
});
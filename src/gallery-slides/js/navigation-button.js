var NavigationButton = Y.Base.create('navigationButton', Y.Widget, [ Y.WidgetChild ], {
    CONTENT_TEMPLATE : null,

    _app : null,
    _className : null,

    initializer : function(config) {
        this._app = config.app;
        this._className = this.getClassName(config.name);

        this._checkEnabled();
    },

    bindUI : function() {
        var contentBox = this.get('contentBox');

        contentBox.on('click', this._handleClick, this);
        this._app.on('navigation:changed', this._checkEnabled, this);
    },

    _handleClick : function() {
        var clickCallback;

        if (this.get('disabled') == false) {
            clickCallback = this.get('clickCallback');

            clickCallback();
        }
    },

    _checkEnabled : function() {
        var checkCallback = this.get('checkCallback');

        if (checkCallback()) {
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
        name : null,
        clickCallback : null,
        checkCallback : null
    }
});
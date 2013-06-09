var NavigationControls = Y.Base.create('navigationControls', Y.Widget, [ Y.WidgetParent ], {
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

var NavigationButton = Y.Base.create('navigationButton', Y.Widget, [ Y.WidgetChild ], {
    CONTENT_TEMPLATE : null,
    _className : null,

    initializer : function(config) {
        this._className = this.getClassName(config.name);

        this._checkEnabled();
    },

    bindUI : function() {
        var contentBox = this.get('contentBox');

        contentBox.on('click', this._handleClick, this);
        Y.navigation.on('navigation:changed', this._checkEnabled, this);
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
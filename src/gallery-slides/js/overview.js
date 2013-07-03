Y.namespace('slides').Overview = Y.Base.create('overview', Y.Base, [], {
    _overviewEnabled : false,

    initializer : function() {
        console.log('overview initialized!');

        Y.one(document).on('keydown', Y.bind(this._handleKeyPress, this));
    },

    _handleKeyPress : function(ev) {
        if (ev.keyCode == 27) {
            this._toggleOverview();
        }
    },

    _toggleOverview : function() {
        if (this._overviewEnabled) {
            this._disableOverview();
        } else {
            this._enableOverview();
        }
    },

    _disableOverview : function() {
        console.log('overview disabled!');

        this._overviewEnabled = false;
    },

    _enableOverview : function() {
        console.log('overview enabled!');

        this._overviewEnabled = true;
    }
});
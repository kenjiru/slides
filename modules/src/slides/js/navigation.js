var Navigation = Y.Base.create('navigation', Y.Base, [], {
    _sections : null,
    _currentIndex : 0,

    initializer : function() {
        // IE<9 need to listen to key event on the document
        Y.one(document).on('keydown', Y.bind(this.handleKeyPress, this));
        Y.on('domready', Y.bind(this.handleDomReady, this));
    },

    handleDomReady : function() {
        this._sections = Y.all('section');

        this._sections.addClass('future');

        this._getCurrentSection().removeClass('future');
        this._getCurrentSection().addClass('present');
    },

    handleKeyPress : function(ev) {
        if (ev.keyCode == 37) {
            this._showPreviousSlide();
        } else if (ev.keyCode == 39) {
            this._showNextSlide();
        }
    },

    _showPreviousSlide : function() {
        if (this._currentIndex > 0) {
            this._getCurrentSection().removeClass('present');
            this._getCurrentSection().addClass('future');

            this._getPreviousSection().removeClass('past');
            this._getPreviousSection().addClass('present');

            this._currentIndex -= 1;
        }
    },

    _showNextSlide : function() {
        if (this._currentIndex < this._sections.size() - 1) {
            this._getCurrentSection().removeClass('present');
            this._getCurrentSection().addClass('past');

            this._getNextSection().removeClass('future');
            this._getNextSection().addClass('present');

            this._currentIndex += 1;
        }
    },

    _getCurrentSection : function() {
        return this._sections.item(this._currentIndex);
    },

    _getPreviousSection : function() {
        return this._sections.item(this._currentIndex - 1);
    },

    _getNextSection : function() {
        return this._sections.item(this._currentIndex + 1);
    }
});

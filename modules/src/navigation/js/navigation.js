Y.namespace('slides').Navigation = Y.Base.create('navigation', Y.Base, [], {
    _sections : null,
    _currentIndex : 0,

    initializer : function() {
        // IE<9 need to listen to key event on the document
        Y.one(document).on('keydown', Y.bind(this._handleKeyPress, this));

        this.publish('changed');

        this._initializeSections();
    },

    _initializeSections : function() {
        this._findTopLevelSections();
        this._markPresentSection();
        this._markStackSections();
    },

    _findTopLevelSections : function() {
        this._sections = Y.all('.slides>section');
        this._sections.addClass('future');
    },

    _markPresentSection : function() {
        this._getCurrent().removeClass('future');
        this._getCurrent().addClass('present');
    },

    _markStackSections : function() {
        this._sections.each(function(section){
            if (section.all('section').size() > 0) {
                section.addClass('stack');
            }
        });
    },

    _handleKeyPress : function(ev) {
        if (ev.keyCode == 37) {
            this.showPrevious();
        } else if (ev.keyCode == 39) {
            this.showNext();
        }
    },

    showPrevious : function() {
        if (!this.hasPrevious())
            return;

        this._getCurrent().removeClass('present');
        this._getCurrent().addClass('future');

        this._getPrevious().removeClass('past');
        this._getPrevious().addClass('present');

        this._currentIndex -= 1;

        this.fire('changed');
    },

    showNext : function() {
        if (!this.hasNext())
            return;

        this._getCurrent().removeClass('present');
        this._getCurrent().addClass('past');

        this._getNext().removeClass('future');
        this._getNext().addClass('present');

        this._currentIndex += 1;

        this.fire('changed');
    },

    _getCurrent : function() {
        return this._sections.item(this._currentIndex);
    },

    _getPrevious : function() {
        return this._sections.item(this._currentIndex - 1);
    },

    _getNext : function() {
        return this._sections.item(this._currentIndex + 1);
    },

    hasNext : function() {
        return this._currentIndex < this._sections.size() - 1;
    },

    hasPrevious : function() {
        return this._currentIndex > 0;
    }
});

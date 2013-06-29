Y.namespace('slides').Navigation = Y.Base.create('navigation', Y.Base, [], {
    _sections : null,
    _horizIndex : 0,
    _vertIndex : 0,

    initializer : function() {
        // IE<9 needs to listen to key event on the document
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
        this._getCurrentHoriz().removeClass('future');
        this._getCurrentHoriz().addClass('present');
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
            this.showLeft();
        } else if (ev.keyCode == 39) {
            this.showRight();
        }
    },

    showLeft : function() {
        if (!this.hasLeft())
            return;

        this._getCurrentHoriz().removeClass('present');
        this._getCurrentHoriz().addClass('future');

        this._getLeft().removeClass('past');
        this._getLeft().addClass('present');

        this._horizIndex -= 1;

        this.fire('changed');
    },

    showRight : function() {
        if (!this.hasRight())
            return;

        this._getCurrentHoriz().removeClass('present');
        this._getCurrentHoriz().addClass('past');

        this._getRight().removeClass('future');
        this._getRight().addClass('present');

        this._horizIndex += 1;

        this.fire('changed');
    },

    _getCurrentHoriz : function() {
        return this._sections.item(this._horizIndex);
    },

    _getLeft : function() {
        return this._sections.item(this._horizIndex - 1);
    },

    _getRight : function() {
        return this._sections.item(this._horizIndex + 1);
    },

    hasRight : function() {
        return this._horizIndex < this._sections.size() - 1;
    },

    hasLeft : function() {
        return this._horizIndex > 0;
    }
});

Y.namespace('slides').Navigation = Y.Base.create('navigation', Y.Base, [], {
    _sections : null,
    _index : 0,
    _subIndex : 0,

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
        this._getCurrentSection().removeClass('future');
        this._getCurrentSection().addClass('present');
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

        this._getCurrentSection().removeClass('present');
        this._getCurrentSection().addClass('future');

        this._getLeft().removeClass('past');
        this._getLeft().addClass('present');

        this._index -= 1;

        this.fire('changed');
    },

    showRight : function() {
        if (!this.hasRight())
            return;

        this._getCurrentSection().removeClass('present');
        this._getCurrentSection().addClass('past');

        this._getRight().removeClass('future');
        this._getRight().addClass('present');

        this._index += 1;

        this.fire('changed');
    },

    _getCurrentSection : function() {
        return this._sections.item(this._index);
    },

    _getLeft : function() {
        return this._sections.item(this._index - 1);
    },

    _getRight : function() {
        return this._sections.item(this._index + 1);
    },

    hasRight : function() {
        return this._index < this._sections.size() - 1;
    },

    hasLeft : function() {
        return this._index > 0;
    }
});

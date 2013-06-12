Y.namespace('slides').Navigation = Y.Base.create('navigation', Y.Base, [], {
    _sections : null,
    _horizIndex : 0,

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
            this.showPreviousHoriz();
        } else if (ev.keyCode == 39) {
            this.showNextHoriz();
        }
    },

    showPreviousHoriz : function() {
        if (!this.hasPreviousHoriz())
            return;

        this._getCurrentHoriz().removeClass('present');
        this._getCurrentHoriz().addClass('future');

        this._getPreviousHoriz().removeClass('past');
        this._getPreviousHoriz().addClass('present');

        this._horizIndex -= 1;

        this.fire('changed');
    },

    showNextHoriz : function() {
        if (!this.hasNextHoriz())
            return;

        this._getCurrentHoriz().removeClass('present');
        this._getCurrentHoriz().addClass('past');

        this._getNextHoriz().removeClass('future');
        this._getNextHoriz().addClass('present');

        this._horizIndex += 1;

        this.fire('changed');
    },

    _getCurrentHoriz : function() {
        return this._sections.item(this._horizIndex);
    },

    _getPreviousHoriz : function() {
        return this._sections.item(this._horizIndex - 1);
    },

    _getNextHoriz : function() {
        return this._sections.item(this._horizIndex + 1);
    },

    hasNextHoriz : function() {
        return this._horizIndex < this._sections.size() - 1;
    },

    hasPreviousHoriz : function() {
        return this._horizIndex > 0;
    }
});

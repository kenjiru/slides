Y.namespace('slides').Navigation = Y.Base.create('navigation', Y.Base, [], {
    _sections : null,
    _subSections : null,
    _index : 0,
    _subIndex : 0,

    initializer : function() {
        // IE<9 needs to listen to key event on the document
        Y.one(document).on('keydown', Y.bind(this._handleKeyPress, this));

        this.publish('changed');

        this._initializeSections();
    },

    _initializeSections : function() {
        this._sections = Y.all('.slides>section');

        this._checkSubsections();

        this._markAllFuture();
        this._markCurrent();
        this._markStackSections();
    },

    _markAllFuture : function() {
        this._sections.addClass('future');
    },

    _markCurrent : function() {
        var currentSection = this._getCurrentSection(),
            currentSubSection = this._getCurrentSubSection();

        currentSection.removeClass('future');
        currentSection.addClass('present');

        if (currentSubSection) {
            currentSubSection.removeClass('future');
            currentSubSection.addClass('present');
        }
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

        this._checkSubsections();

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

        this._checkSubsections();

        this.fire('changed');
    },

    _checkSubsections : function() {
        var currentSection = this._getCurrentSection(),
            subSections = currentSection.all('section'),
            currentSubIndex;

        if (subSections.size() > 0) {
            this._subSections = subSections;
            currentSubIndex = currentSection.getAttribute('subIndex') || '';

            if (currentSubIndex == '') {
                currentSubIndex = 0;
                currentSection.setAttribute('subIndex', currentSubIndex);
            }

            this._subIndex = currentSubIndex;
        } else {
            this._subSections = null;
            this._subIndex = null;
        }
    },

    _getCurrentSection : function() {
        return this._sections.item(this._index);
    },

    _getCurrentSubSection : function() {
        if (this._subSections) {
            return this._subSections.item(this._subIndex);
        }

        return null;
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
    },

    hasUp : function() {
        return this._subSections && this._subIndex > 0;
    },

    hasDown : function() {
        return this._subSections && this._subIndex < this._subSections.size() - 1;
    }
});

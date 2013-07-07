Y.namespace('slides').Navigation = Y.Base.create('navigation', Y.Base, [], {
    _app : null,
    _sections : null,
    _subSections : null,
    _index : 0,
    _subIndex : 0,

    initializer : function(config) {
        this._app = config.app;

        // IE<9 needs to listen to key event on the document
        Y.one(document).on('keydown', Y.bind(this._onKeyPress, this));

        this.publish('changed');
        this.addTarget(this._app);

        this._initializeSections();
    },

    _initializeSections : function() {
        this._sections = Y.all('.slides>section');

        this._markAllFuture();
        this._markStackSections();
        this._markCurrentSection();

        this._checkSubsections();
    },

    _markAllFuture : function() {
        this._sections.addClass('future');
    },

    _markCurrentSection : function() {
        var currentSection = this._getCurrentSection();

        currentSection.removeClass('future');
        currentSection.addClass('present');
    },

    _markStackSections : function() {
        this._sections.each(function(section){
            if (section.all('section').size() > 0) {
                section.addClass('stack');
            }
        });
    },

    _onKeyPress : function(ev) {
        if (ev.keyCode == 37) {
            this.showLeft();
        } else if (ev.keyCode == 39) {
            this.showRight();
        } else if (ev.keyCode == 38) {
            this.showUp();
        } else if (ev.keyCode == 40) {
            this.showDown();
        }

        if (ev.keyCode == 37 || ev.keyCode == 39) {
            this.fire('changed', {
                direction : 'leftRight'
            });
        } else if (ev.keyCode == 38 || ev.keyCode == 40) {
            this.fire('changed', {
                direction : 'upDown'
            });
        }
    },

    showLeft : function() {
        var subSection;

        if (!this.hasLeft())
            return;

        this._getCurrentSection().removeClass('present');
        this._getCurrentSection().addClass('future');

        this._getLeft().removeClass('past');
        this._getLeft().addClass('present');

        subSection = this._getCurrentSubSection();
        if (subSection) {
            subSection.removeClass('present');
        }

        this._saveSubIndex();

        this._index -= 1;

        this._checkSubsections();
    },

    showRight : function() {
        var subSection;

        if (!this.hasRight())
            return;

        this._getCurrentSection().removeClass('present');
        this._getCurrentSection().addClass('past');

        this._getRight().removeClass('future');
        this._getRight().addClass('present');

        subSection = this._getCurrentSubSection();
        if (subSection) {
            subSection.removeClass('present');
        }

        this._saveSubIndex();

        this._index += 1;

        this._checkSubsections();
    },

    showUp : function() {
        if (!this.hasUp())
            return;

        this._getCurrentSubSection().removeClass('present');
        this._getCurrentSubSection().addClass('future');

        this._getUp().removeClass('past');
        this._getUp().addClass('present');

        this._subIndex--;
    },

    showDown : function() {
        if (!this.hasDown())
            return;

        this._getCurrentSubSection().removeClass('present');
        this._getCurrentSubSection().addClass('past');

        this._getDown().removeClass('future');
        this._getDown().addClass('present');

        this._subIndex++;
    },

    _saveSubIndex : function() {
        var currentSection = this._getCurrentSection();

        if (currentSection.hasClass('stack')) {
            currentSection.setAttribute('subIndex', this._subIndex);
        }
    },

    _checkSubsections : function() {
        var currentSection = this._getCurrentSection(),
            currentSubSection,
            currentSubIndex;

        if (currentSection.hasClass('stack')) {
            this._subSections = currentSection.all('section');

            currentSubIndex = currentSection.getAttribute('subIndex') || '0';
            currentSubIndex = parseInt(currentSubIndex);

            this._subIndex = currentSubIndex;

            currentSubSection = this._getCurrentSubSection();
            currentSubSection.removeClass('past');
            currentSubSection.removeClass('future');
            currentSubSection.addClass('present');
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

    _getUp : function() {
        return this._subSections.item(this._subIndex - 1);
    },

    _getDown : function() {
        return this._subSections.item(this._subIndex + 1);
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
    },

    getCurrentIndex : function() {
        return {
            index : this._index,
            subIndex : this._subIndex || 0
        };
    },

    getCurrentSection : function() {
        return this._getCurrentSection();
    }
});

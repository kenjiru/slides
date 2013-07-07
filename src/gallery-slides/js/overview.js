Y.namespace('slides').Overview = Y.Base.create('overview', Y.Base, [], {
    _app : null,
    _overviewEnabled : false,

    initializer : function(config) {
        this._app = config.app;

        this.publish('changed');
        this.addTarget(this._app);

        Y.one(document).on('keydown', Y.bind(this._onKeyPress, this));
        this._app.on('navigation:changed', this._onNavigationChanged, this);
    },

    isOverviewEnabled : function() {
        return this._overviewEnabled;
    },

    _onKeyPress : function(ev) {
        if (ev.keyCode == 27) {
            this._toggleOverview();
        }
    },

    _onNavigationChanged : function(ev) {
        var currentSection,
            current;

        if (!this._overviewEnabled)
            return;

        if (ev.direction == 'leftRight') {
            this._positionSections(false);
        } else if (ev.direction == 'upDown') {
            currentSection = this._app.navigation.getCurrentSection();
            current = this._app.navigation.getCurrentIndex();

            this._positionSubSections(currentSection, current.subIndex);
        }
    },

    _toggleOverview : function() {
        if (this._overviewEnabled) {
            this._disableOverview();
        } else {
            this._enableOverview();
        }

        this.fire('changed', {
            overviewEnabled : this._overviewEnabled
        });
    },

    _enableOverview : function() {
        var slidesContainer = Y.one('.slides-container');

        slidesContainer.addClass('overview');

        this._positionSections(true);
        this._overviewEnabled = true;
    },

    _positionSections : function(positionSubSections) {
        var sections = Y.all('.slides>section'),
            current = this._app.navigation.getCurrentIndex();

        sections.each(function(section, i){
            var xTranslate = (i - current.index) * 105,
                transformStr = 'translateZ(-2500px) translate(' + xTranslate + '%, 0%)'

            this._setTransform(section, transformStr);

            if(positionSubSections && section.hasClass('stack')) {
                this._positionSubSections(section);
            }
        }, this);
    },

    _positionSubSections : function(section, subIndex) {
        var subSections = section.all('section'),
            subIndex = subIndex || section.getAttribute('subIndex') || '0';

        subIndex = parseInt(subIndex, 10);

        subSections.each(function(subSection, i) {
            var yTranslate = (i - subIndex) * 105,
                translateStr = 'translate(0%, ' + yTranslate + '%)';

            this._setTransform(subSection, translateStr);
        }, this);
    },

    _disableOverview : function() {
        var slidesContainer = Y.one('.slides-container');

        slidesContainer.removeClass('overview');

        this._disableForSections();
        this._overviewEnabled = false;
    },

    _disableForSections : function() {
        var sections = Y.all('.slides>section');

        sections.each(function(section, i){
            this._setTransform(section, '');

            if(section.hasClass('stack')) {
                this._disableForSubSections(section);
            }
        }, this);
    },

    _disableForSubSections : function(section) {
        var subSections = section.all('section');

        subSections.each(function(subSection) {
            this._setTransform(subSection, '');
        }, this);
    },

    _setTransform : function(node, transformStr) {
        node.setStyles({
            '-webkit-transform' : transformStr,
            '-ms-transform' : transformStr,
            '-o-transform' : transformStr,
            'transform' : transformStr
        });
    }
});
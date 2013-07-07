Y.namespace('slides').Overview = Y.Base.create('overview', Y.Base, [], {
    _app : null,
    _overviewEnabled : false,

    initializer : function(config) {
        this._app = config.app;

        this.publish('changed');
        this.addTarget(this._app);

        Y.one(document).on('keydown', Y.bind(this._handleKeyPress, this));
    },

    isOverviewEnabled : function() {
        return this._overviewEnabled;
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

        this.fire('changed', {
            overviewEnabled : this._overviewEnabled
        });
    },

    _enableOverview : function() {
        var slidesContainer = Y.one('.slides-container');

        slidesContainer.addClass('overview');

        this._positionSections();
        this._overviewEnabled = true;
    },

    _positionSections : function() {
        var sections = Y.all('.slides>section'),
            current = this._app.navigation.getCurrentIndex();

        sections.each(function(section, i){
            var xTranslate = (i - current.index) * 105,
                transformStr = 'translateZ(-2500px) translate(' + xTranslate + '%, 0%)'

            this._setTransform(section, transformStr);

            if(section.hasClass('stack')) {
                this._positionSubSections(section);
            }
        }, this);
    },

    _positionSubSections : function(section) {
        var subSections = section.all('section'),
            subIndex = section.getAttribute('subIndex') || '0';

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
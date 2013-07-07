Y.namespace('slides').Overview = Y.Base.create('overview', Y.Base, [], {
    _app : null,
    _overviewEnabled : false,

    initializer : function(config) {
        Y.one(document).on('keydown', Y.bind(this._handleKeyPress, this));

        this._app = config.app;
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

    _enableOverview : function() {
        var slidesContainer = Y.one('.slides-container');

        slidesContainer.addClass('overview');

        this._positionSections();

        console.log('overview enabled!');
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
            } else {
                section.setStyle('top', '-340px');
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

            subSection.setStyle('top', '-340px');
        }, this);

        section.setStyle('top', '0');
    },

    _disableOverview : function() {
        var slidesContainer = Y.one('.slides-container');

        slidesContainer.removeClass('overview');

        this._disableForSections();

        console.log('overview disabled!');
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
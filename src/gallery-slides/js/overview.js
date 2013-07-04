Y.namespace('slides').Overview = Y.Base.create('overview', Y.Base, [], {
    _overviewEnabled : false,

    initializer : function() {
        console.log('overview initialized!');

        Y.one(document).on('keydown', Y.bind(this._handleKeyPress, this));
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
        var slidesContainer = Y.one('.slides-container'),
            sections = Y.all('.slides>section'),
            current = Y.navigation.getCurrentIndex(),
            noSections = sections.size();

        slidesContainer.addClass('overview');

        sections.each(function(section, i){
            var xTranslate = (i - current.index) * 105,
                transformStr = 'translateZ(-2500px) translate(' + xTranslate + '%, 0%)'

            this._setTransform(section, transformStr);

            if(section.hasClass('stack')) {
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
            } else {
                section.setStyle('top', '-340px');
            }
        }, this);

        console.log('overview enabled!');
        this._overviewEnabled = true;
    },

    _setTransform : function(node, transformStr) {
        node.setStyles({
            '-webkit-transform' : transformStr,
            '-ms-transform' : transformStr,
            '-o-transform' : transformStr,
            'transform' : transformStr
        });

    },

    _disableOverview : function() {
        var slidesContainer = Y.one('.slides-container');

        slidesContainer.removeClass('overview');

        console.log('overview disabled!');
        this._overviewEnabled = false;
    }
});
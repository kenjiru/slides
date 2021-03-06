Y.namespace('slides').Layout = Y.Base.create('layout', Y.Base, [], {
    _app : null,
    _overviewEnabled : false,

    initializer : function(config) {
        this._app = config.app;

        Y.on('windowresize', Y.bind(this._onWindowResize, this));
        this._onWindowResize();

        this._app.on('overview:changed', this._onOverviewChanged, this);
    },

    // TODO Does not work
    _checkBrowserVersion : function() {
        if (Y.UA.ie && Y.UA.ie < 9) {
            var htmlElements = ['header', 'nav', 'section', 'article', 'aside', 'footer', 'hgroup' ];

            for (var i=0; i<htmlElements.length; i++) {
                Y.Node.create('<' + htmlElements[i] + '></' + htmlElements[i] + '>');
            }
        }
    },

    _onWindowResize : function() {
        this._setZoom();
        this._setPosition();
    },

    _onOverviewChanged : function(ev) {
        this._overviewEnabled = ev.overviewEnabled;

        if(ev.overviewEnabled) {
            this._setOverviewPosition();
        } else {
            this._setZoom();
            this._setPresentationPosition();
        }
    },

    _setZoom : function() {
        var slides = Y.one('.slides'),
            slidesHeight = slides.get('clientHeight'),
            slidesWidth = slides.get('clientWidth'),
            windowHeight = slides.get('winHeight'),
            windowWidth = slides.get('winWidth'),
            heightRatio = 1,
            widthRatio = 1,
            finalRatio,
            slidesTop = (windowHeight - slidesHeight) / 2;

        if (windowHeight < slidesHeight) {
            heightRatio = windowHeight / slidesHeight;
        }

        if (windowWidth < slidesWidth) {
            widthRatio = windowWidth / slidesWidth;
        }

        finalRatio = Math.min(heightRatio, widthRatio);

        var scaleStr = 'scale(' + finalRatio + ')';

        if (Y.UA.ie > 0 && Y.UA.ie < 9) {
            slides.setStyle('zoom', finalRatio);

            // zoom is different than scale, so apply top only if value is positive
            if (slidesTop > 0) {
                slides.setStyle('top', slidesTop + 'px');
            }
        } else {
            slides.setStyles({
                '-webkit-transform' : scaleStr,
                '-ms-transform' : scaleStr,
                '-o-transform' : scaleStr,
                'transform' : scaleStr
            });
            slides.setStyle('top', slidesTop + 'px');
        }
    },

    _setPosition : function() {
        if (!this._overviewEnabled) {
            this._setPresentationPosition();
        }
    },

    _setPresentationPosition : function() {
        var slides = Y.one('.slides'),
            sections = Y.all('section'),
            slidesHeight = slides.get('clientHeight');

        sections.each(function(section) {
            var sectionHeight = section.get('clientHeight'),
                sectionTop = (slidesHeight - sectionHeight) / 2;

            if (!this._isStack(section) && sectionTop > 0) {
                section.setStyle('top', sectionTop);
            }
        }, this);
    },

    _setOverviewPosition : function() {
        var slides = Y.one('.slides'),
            sections = Y.all('section');

        slides.setStyle('top', 0);

        sections.each(function(section) {
            if (this._isStack(section)) {
                section.setStyle('top', 0);
            } else {
                section.setStyle('top', '-340px');
            }
        }, this);
    },

    _isStack : function(section) {
        return section.hasClass('stack');
    }
});

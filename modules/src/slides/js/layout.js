var Layout = Y.Base.create('layout', Y.Base, [], {
    initializer : function() {
        Y.on('domready', Y.bind(this.setLayout, this));
        Y.on('windowresize', Y.bind(this.setLayout, this));
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

    setLayout : function() {
        var sections = Y.all('section');

        this.setSlidesLayout();

        sections.each(this.setSectionLayout, this);
    },

    setSlidesLayout : function() {
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

    setSectionLayout : function(section) {
        var slides = Y.one('.slides'),
            slidesHeight = slides.get('clientHeight'),
            sectionHeight = section.get('clientHeight'),
            sectionTop = (slidesHeight - sectionHeight) / 2;

        if (sectionTop > 0) {
            section.setStyle('top', sectionTop);
        }
    }
});

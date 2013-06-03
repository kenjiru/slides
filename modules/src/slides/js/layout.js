var Layout = Y.Base.create('layout', Y.Base, [], {
    initializer : function() {
        Y.on('domready', Y.bind(this.setLayout, this));
        Y.on('windowresize', Y.bind(this.setLayout, this));
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

        slides.setStyle('zoom', finalRatio);

        if (slidesTop > 0) {
            slides.setStyle('margin-top', slidesTop + 'px');
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

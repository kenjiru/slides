Y.namespace('slides').ProgressBar = Y.Base.create('progressBar', Y.Widget, [], {
    CONTENT_TEMPLATE : "<span></span>",

    _app : null,
    _totalSections : 0,
    _currentIndex : 0,
    _sectionIndexArray : [],

    initializer : function(config) {
        this._app = config.app;

        this._findTotalSlides();
    },

    _findTotalSlides : function() {
        var sections = Y.all('.slides>section'),
            total = 0;

        this._sectionIndexArray[0] = 0;

        sections.each(function(section, i) {
            if (section.hasClass('stack')) {
                total += section.all('section').size();

                this._sectionIndexArray[i+1] = total;
            } else {
                this._sectionIndexArray[i+1] = ++total;
            }
        }, this);

        this._totalSections = total;
    },

    renderUI : function() {
        this._updateLayout();
    },

    bindUI : function() {
        this._app.navigation.on('navigation:changed', this._updateProgress, this);
        Y.on('windowresize', Y.bind(this._updateLayout, this));
    },

    _updateProgress : function() {
        var current = this._app.navigation.getCurrentIndex();

        this._currentIndex = this._sectionIndexArray[current.index] + current.subIndex;
        this._updateLayout();
    },

    _updateLayout : function() {
        var boundingWidth = this.get('boundingBox').get('offsetWidth'),
            sectionWidth = boundingWidth / (this._totalSections - 1);

        this.get('contentBox').setStyle('width', this._currentIndex * sectionWidth);
    }
});
YUI_config = {
    debug: true,
    combine: false,
    base: 'http://yui.yahooapis.com/3.10.1/build/',

    groups : {
        slides : {
            debug: true,
            combine: false,
            filter: 'raw',
            base: '/build/',

            modules : {
                'gallery-slides' : {
                    skinnable: true
                }
            }
        }
    }
};
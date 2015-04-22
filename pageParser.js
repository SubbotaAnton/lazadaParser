var cheerio = require('cheerio');

function PageParser (html, config) {
    if (html && config) {
        this.html = html;
        this.config = config;
    } else {
        throw {
            message : 'Need html && config in params'
        }
    }
}

PageParser.prototype = {
    constructor : PageParser,

    getData : function () {
        var key, item, value,
            result = {},
            $ = cheerio.load(this.html);

        for (key in this.config) {
            if (this.config.hasOwnProperty(key)) {
                item = this.config[key];
                try {
                    value = item.value($);
                } catch (e) {}
                result[key] = {
                    name : item.name,
                    value : value
                };
            }
        }

        return result;
    }
};


module.exports = PageParser;
var fs = require('fs'),
    PageParser = require('./pageParser'),
    lazadaPageConfig = require('./lazadaPageConfig');

function loadHTML(url, callback) {
    if (url === '1' || url === '2') {
        fs.readFile('./mocks/lazada_' + url + '.html', 'utf8', function (err, html) {
            if (err) {
                throw err;
            }

            var page = new PageParser(html, lazadaPageConfig);
            callback(page.getData());
        });
    } else {
        // we should load html
    }
}

module.exports = {
    loadHTML : loadHTML
};
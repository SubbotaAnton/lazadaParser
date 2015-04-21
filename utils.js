var fs = require('fs'),
    PageParser = require('./pageParser'),
    lazadaPageConfig = require('./lazadaPageConfig'),
    request = require('request');

function loadHTML(url, callback) {
    var page;

    if (url === '1' || url === '2') {

        fs.readFile('./mocks/lazada_' + url + '.html', 'utf8', function (err, html) {
            if (err) {
                callback({msg : 'cannot read a file'});
            }

            page = new PageParser(html, lazadaPageConfig);
            callback(null, page.getData());
        });

    } else {

        request.get(url, function (error, response, html) {

            if (!error && response.statusCode == 200) {
                page = new PageParser(html, lazadaPageConfig);
                callback(null, page.getData());

            } else {
                callback({msg : 'cannot read url'});
            }

        });
    }
}

module.exports = {
    loadHTML : loadHTML
};
var fs = require('fs'),
    PageParser = require('./pageParser'),
    lazadaPageConfig = require('./lazadaPageConfig'),
    request = require('request');

function loadHTML(url, callback) {
    var page;

    if (url === '1' || url === '2' || url === '3') {

        fs.readFile('./mocks/lazada_' + url + '.html', 'utf8', function (err, html) {
            if (err) {
                return callback({msg : 'cannot read a file'});
            }

            page = new PageParser(html, lazadaPageConfig);
            return callback(null, page.getData());
        });

    } else {

        var options = {
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36'
            }
        };

        request.get(options, function (error, response, html) {

            if (!error && response.statusCode == 200) {
                page = new PageParser(html, lazadaPageConfig);
                return callback(null, page.getData());

            } else {
                return callback({msg : 'cannot read url'});
            }

        });
    }
}

module.exports = {
    loadHTML : loadHTML
};
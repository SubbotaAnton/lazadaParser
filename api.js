var Hapi = require('hapi'),
    http = require('http'),
    utils = require('./utils');


var server = new Hapi.Server({
    connections: {
        router: {
            stripTrailingSlash: true
        }
    }
});

server.connection({
    host: 'localhost',
    port: 8000
});

server.route({
    method: 'GET',
    path: '/link/{url}',
    handler: function (request, reply) {
        var url = decodeURIComponent(request.params.url);
        if (url) {
            utils.loadHTML(url, function (error, data) {
                if (error) {
                    reply({
                        errorMessage : error.msg
                    });
                } else {
                    reply({
                        resultCode: 'OK',
                        payload: data
                    })
                }
            });
        } else {
            reply({
                errorMessage : "Need url"
            });
        }
    }
});

server.start();
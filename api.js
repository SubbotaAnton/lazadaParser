var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});


server.route({
    method: 'GET',
    path: '/link/{url}',
    handler: function (request, reply) {
        reply('Hello ' + encodeURIComponent(request.params.url) + '!');
    }
});

// Start the server
server.start();

var jsdom = require("jsdom-nogyp");

jsdom.env({
    url: "http://www.lazada.vn/lg-optimus-g3-16gb-vang-dong-301084.html",
    done: function (errors, window) {
        var $ = window.$;
        console.log("HN Links");
        console.log(window.document.getElementById("order_tracking"));
    }
});

// http://habrahabr.ru/post/210166/
// http://stackoverflow.com/questions/7977945/html-parser-on-node-js
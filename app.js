var express = require('express'),
    http = require('http'),
    path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index');
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

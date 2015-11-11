//======================================================================================
var express    = require('express'), 
	path 	   = require('path'),
	swig 	   = require('swig'),
	logger     = require('morgan'),
	favicon    = require('serve-favicon'),
	bodyParser = require('body-parser');
//======================================================================================
var app 	   = express();
//var	form_basic = require('./form_basic');
//var	form_multi = require('./form_multi');
var route      = require('./route');
//======================================================================================
app.set('port', process.env.PORT || 80);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
//--------------------------------------------------------------------------------------
//This is where all the magic happens!
//因为{{}}跟AngularJS冲突,自己设定
swig.setDefaults({varControls: ['{@', '@}']});
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/swigs');
// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
//======================================================================================
//app.use('/form_basic', form_basic);
//app.use('/form_multi', form_multi);
app.use('/', route);
//======================================================================================
app.listen(8099, function(){
	console.log('SERVER STARTED!');
});
//======================================================================================
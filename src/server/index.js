import _ from 'underscore';
import path from 'path';
import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import session from 'express-session';
import router from './routes';
import config from '../../config';

const IS_PRODUCTION = process.env.NODE_ENV === 'production' ? true : false;
var app = express();


// Server Basic
app.set('env', IS_PRODUCTION ? 'production' : 'development');
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');
app.enable('trust proxy');

// Middlewares
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Logger
app.use( IS_PRODUCTION ? morgan('combined') : morgan('dev') );

// Session stuff
app.use(session({
	secret: 'wow_kya_baat_hai',
	resave: false,
	saveUninitialized: true
}));

app.use('/public', express.static(__dirname + '/public'));

// Apply Router
app.use(router);
app.get('/config', (req, res)=>{
	let blacklist = ['port']
	res.json(_.omit(config, ...blacklist));
})

// If requested route is not present in router
// Handle 404
app.use((req, res, next)=> {
	var err = new Error('Not Found: ' + req.originalUrl);
	err.status = 404;
	next(err);
})

// 5xx errors
app.use((err, req, res, next)=>{
	res.status(err.status || 500)
	console.error(`${err.status}:Server Error:\n`, err, err.stack);
	res.send("error: " + err.message + '\nstack: ' + JSON.stringify(err.stack));
});

// Start Server
const runServer = ()=>{
	var port = process.env.PORT || 4200;
	app.listen(port, ()=>{
		console.log(`Express Server at: Server started at http://localhost:${port}`)
	})
}

runServer();
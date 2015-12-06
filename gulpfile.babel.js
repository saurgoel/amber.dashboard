import gulp from 'gulp';
import minimist from 'minimist';
import {exec} from 'child-process-promise';
import nodemon from 'gulp-nodemon';
import nodeInspector from 'gulp-node-inspector';
import browserSync from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';


const argv = minimist(process.argv.slice(2));
const WATCH = argv.watch ? true : false;
const PRODUCTION = process.env.NODE_ENV === 'production' || (argv.prod ? true : false);


console.log(`GULP ENV: { watch: ${WATCH}, production: ${PRODUCTION} }`);

var clientbundler, serverbundler;

gulp.task('default', ['reload']);

gulp.task('clean', cb => {
	var cmd = [
		'rm -rf ./build',
		'mkdir -p ./build/public'
	].join(' && ')

	exec(cmd)
		.then( result => {
			console.log('clean:stdout', result.stdout)
			return cb();
		})
		.catch( err => console.error('clean:error', err))
});

gulp.task('copy', cb => {
	return gulp.src('./src/server/templates/**')
		.pipe(gulp.dest('./build/templates'))
});

gulp.task('build', ['clean', 'copy', 'webpack:build']);


gulp.task('webpack:build', ['clean', 'copy'], cb => {
	let runCount = 0;
	clientbundler = webpack(config[0]);
	serverbundler = webpack(config[1]);
	
	let onComplete = (err, stats)=>{
		if (err) return console.error(err);
		console.log(stats.toString({colors: true, chunks: false}))
		runCount += 1;
		if (runCount === 2) return cb();
	}
	if (WATCH){
		clientbundler.watch(200, onComplete)
		serverbundler.watch(200, onComplete)
	}
	else {
		clientbundler.run(onComplete)
		serverbundler.run(onComplete)	
	}
});



gulp.task('node-debug',  cb => {
  gulp.src([]).pipe( nodeInspector({preload:false}) );
  cb();
});


// Launch BrowserSync development server
gulp.task('reload', ['node-debug', 'server', 'build'], cb => {

  process.on('exit', () => browserSync.exit());

  browserSync({
    logPrefix: 'Amber: ',
    open: false, notify: true, https: false,
    proxy: {
      target: 'localhost:4200',
      middleware: [
        webpackDevMiddleware(clientbundler, {
          publicPath: config[0].output.publicPath,
          stats: {colors: true, chunks: false}
        }),
        webpackHotMiddleware(clientbundler)
      ]
    }
  }, cb);
});


gulp.task('server', ['build'], cb => {
	nodemon({
		script: './build/server.js',
		watch:  './build/server.js',
		env: Object.assign({NODE_ENV: 'development'}, process.env),
    nodeArgs: ['--debug']
  }).on('restart', cb=>{
    console.log('Server Restarted: Reloading BrowserSync.');
    browserSync.reload();
  });
  return cb();
});
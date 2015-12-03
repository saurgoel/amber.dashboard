import gulp from 'gulp';
import webpack from 'webpack';
import minimist from 'minimist';
import {exec} from 'child-process-promise';
import nodemon from 'gulp-nodemon';

import config from './webpack.config';


const argv = minimist(process.argv.slice(2));

const WATCH = argv.watch ? true : false;
const PRODUCTION = argv.prod ? true : false;


console.log(`GULP ENV: { watch: ${WATCH}, production: ${PRODUCTION} }`);


gulp.task('default', ['server']);

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

gulp.task('webpack:build', ['clean'], cb => {
	let runCount = 0;
	let bundler = webpack(config);
	
	let onComplete = (err, stats)=>{
		if (err) return console.error(err);

		console.log(stats.toString({colors: true, chunks: false}))
		return cb();
	}

	WATCH
		? bundler.watch(200, onComplete)
		: bundler.run(onComplete);
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
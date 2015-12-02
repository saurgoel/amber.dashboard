import gulp from 'gulp';


gulp.task('default', ['hello']);
gulp.task('hello', cb => {
	console.log('>>>Gulp Hello!');
	return cb();
})

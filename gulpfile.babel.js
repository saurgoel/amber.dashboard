import fs from 'fs';
import path from 'path';

import cp from 'child_process';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import mkdirp from 'mkdirp';
import runSequence from 'run-sequence';

import minimist from 'minimist';
import nodeInspector from 'gulp-node-inspector';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const $ = gulpLoadPlugins();
const argv = minimist(process.argv.slice(2));
const isProduction = !!argv.prod;

const amberConfig = require('./config');

const config  = require('./webpack.config.js');
const serverBundler = webpack(config[1]);
const clientBundler = webpack(config[0]);

var watch = false;
var src = {
  assets: [
    'src/public/**'
  ],
  resources: [
    'package.json',
    'src/server/templates*/**'
  ]
};

var dest = {
  build: 'build',
  logs:  'build/logs',
  public: 'build/public'
};

gulp.task('clean', async (cb) => {
  await del(['.tmp', 'build/*'], {dot: true});
  await mkdirp(dest.logs);
  await mkdirp(dest.public);
  return cb;
});


gulp.task('assets', ['clean'], (cb) => {
  return gulp.src(src.assets)
    .pipe($.changed(dest.public))
    .pipe(gulp.dest(dest.public))
    .pipe($.size({title: 'assets'}));
});

// Resource files
gulp.task('resources', () => {
  return gulp.src(src.resources)
    .pipe($.changed(dest.build))
    .pipe(gulp.dest(dest.build))
    .pipe($.size({title: 'resources'}));
});


// Bundle
gulp.task('bundle', ['clean', 'assets', 'resources'], cb => {
  let runCount = 0;
  function bundlerCallback(err, stats){
    if (err)
      throw new $.util.PluginError('webpack', err);
    console.log(stats.toString(config[0].stats));
    if (++runCount === (watch ? config.length : 1)) {
      return cb();
    }
  }
  if (watch){
    serverBundler.watch(200, bundlerCallback);
    clientBundler.watch(200, bundlerCallback);
  }
  else{
    serverBundler.run(bundlerCallback);
    clientBundler.run(bundlerCallback);
  }
});

// Build and start watching for modifications
gulp.task('build:watch', cb => {
  watch = true;
  runSequence(['bundle'], ()=>{
    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.resources, ['resources']);
    cb();
  });
});

// Launch a Node.js/Express server
gulp.task('serve', ['build:watch', 'node-debug'], cb => {
  console.log('Starting Node Server...');
  nodemon({
    script: 'build/server.js',
    watch : 'build/server.js',
    env: Object.assign({NODE_ENV: 'development'}, process.env),
    nodeArgs: ['--debug']
  }).on('restart', cb=>{
    console.log('Server Restarted: Reloading BrowserSync.');
    browserSync.reload();
  });
  cb();
});

gulp.task('node-debug',  cb => {
  gulp.src([]).pipe( nodeInspector({preload:false}) );
  cb();
});


// Launch BrowserSync development server
gulp.task('sync', ['serve'], cb => {

  process.on('exit', () => browserSync.exit());

  browserSync({
    logPrefix: 'Housing: ',
    open: false, notify: false, https: false,
    port: amberConfig.bsPort || 3000,
    proxy: {
      target: `localhost:${amberConfig.serverPort}`,
      middleware: [
        webpackDevMiddleware(clientBundler, {
          publicPath: config[0].output.publicPath,
          stats: {colors: true, chunks:false},
        }),
        webpackHotMiddleware(clientBundler)
      ]
    },
    files: [
      'build/public/**/*.css',
      '!build/public/**/*.js'
    ]
  }, cb);
});



gulp.task('default', ['sync']);
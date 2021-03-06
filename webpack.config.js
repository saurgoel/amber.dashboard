import path from 'path';
import webpack from 'webpack';
import merge from 'lodash/object/merge';
import AssetsPlugin from 'assets-webpack-plugin';

// Stylus deps
import nib from 'nib';
import axis from 'axis';
import rupture from 'rupture';
import autoprefixer from 'autoprefixer-stylus';


import baseConfig from './config/base.config';
import dirs from './config/dirs';

const is_prod = process.env.NODE_ENV === 'production' ? true : false;
const GLOBALS = {
	'process.env.NODE_ENV': !is_prod ? '"development"' : '"production"',
	'__DEV__': !is_prod
};

const JADE_ROOT = path.resolve('./src/jade');
const STYLE_LOADER = 'style-loader/useable';
const CSS_LOADER = 'css-loader';

// Get base config for environment
var config = baseConfig({ is_prod });

var config_client = merge({}, config, {
	target: 'web',
	entry: {
		main: [
			...( is_prod ? [] : ['webpack-hot-middleware/client?reload=true']),
			'./src/client/index',
		],
		vendors: [
			'jquery', 'underscore',
			'backbone', 'marionette', 'radio',
			'font-awesome', 'animate.css'
		]
	},
	output: {
		path: dirs.dest_public,
		publicPath: '/public/',
		filename: '[name]-bundle.js'
	},
	devtool: is_prod ? 'cheap-module-source-map' : 'source-map',
	resolve: {
		modulesDirectories: ['node_modules', 'src/client'],
		alias: {
			marionette: 'backbone.marionette',
			radio: 'backbone.radio',
			jQuery: 'jquery',
		}
	},

	module: {
		loaders: [
			...config.module.loaders,
			{ test: /\.css$/,  loader: 'style!css' },
			{ test: /\.styl$/, loader: `${STYLE_LOADER}!${CSS_LOADER}!stylus-loader?sourceMap` },
			{ test: /\.jade$/, loader: `jade-loader?root=${JADE_ROOT}` },
			{ test: /\.js$/, loader: 'babel-loader', query: {compact: false} },
			{ test: require.resolve('backbone.marionette'), loader: 'expose?Marionette'},
			{ test: require.resolve('backbone.radio'), loader: 'expose?Radio' },
		]
	},

	plugins: [
		...config.plugins,
		new webpack.DefinePlugin(GLOBALS),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors-bundle.js'),
		new AssetsPlugin({ path: dirs.dest_root, filename: 'assets.json' }),

		...(
			is_prod
			? [
					new webpack.optimize.DedupePlugin(),
					new webpack.optimize.AggressiveMergingPlugin(),
					new webpack.optimize.UglifyJsPlugin(),
				]
			: []
		),
		...(!is_prod ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ] : [])
	],
	stylus: {
    use: [nib(), axis(), rupture(), autoprefixer({browsers: ['last 2 versions']})],
    import: [ path.resolve(__dirname, './src/stylus/index.styl') ],
    error: !is_prod ? true : false,
    compress: !is_prod ? false: true
  }
});


var config_server = merge({}, config, {
	target: 'node',
	entry: [ './src/server/index' ],
	output: {
		path: dirs.dest_root,
		filename: 'server.js',
		libraryTarget: 'commonjs2',
	},
	devtool: 'source-map',

	externals: [
		/^[a-z][a-z\/\.\-0-9]*$/,
		/^ext!/
	],

	node: {
		console: false,
		global: false,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false
	},

	resolve: {
		modulesDirectories: ['node_modules']
	},
	module: {
		loaders: [
			...config.module.loaders,
			{ test: /\.js$/, loader: 'babel-loader' },
		]
	},
	plugins: [
		...config.plugins,
		new webpack.DefinePlugin(merge({}, GLOBALS, {'__SERVER__': true })),
		new webpack.BannerPlugin('require("source-map-support").install();',{
			raw: true, entryOnly: false
		}),
	]

});

export default [config_client, config_server];
var webpack = require('webpack');

module.exports = function(env){
	return {
		cache: !env.is_prod,
		debug: !env.is_prod,
		profile: true,

		output: {
			publicPath: '/',
			sourcePrefix: '  ',
		},

		resolve: {
			extensions: ['', '.webpack.js', '.web.js', '.js', '.json', '.styl'],
		},

		stats: {colors: true, chunks: false},

		module: {
			loaders: [
				{ test: /\.json$/, loader: 'json-loader' },
				{ test: /\.txt$/, loader: 'raw-loader' },
				{ test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000' },
				{ test: /\.(eot|ttf|woff2|woff|wav|mp3)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
			]
		},

		plugins: [
			new webpack.optimize.OccurenceOrderPlugin()
		]
	}
};
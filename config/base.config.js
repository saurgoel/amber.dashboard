var webpack = require('webpack');

module.exports = function(env){
	return {
		cache: !env.is_prod,
		debug: !env.is_prod,

		output: {
			publicPath: '/',
			sourcePrefix: '  ',
		},

		resolve: {
			extensions: ['', '.webpack.js', '.web.js', '.js', '.json'],
		},

		module: {
			loaders: [
				{ test: /\.json$/, loader: 'json-loader' }, 
				{ test: /\.txt$/, loader: 'raw-loader' },
				{ test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000' },
				{ test: /\.(eot|ttf|wav|mp3)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' }
			]
		},

		plugins: [
			new webpack.optimize.OccurenceOrderPlugin()
		]
	}
};
var path = require('path');

module.exports = {
	dest_root  : path.join(__dirname, '../build'),
	dest_public: path.join(__dirname, '../build/public'),
	src_root : path.join(__dirname, '../src'),
	src_public: path.join(__dirname, '../src/public')
}
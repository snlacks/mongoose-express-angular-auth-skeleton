var webpack = require('webpack');

module.exports = {

	module: {
	  loaders: [
	    {
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel'
	    }
	  ]
	}
}
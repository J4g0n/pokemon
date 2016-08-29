var path = require("path");
var webpack = require('webpack');


module.exports = {
	devtool: "inline-source-map",
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./app/src/index.js'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				include: path.join(__dirname, "app"),
				loaders: ["react-hot", "babel?presets[]=react,presets[]=es2015"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
                include: path.join(__dirname, "app"),
                loader: "babel-loader"
			}
		],
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
};

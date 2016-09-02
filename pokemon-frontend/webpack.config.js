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
		publicPath: "/",
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				include: path.join(__dirname, "app/src"),
				loaders: ["react-hot", "babel"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				include: path.join(__dirname, "app/src"),
				loader: "babel-loader"
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				include: path.join(__dirname, "app/src/styles"),
				loaders: ["style-loader", "css-loader", "less-loader"]
			},
			{
				test: /\.(png|jpg)$/,
				exclude: /node_modules/,
				include: path.join(__dirname, "app/src/images"),
				loader: 'url-loader'
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

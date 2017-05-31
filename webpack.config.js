const copyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path');

module.exports = {
	entry: {
        "app": "./src/script/index.tsx",
        "top": "./src/script/top.tsx",
    },
	output: {
        path: path.join(__dirname, "./dist"),
		filename: "script/[name].bundle.js"
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{
				test: /tsx?$/,
				use: [
					{loader: "ts-loader"}
				]
			}
		]
	},
	plugins: [
		new copyWebpackPlugin([{from: './src/html/'}]),
	],
	devServer: {
		contentBase: 'dist',
		port: 3000
	},
};

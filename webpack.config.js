const copyWebpackPlugin = require('copy-webpack-plugin')
var path = require('path');

module.exports = {
	entry: {
        "app": "./src/script/index.tsx",
        "top": "./src/script/top.tsx",
        "iphone": "./src/iphone/App.tsx",
        "chart": "./src/iphone/Chart.tsx",
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
		port: 3000,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
	},
};

const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: "./src/script/index.tsx",
	output: {
		filename: "./dist/script/bundle.js"
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
		new copyWebpackPlugin([{from: './src/html/', to: './dist/'}]),
	],
	devServer: {
		contentBase: 'dist',
		port: 3000
	},
};

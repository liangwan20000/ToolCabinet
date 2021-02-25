// 引入path
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
// 导出所有配置项
module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							outputPath: 'image'
						}
					}
				]
			},
			// 引入bootstarp的样式文件,增加对不识别文件的处理
			{
				test: /.(ttf|woff2|woff|eot)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]?[hash]"
				}
			},
			{
				test: /\.less$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }]
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	},
	// 实时更新
	devServer: {
		host: '127.0.0.1',
		compress: true, // 文件通过网络传输前压缩
		port: 10086,
		open: true
	},
	// 配置项目输出的用于显示的HTML文件
	plugins: [new VueLoaderPlugin(), new HtmlWebpackPlugin({
		// 配置被打包的模板文件的目录名字（如果不配置，会生成一个默认的新html标签）
		template: path.resolve('./src/index.html')
	})],
	// 配置webpack模式 production:生产模式；development:开发模式；
	mode: "development",
	// 配置项目入口文件
	entry: './src/index.js',
	// 配置项目输出文件
	output: {
		// 输出文件名字
		filename: 'chunk.js',
		// 输出文件路径
		path: path.resolve('./dist')
	}
}
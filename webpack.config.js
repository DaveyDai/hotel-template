var path = require('path');
var webpack = require('webpack');
var vue = require("vue-loader");

//定义了文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src/main.js');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

var plugins = [
	new webpack.ProvidePlugin({$:"jquery",jQuery:"jquery","window.jQuery":"jquery"})
];
module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: {
		build: APP_PATH
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: '[name].js',
		// 指向异步加载的路径
		publicPath: './build/',
		// 非主文件的命名规则
		chunkFilename: '[id].build.js?[chunkhash]'
	},
    // 服务器配置相关，自动刷新！
    devServer: {
        historyApiFallback: true,
        hot: false,
        inline: true,
        grogress: true
    },	
	// 加载器
	module: {
		loaders: [
			{test: /\.vue$/,loader: 'vue-loader'},
			// ES6
			{ test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			// 编译css并自动添加css前缀
			{test: /\.css$/,loader: 'style-loader!css-loader'},
			// 小于10KB的图片会自动转成dataUrl
			{test: /\.(png|jpe?g|gif)$/,loader: 'url-loader?limit=8192'},
//			{test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
//          	loaders: ['url?limit=10240&name=img/[hash:8].[name].[ext]',
//              	'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}']
//          },
			//html模板编译？
			{test: /\.(html|tpl)$/,loader: 'html-loader'}
		]
	},
	resolve: {alias: {vue: 'vue/dist/vue.min.js'}},	
	plugins: plugins
};
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, 'app/index.jsx'),
    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },

    resolve:{
        extensions:['*', '.js','.jsx'],
        alias: {
            '@': path.resolve(__dirname,'./app')
        }
    },

    module: {
        rules: [
        	{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["react", "es2015"],
						plugins: [
							["react-transform", {
								"transforms": [{
									"transform": "react-transform-hmr",
									"imports": ["react"],
									"locals": ["module"]
								}]
							}]
						]
					}
				}
			},
			{
				test: /\.less$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					}, 
					{
						loader: "css-loader" // translates CSS into CommonJS
					}, 
					{
						loader: "less-loader" // compiles Less to CSS
					}
				]
			},
            {
                test: /\.css$/,
                use: [ 
                        'style-loader', 
                        { 
                            loader: 'css-loader', 
                            options: { importLoaders: 1 } 
                        },
                        {
                            loader:'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                ]
                            }
                        }

                    ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                    loader: 'url-loader',
                        options: {
                          limit: 8192
                        }
                    }
                ]
            },  // 限制大小5kb
            { 
                test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 5000
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        // html 模板插件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器
        new OpenBrowserPlugin({
          url: 'http://localhost:8080'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        })
    ],

    devServer: {
        contentBase: "./build", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        hot: true  // 使用热加载插件 HotModuleReplacementPlugin
    }
}

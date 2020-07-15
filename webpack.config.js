const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[chunkhash].js'
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: { loader: 'babel-loader' },
				exclude: /node_modules/
			},
			{
        test: /\.css$/i,
         use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 
               {
    loader:'css-loader',
    options: {
        importLoaders: 2
    } 
}, 'postcss-loader']
      },
			{
				test: /\.(woff|woff2|ttf)$/,
				use: 'file-loader?name=./fonts/[name].[ext]'
			},
        {
        test: /\.(svg|jpe?g|png|gif)$/i,
        use: [
          {
          loader: 'file-loader',
          options: {
            name: './images/[name].[ext]',
            esModule: false,
            },
          },
          {
          loader: "image-webpack-loader",
          options: {
            esModule: false,
            mozjpeg: {
              progressive: true,
              ouality: 65
              },
            optipng: {
              enabled: false,
              },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4
              },
            gifsicle: {
              interlaced: false,
              },
            webp: {
              quality: 75
              }
            }
          }
		]
  },
    ]
  },
	plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
              preset: ['default'],
      },
      canPrint: true
    }),
		new WebpackMd5Hash()
	]
}

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

var isprod = process.env.NODE_ENV === 'production';
var bootstrapConfig = isprod ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
  entry: {
    app:'./client/index.js',
    bootstrap:bootstrapConfig
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=[name].[ext]&outputPath=/images/"
        ]
      },
      {
        test:/\.scss$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: ["css-loader",'sass-loader'],
          publicPath: "../"
        })
      },
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: ["css-loader",'sass-loader'],
          publicPath: "../"
        })
      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "/css/[name].css",
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title:'Wysiwyg Editor',
      template:'./client/index.html'
    })
  ]
}

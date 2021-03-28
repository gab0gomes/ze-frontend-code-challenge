const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: isProd ? 'js/[id].[hash].chunk.js' : 'js/[id].chunk.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    },
    ...(isProd
      ? {
          minimizer: [
            new OptimizeCSSAssetsPlugin({
              cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
              }
            }),
            new TerserPlugin()
          ]
        }
      : {})
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCSSExtractPlugin.loader : 'vue-style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: !isProd }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: path.join(__dirname, 'src/index.html'),
      chunksSortMode: 'auto'
    }),
    ...(isProd
      ? [
          new MiniCSSExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
          }),
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 10240,
            minRatio: 0.8
          })
        ]
      : [new webpack.HotModuleReplacementPlugin()])
  ],
  ...(isProd ? {} : { devtool: 'source-map' }),
  ...(isProd
    ? {}
    : {
        devServer: {
          compress: true,
          hot: true,
          open: true,
          overlay: true,
          port: 8000,
          stats: {
            normal: true
          },
          historyApiFallback: true
        }
      })
}

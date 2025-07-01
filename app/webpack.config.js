// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode || 'development',
  entry: './src/index.tsx',
  output: { /* … */ },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'components'),
      path.resolve(__dirname, 'layouts'),
      'node_modules'
    ],
    alias: {
      '@components': path.resolve(__dirname, 'components'),
      '@layouts':    path.resolve(__dirname, 'layouts'),
      '@data':       path.resolve(__dirname, 'src/data'),
      '@pages':      path.resolve(__dirname, 'src/pages'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: argv.mode === 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'public', 'index.html'),
      inject: 'body',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
  },
});

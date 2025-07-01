// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  module: {
    rules: [
      // 1) SVGR: import SVG as ReactComponent (exclude ?url)
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] }, // exclude imports ending in ?url
        use: [
          {
            loader: '@svgr/webpack',
            options: { exportType: 'named' },
          },
        ],
      },

      // 2) SVG as URL: import foo.svg?url
      {
        test: /\.svg$/i,
        resourceQuery: /url/, 
        type: 'asset/resource',
      },

      // 3) Images (PNG, JPG, GIF)
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },

      // 4) Fonts & other assets
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },

      // 5) CSS (Tailwind / PostCSS)
      {
        test: /\.css$/i,
        include: [path.resolve(__dirname, 'style')],
        use: [
          'style-loader',    // injects CSS into the DOM
          'css-loader',      // resolves @import, url()
          'postcss-loader',  // runs Tailwind & autoprefixer (per postcss.config.js)
        ],
      },

      // 6) TypeScript / TSX
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body',
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
  ],

  devtool: 'source-map',

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: './',
    },
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
};

// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      // TypeScript / JSX
      {
        test: /\.[jt]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      // Global CSS + PostCSS/Tailwind
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },

      // SVG sprite for icons.svg
      {
        test: /icons\.svg$/i,
        include: path.resolve(__dirname, 'src/assets/images'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'images/icons.svg',
            },
          },
          'svgo-loader',
        ],
      },

      // Other image assets (png/jpg/ico/webp)
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i,
        include: path.resolve(__dirname, 'src/assets/images'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      // All other SVGs (including logo.svg)
      {
        test: /\.svg$/i,
        exclude: path.resolve(__dirname, 'src/assets/images/icons'),
        include: path.resolve(__dirname, 'src/assets/images'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      // Fallback for fonts and other assets
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
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
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
};

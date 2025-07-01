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

      // Other image assets under src/assets/images
      {
        test: /\.(png|jpe?g|gif|ico|webp|svg)$/i,
        include: path.resolve(__dirname, 'src/assets/images'),
        exclude: /icons\.svg$/i,
        type: 'asset/resource',
        generator: {
          // flatten images into /images
          filename: 'images/[name][ext]',
        },
      },

      // Fallback for other assets (fonts, etc.)
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

    // Extract SVG sprite
    new SpriteLoaderPlugin({ plainSprite: true }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
};

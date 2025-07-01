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
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },

      // Your existing asset/resource rules (images, fonts, etc.)
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i,
        type: 'asset/resource',
      },

      // === SVG sprite rule ===
      {
        test: /\.svg$/i,
        include: path.resolve(__dirname, 'src/assets/icons'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: 'sprite-[hash].svg',
            },
          },
          // optional: optimize each SVG
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      },

      // === Fallback SVG rule for CSS/background-icons etc. ===
      {
        test: /\.svg$/i,
        exclude: path.resolve(__dirname, 'src/assets/icons'),
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body',
    }),

    // Pull out the generated sprite into its own file
    new SpriteLoaderPlugin({ plainSprite: true }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
};

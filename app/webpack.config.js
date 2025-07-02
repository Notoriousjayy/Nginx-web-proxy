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
    publicPath: '/',      // so "/images/…" resolves at runtime
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // now css url("/images/foo.png") → src/assets/images/foo.png
      '/images': path.resolve(__dirname, 'src/assets/images'),
    },
  },

  module: {
    rules: [
      // 1) SVGs as React components (svgr), unless you append ?url
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: { exportType: 'named' },
          },
        ],
      },

      // 2) SVGs imported with ?url → asset/resource
      {
        test: /\.svg$/i,
        resourceQuery: /url/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      // 3) Raster images → asset/resource
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      // 4) Fonts
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },

      // 5) CSS + Tailwind
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: {
                // leave any /images/... URL untouched
                filter: (url) => url.startsWith('/images/') === false,
              },
            },
          },
          'postcss-loader',
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
      publicPath: '/',
    },
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
};

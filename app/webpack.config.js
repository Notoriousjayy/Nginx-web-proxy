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
    publicPath: '/',   // so <use xlinkHref="/images/icons.svg#…"/> works at runtime
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // allows url("/images/foo.png") in your CSS to resolve to src/assets/images/foo.png
      '/images': path.resolve(__dirname, 'src/assets/images'),
    },
  },
  module: {
    rules: [
      // ──────────────── 1) SPRITE LOADER ────────────────
      {
        test: /icons\.svg$/i,
        loader: 'svg-sprite-loader',
        options: {
          extract: true,
          spriteFilename: 'images/icons.svg',
          // optional: symbol IDs will be the file basename (e.g. <symbol id="icons">…)
          symbolId: filePath => path.basename(filePath, '.svg'),
        },
      },

      // ──────────────── 2) SVGR FOR INLINE SVGs ────────────────
      // all other .svg imports in JS/TSX (except those ending in ?url)
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: [/url/] },
        exclude: /icons\.svg$/,   // don’t run your sprite back through SVGR
        use: [
          {
            loader: '@svgr/webpack',
            options: { exportType: 'named' },
          },
        ],
      },

      // ──────────────── 3) SVGs AS URL (asset/resource) ────────────────
      {
        test: /\.svg$/i,
        resourceQuery: /url/,     // import foo.svg?url
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      // ──────────────── 4) RASTER IMAGES ────────────────
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      // ──────────────── 5) FONTS ────────────────
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },

      // ──────────────── 6) CSS + TAILWIND ────────────────
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
                // leave URLs starting with /images/ alone (they hit our alias)
                filter: url => !url.startsWith('/images/'),
              },
            },
          },
          'postcss-loader',
        ],
      },

      // ──────────────── 7) TS & TSX ────────────────
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
    // this writes out the icons.svg sprite to dist/images/icons.svg
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

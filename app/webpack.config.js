// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    clean: true,
  },

  resolve: {
    // Tell webpack what file extensions to look out for when you do `import ... from '...'`
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    alias: {
      // so `import foo from '/images/foo.png'` → src/assets/images/foo.png
      '/images': path.resolve(__dirname, 'src/assets/images'),
    },
  },

  module: {
    rules: [
      // 1) Typescript + JSX support
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },

      // 2) SVG as React components (svgr)
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

      // 3) SVG & images as files
      {
        test: /\.svg$/i,
        resourceQuery: /url/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]',
        },
      },

      // 4) Font files
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
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: {
                // only resolve relative URLs; leave `/images/...` intact
                filter: (url) => !url.startsWith('/images/'),
              },
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/public/index.html',
      inject: 'body',
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),

    // copy your static image folder, but ignore SVGs (so webpack’s asset rule owns them)
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/images'),
          to: 'images',
          globOptions: {
            ignore: ['**/*.svg'],
          },
        },
      ],
    }),
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

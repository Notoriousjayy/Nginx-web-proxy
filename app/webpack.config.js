// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  module: {
    rules: [
      // 1) icons.svg → sprite (unchanged)
      {
        test: /icons\.svg$/i,
        include: path.resolve(__dirname, 'src/assets/images'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: { extract: true, spriteFilename: 'images/icons.svg' },
          },
        ],
      },

      // 2) all other SVGs → either ReactComponent or asset/resource
      {
        test: /\.svg$/i,
        oneOf: [
          // 2a) import … from 'logo.svg?react' → inline ReactComponent
          {
            resourceQuery: /react/,        // *.svg?react
            use: ['@svgr/webpack'],
          },
          // 2b) default import → emits file, returns URL
          {
            type: 'asset/resource',
            generator: {
              filename: 'images/[name].[contenthash][ext]',
            },
          },
        ],
      },

      // 3) TS / JS
      {
        test: /\.[jt]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },

      // 4) CSS
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },

      // 5) other raster images
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i,
        include: path.resolve(__dirname, 'src/assets/images'),
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        },
      },

      // 6) fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/public/index.html', inject: 'body' }),
    new SpriteLoaderPlugin({ plainSprite: true }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: './',
    },
    historyApiFallback: true,
    open: true,
    port: 3000,
  },
}

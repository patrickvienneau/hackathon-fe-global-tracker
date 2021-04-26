// Source: https://dev.to/riyanegi/setting-up-webpack-5-with-react-and-babel-from-scratch-2021-271l
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js',
    map: './src/map.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    port: 9000,
    watchContentBase: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'components'),
      store: path.resolve(__dirname, 'store'),
      constants: path.resolve(__dirname, 'constants'),
      utils: path.resolve(__dirname, 'utils'),
      styles: path.resolve(__dirname, 'styles'),
    },
    extensions: [
      '.jsx',
      '.js',
      '.scss',
      '.css',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
    }),
  ],
}

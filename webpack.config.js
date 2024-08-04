const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    
  },
  plugins: [
    ,new webpack.DefinePlugin({
      'process.env.SHEET_ID': JSON.stringify(process.env.SHEET_ID),
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    compress: true,
    port: 9000
  }
};
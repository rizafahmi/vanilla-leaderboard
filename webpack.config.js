module.exports = {
  entry: ['./js/app.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.webpack.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
  // plugins: []
};

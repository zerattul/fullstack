module.exports = {
  resolve: {
    extensions: ['', 'js', '.pug', 'scss']
  },

  entry: './src/index.js',
  output: {
    output: {
      filename: 'bundle.js',
      path: __dirname
    }
  }
}

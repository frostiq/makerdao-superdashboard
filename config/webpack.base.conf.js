process.noDeprecation = true;

module.exports = {
  module: {
    rules: [{
      test    : /\.html$/,
      loader  : 'html-loader',
      options : { minimize: true }
    },
    {
      test    : /\.js?$/,
      exclude : [/node_modules/],
      loader  : 'babel-loader'
    },
    {
      test    : /\.(woff(2)?|eot|ttf|otf|png|jpe?g|gif|svg)$/,
      loader  : 'url-loader',
      options : {
        limit: 10000
      }
    }]
  },
  plugins: []
};

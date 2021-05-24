const path = require('path');

module.exports = {
  mode: 'development',

  entry: './client/index.js',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  devServer: {
    publicPath: '/build',
    port: 8080,
    proxy: { '/api/': 'http://localhost:3000' },
  },

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node-modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // {
      // 	test: /\.css?/, // --> /\.s[ac]ss$/i
      //  exclude: /(node_modules)/,
      // 	use: ['style-loader', 'css-loader'],
      // 	},
      //
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

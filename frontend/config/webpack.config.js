const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = {
  mode: 'development',
  devtool: "inline-source-map",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ]
  },
  resolve: {
    extensions: [".*", ".js", ".jsx"],
    fallback: {
      "path": false,
      "os": false,
      "crypto": false,
    },
  },
  devServer: {
    static: "./dist",
    compress: true,
    open: true,
    hot: true,
    port: 8564,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      name: "index.html",
      inject: false,
      template: "./dist/index.html",
    }),
    new Dotenv(),
  ]
};

const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = {
  context: path.resolve(__dirname, "src"),

  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "babel-polyfill",
    "./index.js"
  ],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"]
  },

  module: {
    rules: [
      // JS Loader
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        exclude: "/node_modules/",
        include: [path.join(__dirname, "src")]
      },
      // Chained SASS Loader
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()],

  devtool: "eval"
};

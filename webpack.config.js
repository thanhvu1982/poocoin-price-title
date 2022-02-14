const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: {
    content: path.resolve(__dirname, "src/scripts/content.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist/scripts"),
    filename: "[name].js",
  },

  resolve: {
    extensions: [".js", ".json", ".scss", ".css"],
    alias: {
      scripts: path.resolve(__dirname, "src/scripts"),
      statics: path.resolve(__dirname, "src/statics"),
      statics: path.resolve(__dirname, "node_modules"),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),

    new CopyPlugin([
      {
        from: path.resolve(__dirname, "src/static"),
        to: path.resolve(__dirname, "dist"),
      },
    ]),

    new UglifyJSPlugin(),

    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};

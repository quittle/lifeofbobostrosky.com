const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  mode: "development",
  entry: {
    index: ["./dist/react-build.js"],
  },
  output: {
    path: path.resolve(__dirname, "dist", "public"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            esModule: false,
          },
        },
      },
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/react-build.html",
      filename: "[name].html",
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: ["config/.s3uploadconfig.json"],
    }),
  ],
};

module.exports = config;

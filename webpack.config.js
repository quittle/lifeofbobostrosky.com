const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entrypoint = "./dist/react-build.html";

const config = {
  mode: "development",
  entry: {
    index: [entrypoint],
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
        test: /\.(png)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: entrypoint,
      filename: "[name].html",
    }),
  ],
};

module.exports = config;

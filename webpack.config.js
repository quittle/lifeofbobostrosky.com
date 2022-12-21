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
    filename: "[name]-[contenthash].js",
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
        test: /\.(ts)$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: `${__dirname}/tsconfig.json`,
          },
        },
      },
      {
        test: /\.(svg)$/i,
        use: ["file-loader"],
      },
      {
        test: /\.(png|jpe?g|bmp)$/i,
        oneOf: [
          {
            resourceQuery: /domainQualified/,
            loader: "file-loader",
            options: {
              publicPath: "https://lifeofbobostrosky.com/",
            },
          },
          {
            use: ["file-loader", "webpack-image-resize-loader"],
          },
        ],
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
  resolve: {
    extensions: [".css", ".js", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/react-build.html",
      filename: "[name].html",
    }),
    new MiniCssExtractPlugin({
      filename: "index-[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: ["config/.s3uploadconfig.json"],
    }),
  ],
};

module.exports = config;

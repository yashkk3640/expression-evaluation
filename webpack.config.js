const path = require("path");
const webpack = require("webpack");
const PrettierPlugin = require("prettier-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const getPackageJson = require("./scripts/getPackageJson");

const { version, name, license, repository, author } = getPackageJson(
  "version",
  "name",
  "license",
  "repository",
  "author"
);

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(
    // eslint-disable-next-line no-useless-escape
    / *\<[^)]*\> */g,
    " "
  )} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  mode: "production",
  devtool: false, // "source-map" don't need to generate index.js.map for variables mapping
  entry: "./src/expression/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build"),
    library: "ExpressionEvaluation",
    libraryTarget: "umd",
    clean: true,
  },
  optimization: {
    minimize: false, //  at initial stage don't need to minify files
    // minimizer: [
    //   new TerserPlugin({
    //     extractComments: false,
    //   }),
    // ],
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    static: path.join(__dirname, "demo"),
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new PrettierPlugin(), new webpack.BannerPlugin(banner)],
  // externals: { "moment-timezone": "moment-timezone" },
};

// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
let fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const folderPath = path.resolve(__dirname, "src/es/componentes");
const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: {
    index:  "./src/js/index.js",
    about: "./src/js/about.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: '[path][name][ext]',
    filename: '[name].js',
    clean: true
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html",
      filePath: folderPath,
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./src/es/sobrenosotros.html",
      filename: "sobrenosotros.html",
      filePath: "./src/es/componentes",
      inject: true
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};

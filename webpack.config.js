// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
let fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const folderPathEs = path.resolve(__dirname, "es/componentes");
const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: {
    index: {
      import: "./src/js/index.js",
      dependOn: 'shared'
    },
    about: {
      import: "./src/js/about.js",
      dependOn: 'shared'
    },  
    contact: {
      import: "./src/js/contact.js",
      dependOn: 'shared'
    },  
    shared: {
      import: "./src/js/shared.js"
    }
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: '[path][name][ext]',
    filename: '[name].[contenthash].js',
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
      filePath: folderPathEs,
      chunks: ['index'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./es/sobrenosotros.html",
      filename: "sobrenosotros.html",
      filePath: folderPathEs,
      chunks: ['about'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      template: "./es/contacto.html",
      filename: "contacto.html",
      filePath: folderPathEs,
      chunks: ['contact'],
      inject: true
    }),
    new MiniCssExtractPlugin(),
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
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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

// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
let fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const folderPathEs = path.resolve(__dirname, "es/componentes");
const folderPathEn = path.resolve(__dirname, "en/componentes");
const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: {
    index: {
      import: "./src/js/index.js",
    },
    about: {
      import: "./src/js/about.js",
    },  
    contact: {
      import: "./src/js/contact.js",
    },
    pistolsLanding: {
      import: "./src/js/pistolsLanding.js"
    },
    artilleryLanding: {
      import: "./src/js/artilleryLanding.js"
    },
    product: {
      import: "./src/js/product.js"
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
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/indexeng.html",
      filename: "indexeng.html",
      filePath: folderPathEn,
      chunks: ['index'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/sobrenosotros.html",
      filename: "sobrenosotros.html",
      filePath: folderPathEs,
      chunks: ['about'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/sobrenosotroseng.html",
      filename: "sobrenosotroseng.html",
      filePath: folderPathEn,
      chunks: ['about'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/contacto.html",
      filename: "contacto.html",
      filePath: folderPathEs,
      minify: false,
      chunks: ['contact'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/contactoeng.html",
      filename: "contactoeng.html",
      filePath: folderPathEn,
      minify: false,
      chunks: ['contact'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/productos/pistolasyfusiles.html",
      filename: "pistolasyfusiles.html",
      filePath: folderPathEs,
      chunks: ['pistolsLanding'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/pistolasyfusileseng.html",
      filename: "pistolasyfusileseng.html",
      filePath: folderPathEn,
      chunks: ['pistolsLanding'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/productos/artilleria.html",
      filename: "artilleria.html",
      filePath: folderPathEs,
      chunks: ['artilleryLanding'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/artilleriaeng.html",
      filename: "artilleriaeng.html",
      filePath: folderPathEn,
      chunks: ['artilleryLanding'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/productos/accesorios.html",
      filename: "accesorios.html",
      filePath: folderPathEs,
      chunks: ['index'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/accesorioseng.html",
      filename: "accesorioseng.html",
      filePath: folderPathEn,
      chunks: ['index'],
      inject: 'body'
    }),
    /* Products */
    new HtmlWebpackPlugin({
      template: "./es/productos/pistolas/barnett.html",
      filename: "barnett.html",
      filePath: folderPathEs,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/pistolas/barnetteng.html",
      filename: "barnetteng.html",
      filePath: folderPathEn,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/productos/pistolas/mechaalemana.html",
      filename: "mechaalemana.html",
      filePath: folderPathEs,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/pistolas/mechaalemanaeng.html",
      filename: "mechaalemanaeng.html",
      filePath: folderPathEn,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/productos/pistolas/mechajaponesa.html",
      filename: "mechajaponesa.html",
      filePath: folderPathEs,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/pistolas/mechajaponesaeng.html",
      filename: "mechajaponesaeng.html",
      filePath: folderPathEn,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/productos/fusiles/mosquetemecha.html",
      filename: "mosquetemecha.html",
      filePath: folderPathEs,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/fusiles/mosquetemechaeng.html",
      filename: "mosquetemechaeng.html",
      filePath: folderPathEn,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./es/productos/pistolas/rueda.html",
      filename: "rueda.html",
      filePath: folderPathEs,
      minify: false,
      chunks: ['product'],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      template: "./en/productos/pistolas/ruedaeng.html",
      filename: "rueda.htmleng.html",
      filePath: folderPathEn,
      minify: false,
      chunks: ['product'],
      inject: 'body'
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

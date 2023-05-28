const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ReactRefreshTypeScript = require("react-refresh-typescript");
const path = require("path");

require("dotenv").config();

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "eval-cheap-module-source-map",
  target: "web",
  devServer: {
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
    allowedHosts: ["all"],
  },
  output: {
    publicPath: "auto",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: [/@stribord\/.*(?!.*node_modules)/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
          {
            loader: "ts-loader",
            options: {
              allowTsInNodeModules: true,
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [require.resolve("react-refresh/babel")],
            },
          },
          {
            loader: "ts-loader",
            options: {
              allowTsInNodeModules: true,
              getCustomTransformers: () => ({
                before: [ReactRefreshTypeScript()],
              }),
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.module.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      exclude: [/node_modules/, /bootstrap\.tsx$/],
    }),
    new ModuleFederationPlugin({
      name: "StribordExampleExtension",
      filename: "./remoteEntry.js",
      exposes: {},
      remotes: {},
      shared: {
        "@ionic/react": {
          singleton: true,
        },
        "@ionic/react-router": {
          singleton: true,
        },
        "@stribord/react-client": {
          singleton: true,
        },
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
        "react-router": {
          singleton: true,
        },
        "react-router-dom": {
          singleton: true,
        },
        recharts: {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      chunks: ["main"],
    }),
  ],
};

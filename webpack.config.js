const path = require("path");
module.exports = {
  entry: "./src/quality-percentage-circle.ts",
  output: {
    filename: "quality-percentage-circle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist"
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 3000
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"]
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  }
};

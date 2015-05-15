'use strict';

module.exports = {
  entry: {
    app: ["./app/client.entry.js"]
  },
  output: {
    path: "./public",
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/, loader: 'jsx-loader'
      }
    ]
  }
};

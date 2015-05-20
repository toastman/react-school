module.exports = {
  entry: {
    app: ["./app/components/Navigation.jsx"]
  },
  output: {
    path: "./build",
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
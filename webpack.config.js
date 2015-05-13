// This is the simplest webpack config
// its a commonJs module so we have to use module.exports
module.exports = {
  // entry is a place where you write a list of your entry
  // points (entryName: pathToFile)
  entry: {
    app: ["./app/client.entry.js"]
  },
  output: {
    // path - where to put your final bundle
    path: "./public",
    // you can use statc filename but it's better to use dynamic like this
    filename: "[name].bundle.js"
  },
  module: {
    // loaders - is a list of libraries that will transform/work with your modules
    loaders: [
      { test: /\.jsx$/, loader: "jsx-loader" }
    ]
  }
};
